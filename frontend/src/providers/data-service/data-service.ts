import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ConnectionServiceProvider} from "../connection-service/connection-service";
import {Observable} from "rxjs/Observable";

import * as download from "in-browser-download";

enum ItemType {
  FOLDER, FILE
}

export enum PageState {
  FILES = 5, SHARED = 10, DELETED = 15
}

interface File {
  id: string,
  parent: string,
  name: string,
  type?: ItemType
  deleted?: boolean,
  meta?: Map<string, string>
}

interface Folder {
  id: string,
  parent: string,
  name: string,
  type?: ItemType,
  deleted?: boolean
}


@Injectable()
export class DataServiceProvider {

  public folders = new Map<number, {files: Array<File>, folders: Array<Folder>}>();
  public currentFolder = {id: -1, files: [], folders: []};
  public folderLevels = [];
  public state = PageState.FILES;

  public selected: Set<any> = new Set();
  public selectedIds: Set<number> = new Set();

  constructor(private connection: ConnectionServiceProvider) {}

  public clearSelected() {
    this.selected.clear();
    this.selectedIds.clear();

  }

  public enterFolder(folderId: number, parentId?: number) {
    folderId = (folderId === null) ? -1 : folderId;
    parentId = (parentId === null) ? -1 : parentId;
    this.loadFolder(folderId).subscribe(result => {
      if (result.success === true) {
        this.clearSelected();
        this.folders.set(folderId, {files: result.files, folders: result.folders});
        this.setCurrentFolder(folderId, result);
        if (folderId > -1) this.folderLevels.push(parentId);
      }
    })
  }

  public refreshFolder(folderId: number) {
    this.loadFolder(folderId).subscribe(result => {
      if (result.success === true) {
        this.clearSelected();
        const folder = this.folders.get(folderId);
        folder.files = result.files;
        folder.folders = result.folders;
        if (folderId === this.currentFolder.id) {
          this.setCurrentFolder(folderId, folder);
        }
      }
    })
  }

  public createFolder(parentFolderId: number, name: string) {
    return Observable.create(observer => {
      this.connection.send("folder/create/inside/" + parentFolderId, JSON.stringify({name: name})).subscribe(
        result => {
          observer.next({success: true});
          observer.complete()
        },
        error => {
          observer.next({success: false});
          observer.complete();
        }
      )
    });
  }

  public exitFolder() {
    this.clearSelected();
    const parentId = this.folderLevels.pop();
    const newFolder = this.folders.get(parentId);
    this.setCurrentFolder(parentId, newFolder);
  }

  private setCurrentFolder(parentId: number, folder: {files: File[], folders: Folder[]}) {
    this.currentFolder.id = parentId;
    this.currentFolder.files = folder.files;
    this.currentFolder.folders = folder.folders;
  }

  public loadFolder(folderId: number): Observable<any> {
    return Observable.create(observer => {
      this.connection.notify("folder/contents/" + folderId).subscribe(
        result => this.handleLoadFolder(result, observer),
        error => {
          observer.next({success: false});
          observer.complete()
        }
      );
    });
  }

  private handleLoadFolder(result, observer) {
    observer.next({success: true, files: result.files, folders: result.folders});
    observer.complete()
  }

  public renameItem(selectedItem: any, name: string): Observable<any> {
    const [type, id] = [selectedItem.type, selectedItem.id];
    return Observable.create(observer => {
      this.connection.send(type + "/rename/" + id, JSON.stringify({name: name})).subscribe(
        result => {
          if (result.status === "success") {
            observer.next({success: true});
          } else {
            observer.next({success: false});
          }
          observer.complete();
        },
        error => {
          observer.next({success: false});
          observer.complete();
        }
      );
    });
  }

  public deleteItems(selectedItems: Set<any>): Observable<any> {
    return Observable.create(observer => {
      let failedToDelete = [];
      const count = selectedItems.size;
      let completed = 0;

      selectedItems.forEach(item => {
        const [type, id] = [item.type, item.id];
        this.connection.remove(type + "/delete/" + id).subscribe(
          result => {
            completed++;
            if (result.status !== "success") {
              failedToDelete.push({id: item.id, name: item.name});
            }
            if (completed === count) {
              observer.next({success: true, failed: failedToDelete});
              observer.complete();
            }
          },
          error => {
            completed++;
            failedToDelete.push({id: item.id, name: item.name});
            if (completed === count) {
              observer.next({success: true, failed: failedToDelete});
              observer.complete();
            }
          }
        );
      });
    });
  }

  public downloadItem(selectedItem: any): Observable<any> {
    const [type, id] = [selectedItem.type, selectedItem.id];
    return Observable.create(observer => {
      this.connection.download(type + "/download/" + id).subscribe(
        result => {
          download(result, selectedItem.name + ".zip");
          observer.next({success: true});
          observer.complete();
        },
        error => {
          observer.next({success: false});
          observer.complete();
        }
      );
    });
  }

  public uploadFiles(formData: FormData): Observable<any> {
    return Observable.create(observer => {
      this.connection.send("file/uploads", formData, true).subscribe(
        result => this.handleFilesUpload(result, observer),
        error => {
          observer.next({success: false});
          observer.complete()
        }
      )
    });
  }

  private handleFilesUpload(result, observer) {
    if (result.status === "success") {
      observer.next({success: true, result: result});
      observer.complete();
    } else if (result.status === "fail") {
      observer.next({success: true, failed: result.failed, count: result.count});
      observer.complete();
    }

  }
}

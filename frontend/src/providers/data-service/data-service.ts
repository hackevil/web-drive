import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ConnectionServiceProvider} from "../connection-service/connection-service";
import {Observable} from "rxjs/Observable";

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
  public selected: Set<string> = new Set();

  constructor(private connection: ConnectionServiceProvider) {}

  public enterFolder(folderId: number, parentId?: number) {
    folderId = (folderId === null) ? -1 : folderId;
    this.loadFolder(folderId).subscribe(result => {
      if (result.success === true) {
        this.selected.clear();
        this.folders.set(folderId, {files: result.files, folders: result.folders});
        this.setCurrentFolder(folderId, result);
        if (parentId) this.folderLevels.push(parentId);
      }
    })
  }

  public exitFolder() {
    this.selected.clear();
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

  public renameItem(id: string, name: string) {
    // Rename item (folder / file)
    // this.connection.send("rename", {name: name});
  }

  public deleteItems(items: Array<string>) {
    // Delete item from database and remove from array
    // this.connection.send("delete", {items: items});
  }

  public downloadItems(items: Array<string>) {
    // Download items from the file storage
    // this.connection.send("download", {items: items});
  }

  public uploadFiles(files: FormData): Observable<any> {
    return Observable.create(observer => {
      this.connection.send("file/uploads", files).subscribe(
        result => this.handleFilesUpload(result, observer),
        error => {
          observer.next({success: false});
          observer.complete()
        }
      )
    });
  }

  private handleFilesUpload(result, observer) {
    observer.next({success: true, result: result});
    observer.complete();
  }
}

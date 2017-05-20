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
  public currentFolder = {files: [], folders: []};
  public folderLevels = [];
  public state = PageState.FILES;
  public selected: Set<string> = new Set();

  constructor(private connection: ConnectionServiceProvider) {
    this.enterFolder(-1);
  }

  public enterFolder(folderId: number, parentId?: number) {
    folderId = (folderId === null) ? -1 : folderId;
    this.loadFolder(folderId).subscribe(result => {
      if (result.success === true) {
        this.selected.clear();
        this.folders.set(folderId, {files: result.files, folders: result.folders});
        this.setCurrentFolder(result);
        if (parentId) this.folderLevels.push(parentId);
      }
    })
  }

  public exitFolder() {
    this.selected.clear();
    const parentId = this.folderLevels.pop();
    const newFolder = this.folders.get(parentId);
    this.setCurrentFolder(newFolder);
  }

  private setCurrentFolder(folder: {files: File[], folders: Folder[]}) {
    this.currentFolder.files = folder.files;
    this.currentFolder.folders = folder.folders;
  }

  public loadFolder(folderId: number) {
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

  public uploadFiles() {

  }


//   // Load all folder and file information from database
//   this.folders.set("drive", {files: [{id: "123", parent: "drive", deleted: true, name: "test.txt"}],
//   folders: [{id: "321", parent: "drive", name: "Books"}]});
// this.folders.set("321", {files: [{id: "890", parent: "111", name: "yes.c"}],
//   folders: [{id: "345", parent: "222", name: "Novels"}]})


  // TABLES:
  // (Folders, Files) -> User, Users, Shared (fileId / folderId -> user)



}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {ConnectionServiceProvider} from "../connection-service/connection-service";

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

  public folders = new Map<string, {files: Array<File>, folders: Array<Folder>}>();
  public currentFolder = {files: [], folders: []};
  public folderLevels = [];
  public state = PageState.FILES;

  constructor(private connection: ConnectionServiceProvider) {
    this.loadFilesAndFolders();
    const mainFolder = this.folders.get("drive");
    this.currentFolder.files = mainFolder.files;
    this.currentFolder.folders = mainFolder.folders;
  }

  // 0 -> {files[], folders[Folder[1], Folder[2]])
  // 2 -> {files[File[3]], folders[Folder[4]]

  // Upon entering folder -> get folderId ->
  // find folder in this.folders -> set currentFolder -> this.folders.get(folderId)

  public loadFilesAndFolders() {
    // Load all folder and file information from database
    this.folders.set("drive", {files: [{id: "123", parent: "drive", deleted: true, name: "test.txt"}],
      folders: [{id: "321", parent: "drive", name: "Books"}]});
    this.folders.set("321", {files: [{id: "890", parent: "111", name: "yes.c"}],
      folders: [{id: "345", parent: "222", name: "Novels"}]})
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


  // TABLES:
  // (Folders, Files) -> User, Users, Shared (fileId / folderId -> user)



}

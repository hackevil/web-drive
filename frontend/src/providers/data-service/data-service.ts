import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

enum ItemType {
  FOLDER, FILE
}

interface File {
  id: string,
  parent: string,
  name: string,
  type: ItemType
  deleted: boolean,
  meta: Map<string, string>
}

interface Folder {
  id: string,
  parent: string,
  name: string,
  type: ItemType,
  deleted: boolean
}


@Injectable()
export class DataServiceProvider {

  public files = new Map<string, Array<File>>();
  public folders = new Map<string, {files: Array<File>, folders: Array<Folder>}>();
  public currentFolder = {files: [], folders: []};

  // 0 -> {files[], folders[Folder[1], Folder[2]])
  // 2 -> {files[File[3]], folders[Folder[4]]

  // Upon entering folder -> get folderId ->
  // find folder in this.folders -> set currentFolder -> this.folders.get(folderId)

  public loadFilesAndFolders() {
    // Load all folder and file information from database
  }

  public deleteItem() {
    // Delete item from database and remove from array
  }


  // TABLES:
  // (Folders, Files) -> User, Users, Shared (fileId / folderId -> user)



}

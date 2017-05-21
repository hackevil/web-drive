<?php

namespace App\Http\Controllers;

use App\Folder;
use Chumper\Zipper\Facades\Zipper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FolderController extends Controller
{
    public function getContents(Request $request, $folderId)
    {
        $user = $request->user();
        if ($folderId < 0) $folderId = null;
        $files = $user->files($folderId);
        $folders = $user->folders($folderId);
        return response()->json(["status" => "success", "files" => $files, "folders" => $folders], 200);
    }

    public function create(Request $request, $parentFolderId)
    {
        $userId = $request->user()->id;
        $name = $request->input("name");
        if ($parentFolderId < 0) $parentFolderId = null;
        $parentFolderPath = "";
        if ($parentFolderId) {
            $folder = Folder::find($parentFolderId);
            $parentFolderPath = $folder->path;
        }

        $newFolder = Folder::create([
            "name" => $name,
            "folder_id" => $parentFolderId,
            "user_id" => $userId
        ]);
        $newFolder->path = $parentFolderPath . "/f-" . $newFolder->id;
        $newFolder->save();
        return response()->json(["status" => "success"],200);
    }

    public function download(Request $request, $folderId) {
        $zipper = new \Chumper\Zipper\Zipper;
        $folder = Folder::find($folderId);
        $userId = $request->user()->id;
        $folderRoot = storage_path() . "/app/drive-" . $userId;
        $folderPath = $folderRoot . $folder->path . '/';
        //TODO: CHECK IF FOLDER PATH EXISTS
        $tempPath = $folderRoot . uniqid('/temp-') . '.zip';
        $zipper->make($tempPath)->add($folderPath)->close();
        $headers = [ 'Content-Type' => 'application/octet-stream' ];
        return response()->download($tempPath, $folder->name . '.zip',
            $headers);
//        ->deleteFileAfterSend(true)
    }

    public function rename(Request $request, $id)
    {
        $folder = Folder::find($id);
        $newName = $request->input("name");

        if ($folder && $newName && ($folder->user->id === $request->user()->id)) {
            $folder->name = $newName;
            $folder->save();
            return response()->json(["status" => "success"],200);
        } else {
            return response()->json(["status" => "error"], 200);
        }
    }

    public function destroy(Request $request, $id)
    {
        $folder = Folder::find($id);
        if ($folder && ($folder->user->id === $request->user()->id)) {
            $folder->delete();
            return response()->json(["status" => "success"],200);
        } else {
            return response()->json(["status" => "error"], 200);
        }
    }
}
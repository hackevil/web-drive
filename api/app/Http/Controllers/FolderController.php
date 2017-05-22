<?php

namespace App\Http\Controllers;

use App\Folder;
use Illuminate\Http\Request;

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

    public function download(Request $request, $folderId)
    {
        $zipper = new \Chumper\Zipper\Zipper;
        $folder = Folder::find($folderId);
        $userId = $request->user()->id;

        if ($folder && ($folder->user->id === $userId)) {
            $folderRoot = storage_path() . "/app/drive-" . $userId;
            $folderPath = $folderRoot . $folder->path . '/';
            $tempPath = $folderRoot . uniqid('/temp/temp-') . '.zip';
            $zippedFolder = $zipper->make($tempPath);

            if (is_dir($folderPath)) {
                $zippedFolder->add($folderPath)->close();
            } else {
                $zippedFolder->addString("empty.txt", "This folder is empty.")->close();
            }
            $headers = ['Content-Type' => 'application/octet-stream'];
            return response()->download($tempPath, $folder->name . '.zip',
                $headers)->deleteFileAfterSend(true);
        } else {
            return response()->json(["error" => "Unauthorized."], 401);
        }
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

    public function restore(Request $request, $id)
    {
        $folder = Folder::withTrashed()->find($id);
        if ($folder && ($folder->user->id === $request->user()->id)) {
            $folder->restore();
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
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
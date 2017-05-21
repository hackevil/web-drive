<?php

namespace App\Http\Controllers;

use App\File;
use App\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    public function rename(Request $request, $id)
    {
        $file = File::find($id);
        $newName = $request->input("name");

        if ($file && $newName && ($file->user->id === $request->user()->id)) {
            $file->name = $newName;
            $file->save();
            return response()->json(["status" => "success"],200);
        } else {
            return response()->json(["status" => "error"], 200);
        }
    }

    public function uploads(Request $request)
    {
        $userId = $request->user()->id;
        $files = Input::file('files');
        $folderId = $request->input("folderId");
        $folderPath = "drive-" . $userId;
        if ($folderId > -1) {
            $folder = Folder::find($folderId);
            if (!$folder) return response()->json(["status" => "fail"], 200);
            $folderPath = $folderPath . $folder->path;
        }

        $count = count($files);
        $uploaded = 0;
        $failed = array();

        foreach($files as $file) {
            $rules = array('file' => 'required|file|mimes:png,gif,jpeg,txt,pdf,doc,docx,ico|max:50000'); //50MB
            $validator = Validator::make(array('file'=> $file), $rules);
            if($validator->passes()) {
                $path = Storage::putFile($folderPath, $file);
                File::create([
                    "name" => $file->getClientOriginalName(),
                    "extension" => $file->getClientOriginalExtension(),
                    "size" => $file->getSize(),
                    "mimeType" => $file->getMimeType(),
                    "user_id" => $userId,
                    "folder_id" => ($folderId < 0) ? null : $folderId,
                    "path" => $path
                ]);
                $uploaded++;
            } else {
                $failed[] = [$validator->messages()];
            }
        }

        if($uploaded == $count) {
            return response()->json(["status" => "success"]);
        } else {
            return response()->json(["status" => "fail", "failed" => $failed, "count" => ($uploaded - $count)]);
        }
    }

    public function destroy(Request $request, $id)
    {
        $file = File::find($id);
        if ($file && ($file->user->id === $request->user()->id)) {
            $file->delete();
            return response()->json(["status" => "success"],200);
        } else {
            return response()->json(["status" => "error"], 200);
        }
    }
}

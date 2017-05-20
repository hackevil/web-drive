<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;

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

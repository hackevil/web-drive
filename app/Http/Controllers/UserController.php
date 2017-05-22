<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Create a new user controller instance.
     *
     */
    public function __construct(){}

    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required",
            "password" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => "error", "errors" => $validator->messages()], 200);
        }

        $user = User::where("email", $request->input("email"))->first();
        if ($user && Hash::check($request->input("password"), $user->password))
        {
            $apiToken = base64_encode(str_random(60));
            $user->api_token = $apiToken;
            $user->save();
            return response()->json(["status" => "success", "api_token" => $apiToken, "user" => $user], 200);
        } else {
            return response()->json(["status" => "fail"], 401);
        }
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            "name" => "required|max:255",
            "email" => "required|email|max:255|unique:users",
            "password" => "required|min:6|confirmed",
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => "error", "errors" => $validator->messages()], 200);
        }

        $apiToken = base64_encode(str_random(60));

        $user = User::create([
            "name" => $request->input("name"),
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password")),
            "api_token" => $apiToken
        ]);

        return response()->json(["status" => "success", "api_token" => $apiToken,
            "user" => User::find($user->id)], 200);
    }
}

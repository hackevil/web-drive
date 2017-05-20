<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Create a new user controller instance.
     *
     */
    public function __construct(){}

    public function authenticate(Request $request)
    {
        $this->validate($request, [
            "email" => "required",
            "password" => "required"
        ]);

        $user = User::where("email", $request->input("email"))->first();
        if (Hash::check($request->input("password"), $user->password))
        {
            $apiToken = base64_encode(str_random(60));
            $user->api_token = $apiToken;
            $user->save();
            return response()->json(["status" => "success", "api_token" => $apiToken, "user" => $user]);
        } else {
            return response()->json(["error" => "fail"], 401);
        }
    }

    public function register(Request $request) {
        $this->validate($request, [
            "name" => "required|max:255",
            "email" => "required|email|max:255|unique:users",
            "password" => "required|min:6|confirmed",
            "remember" => "boolean"
        ]);

        User::create([
            "name" => $request->input("name"),
            "email" => $request->input("email"),
            "password" => Hash::make($request->input("password"))
        ]);

        $this->authenticate($request);
    }
}

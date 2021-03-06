<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get("/", function () use ($app) {
    return $app->version();
});

$app->post("login","UserController@authenticate");
$app->post("register", "UserController@register");

$app->group(['middleware' => ['auth']], function () use ($app) {
    $app->group(['prefix' => "file"], function () use ($app) {
        $app->get("/download/{id}", "FileController@download");
        $app->post("/rename/{id}", "FileController@rename");
        $app->post("/uploads", "FileController@uploads");
        $app->get("/restore/{id}", "FileController@restore");
        $app->delete("/delete/{id}", "FileController@destroy");
    });

    $app->group(['prefix' => "folder"], function () use ($app) {
        $app->get("/download/{id}", "FolderController@download");
        $app->post("/create/inside/{id}", "FolderController@create");
        $app->post("/rename/{id}", "FolderController@rename");
        $app->get("/contents/{id}", "FolderController@getContents");
        $app->get("/restore/{id}", "FolderController@restore");
        $app->delete("/delete/{id}", "FolderController@destroy");
    });
});
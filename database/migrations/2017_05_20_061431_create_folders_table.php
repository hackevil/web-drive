<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFoldersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('folders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('type')->default('folder');
            $table->integer('user_id')->unsigned();
            $table->string('path', 800);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('folder_id')->nullable()->unsigned();
            $table->foreign('folder_id')->references('id')->on('folders')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('folders');
    }
}

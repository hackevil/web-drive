<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use \Askedio\SoftCascade\Traits\SoftCascadeTrait;

class Folder extends Model
{
    use SoftDeletes, SoftCascadeTrait;

    protected $table = 'folders';
    protected $softCascade = ['files', 'folders'];

    protected $fillable = [
        'name', 'user_id', 'folder_id','type', 'path'
    ];

    protected $hidden = [
        'path', 'user_id'
    ];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function parentFolder()
    {
        return $this->belongsTo('App\Folder', 'folder_id');
    }

    public function files()
    {
        return $this->hasMany('App\File','folder_id');
    }

    public function folders()
    {
        return $this->hasMany('App\Folder','folder_id');
    }
}

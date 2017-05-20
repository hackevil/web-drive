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
        'name', 'user_id', 'folder_id','type'
    ];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo('App\User');
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

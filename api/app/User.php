<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'used', 'allocated', 'remember', 'api_token'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'api_token', 'remember', 'created_at', 'updated_at'
    ];

    public function folders($folderId = null)
    {
        return $this->hasMany('App\Folder','user_id')->withTrashed()
            ->where("folder_id", $folderId)->get();
    }

    public function files($folderId = null)
    {
        return $this->hasMany('App\File','user_id')->withTrashed()
            ->where("folder_id", $folderId)->get();
    }
}

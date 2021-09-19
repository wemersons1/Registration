<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'path_image',
        'name_image'
    ];

    protected $appends = ["image"];

    public function getImageAttribute(){
        $data = null;

        if (Storage::disk()->exists($this->path_image)) {
            $data = (Storage::disk()->get($this->path_image));
        }
        return "data:;base64,".base64_encode($data);
    }
}

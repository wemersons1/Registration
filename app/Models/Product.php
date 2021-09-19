<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'path_image',
        'name_image',
        'amount',
        'quantity'
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

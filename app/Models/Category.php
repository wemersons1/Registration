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

    public function saveFiles($file, $type, $idRepresentative){

        $base64 = $file['base64'];

        $extension = explode('/', $base64);
        $extension = explode(';', $extension[1]);
        $extension = '.' . $extension[0];

        $name = time() . $extension;
        //obtem o arquivo
        $separatorFile = explode(',', $base64);
        $fileSave = $separatorFile[1];
        $path = 'files/'.$type.'/'.$idRepresentative.'/'.$name;

        //envia o arquivo
        Storage::disk('s3')->put($path, base64_decode($fileSave));

        return $path;
    }


}

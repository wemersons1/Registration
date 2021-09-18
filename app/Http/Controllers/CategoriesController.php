<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller
{
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required'
        ]);

        if ($validator->fails()) {
            $errorValidator = $validator->messages();
            return response()->json([
                'message' => $errorValidator->first(),
                'error' => 'Dados inválidos'
            ], 400);
        }

        if(!$request->file('image')->isValid()) {
            return response()->json([
                "message" => "Imagem inválida"
            ], 400);
        }

        $pathImage = $request->image->store('categories');

        $category = Category::create([
            "name" => $request->name,
            "description" => $request->description,
            "path_image" => $pathImage
        ]);

        return response()->json($category);
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required'
        ]);

        if ($validator->fails()) {
            $errorValidator = $validator->messages();
            return response()->json([
                'message' => $errorValidator->first(),
                'error' => 'Dados inválidos'
            ], 400);
        }

        if(!$request->file('image')->isValid()) {
            return response()->json([
                "message" => "Imagem inválida"
            ], 400);
        }

        $category = Category::find($id);

        if(!$category) {
            return response()->json([
                "message" => "Categoria não encontrada"
            ], 400);
        }

        $pathImage = $request->image->store('categories');

        Storage::delete($category->path_image);

        $category->update([
            "name" => $request->name,
            "description" => $request->description,
            "path_image" => $pathImage
        ]);

        return response()->json($category);
    }

    public function index(Request $request) {

        $categories = new Category();

        if($request->name) {
            $categories->where('name', 'LIKE', '%'.$request->name.'%');
        }

        if($request->all) {
            return response()->json(Category::all());
        }

        return response()->json($categories->paginate());
    }

    public function destroy($id) {

        $category = Category::find($id);

        if(!$category) {
            return response()->json([
                "message" => "Categoria não encontrada"
            ], 400);
        }

        $category->delete();

        return response()->json([
            "message" => "Categoria excluída com sucesso"
        ]);
    }

    public function show($id) {
        $category = Category::find($id);

        if(!$category) {
            return response()->json([
                "message" => "Categoria não encontrada"
            ], 400);
        }

        return response()->json($category);
    }
}

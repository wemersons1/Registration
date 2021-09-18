<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|numeric|exists:categories,id',
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

        $pathImage = $request->image->store('products');

        $product = Product::create([
            "category_id" => $request->category_id,
            "name" => $request->name,
            "description" => $request->description,
            "path_image" => $pathImage
        ]);

        return response()->json($product);
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

        $product = Product::find($id);

        if(!$product) {
            return response()->json([
                "message" => "Produto não encontrada"
            ], 400);
        }

        $pathImage = $request->image->store('products');

        Storage::delete($product->path_image);

        $product->update([
            "name" => $request->name,
            "description" => $request->description,
            "path_image" => $pathImage
        ]);

        return response()->json($product);
    }

    public function index(Request $request) {

        $products = new Product();

        if($request->name) {
            $products->where('name', 'LIKE', '%'.$request->name.'%');
        }

        if($request->all) {
            return response()->json(Product::all());
        }

        return response()->json($products->paginate());
    }

    public function destroy($id) {

        $product = Product::find($id);

        if(!$product) {
            return response()->json([
                "message" => "Produto não encontrada"
            ], 400);
        }

        $product->delete();

        return response()->json([
            "message" => "Produto excluída com sucesso"
        ]);
    }

    public function show($id) {
        $product = Product::find($id);

        if(!$product) {
            return response()->json([
                "message" => "Produto não encontrada"
            ], 400);
        }

        return response()->json($product);
    }
}

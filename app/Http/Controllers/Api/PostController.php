<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Validator;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class PostController extends Controller
{
  /**
   * index
   *
   * @return void
   */
  public function index()
  {
    // Get posts
    $posts = Post::latest()->paginate(5);

    // Return collection of posts as a resource
    return new PostResource(true, 'List Data Posts', $posts);
  }

  /**
   * store
   *
   * @param  mixed $request
   * @return void
   */
  public function store(Request $request)
  {
    // Define validation rules
    $validator = Validator::make($request->all(), [
      'image' => 'required|image|mimes:png,jpg,jpeg,gif,svg|max:2048',
      'title' => 'required',
      'content' => 'required',
    ]);

    // Check if validation fails
    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    // Upload Image
    if ($request->file('image')) {
      $image = $request->file('image');
      $uploadedFileUrl = Cloudinary::upload($image->getRealPath())->getSecurePath();
    }

    // Create post
    $post = Post::create([
      'image' => $uploadedFileUrl ? $uploadedFileUrl : null,
      'title' => $request->title,
      'content' => $request->content,
    ]);

    // Return response
    return new PostResource(true, 'Data Post Berhasil Ditambahkan!', $post);
  }

  /**
   * show
   *
   * @param  mixed $post
   * @return void
   */
  public function show(Post $post)
  {
    return new PostResource(true, 'Data Post Ditemukan!', $post);
  }
}
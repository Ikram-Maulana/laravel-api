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
      'image' => 'image|mimes:png,jpg,jpeg,gif,svg|max:2048',
      'title' => 'required',
      'content' => 'required',
    ]);

    // Check if validation fails
    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    // Define variable for uploaded file url
    $uploadedFileUrl = 'https://source.unsplash.com/random/800x600';

    // Upload Image
    if ($request->file('image')) {
      $image = $request->file('image');
      $uploadedFileUrl = Cloudinary::upload($image->getRealPath())->getSecurePath();
    }

    // Create post
    $post = Post::create([
      'image' => $uploadedFileUrl,
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

  /**
   * update
   *
   * @param  mixed $request
   * @param  mixed $post
   * @return void
   */
  public function update(Request $request, Post $post)
  {
    // Define validation rules
    $validator = Validator::make($request->all(), [
      'title' => 'required',
      'content' => 'required',
    ]);

    // Check if validation fails
    if ($validator->fails()) {
      return response()->json($validator->errors(), 422);
    }

    // Define variable for uploaded file url
    $uploadedFileUrl = $post->image;

    // Check if image is not empty
    if ($request->file('image')) {
      // Check old image and delete it
      if ($post->image) {
        $old_image = $post->image;
        $fileName = substr($old_image, strrpos($old_image, '/') + 1);
        $publicId = substr($fileName, 0, strrpos($fileName, '.'));
        Cloudinary::destroy($publicId);
      }

      // Upload new image
      $image = $request->file('image');
      $uploadedFileUrl = Cloudinary::upload($image->getRealPath())->getSecurePath();
    }

    // Update post
    $post->update([
      'image' => $uploadedFileUrl,
      'title' => $request->title,
      'content' => $request->content,
    ]);

    // Return response
    return new PostResource(true, 'Data Post Berhasil Diubah!', $post);
  }

  /**
   * destroy
   *
   * @param  mixed $post
   * @return void
   */
  public function destroy(Post $post)
  {
    // Check old image and delete it
    if ($post->image) {
      $old_image = $post->image;
      $fileName = substr($old_image, strrpos($old_image, '/') + 1);
      $publicId = substr($fileName, 0, strrpos($fileName, '.'));
      Cloudinary::destroy($publicId);
    }

    // Delete post
    $post->delete();

    // Return response
    return new PostResource(true, 'Data Post Berhasil Dihapus!', null);
  }
}
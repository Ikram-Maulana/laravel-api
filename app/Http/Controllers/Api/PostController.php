<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;

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
}
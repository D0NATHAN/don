<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('user')->latest()->paginate(10);
        return view('blog.index', compact('posts'));
    }

    public function create()
    {
        return view('blog.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'featured_image' => 'nullable|image|max:2048',
            'is_published' => 'boolean'
        ]);

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        $validated['user_id'] = auth()->id();
        $validated['published_at'] = $request->is_published ? now() : null;

        BlogPost::create($validated);

        return redirect()->route('blog.index')->with('success', 'Blog post created successfully.');
    }

    public function show(BlogPost $post)
    {
        return view('blog.show', compact('post'));
    }

    public function edit(BlogPost $post)
    {
        return view('blog.edit', compact('post'));
    }

    public function update(Request $request, BlogPost $post)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'featured_image' => 'nullable|image|max:2048',
            'is_published' => 'boolean'
        ]);

        if ($request->hasFile('featured_image')) {
            if ($post->featured_image) {
                Storage::disk('public')->delete($post->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        $validated['published_at'] = $request->is_published ? now() : null;

        $post->update($validated);

        return redirect()->route('blog.index')->with('success', 'Blog post updated successfully.');
    }

    public function destroy(BlogPost $post)
    {
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }
        
        $post->delete();

        return redirect()->route('blog.index')->with('success', 'Blog post deleted successfully.');
    }
} 
<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Blog Posts') }}
            </h2>
            <a href="{{ route('blog.create') }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create New Post
            </a>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            @if (session('success'))
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span class="block sm:inline">{{ session('success') }}</span>
                </div>
            @endif

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        @foreach ($posts as $post)
                            <div class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                @if ($post->featured_image)
                                    <img src="{{ Storage::url($post->featured_image) }}" alt="{{ $post->title }}" class="w-full h-48 object-cover">
                                @endif
                                <div class="p-4">
                                    <h3 class="text-xl font-semibold mb-2">{{ $post->title }}</h3>
                                    <p class="text-gray-600 mb-4">{{ Str::limit($post->content, 150) }}</p>
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-gray-500">
                                            By {{ $post->user->name }} • {{ $post->created_at->format('M d, Y') }}
                                        </span>
                                        <div class="flex space-x-2">
                                            <a href="{{ route('blog.edit', $post) }}" class="text-blue-500 hover:text-blue-700">
                                                Edit
                                            </a>
                                            <form action="{{ route('blog.destroy', $post) }}" method="POST" class="inline">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="text-red-500 hover:text-red-700" onclick="return confirm('Are you sure you want to delete this post?')">
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>

                    <div class="mt-6">
                        {{ $posts->links() }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout> 
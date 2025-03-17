<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ $post->title }}
            </h2>
            <div class="flex space-x-4">
                <a href="{{ route('blog.edit', $post) }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit Post
                </a>
                <a href="{{ route('blog.index') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Back to Posts
                </a>
            </div>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @if ($post->featured_image)
                        <div class="mb-6">
                            <img src="{{ Storage::url($post->featured_image) }}" alt="{{ $post->title }}" class="w-full h-96 object-cover rounded-lg">
                        </div>
                    @endif

                    <div class="prose max-w-none">
                        <div class="mb-4 text-sm text-gray-500">
                            <span>By {{ $post->user->name }}</span>
                            <span class="mx-2">•</span>
                            <span>Created {{ $post->created_at->format('M d, Y') }}</span>
                            @if ($post->published_at)
                                <span class="mx-2">•</span>
                                <span>Published {{ $post->published_at->format('M d, Y') }}</span>
                            @endif
                        </div>

                        <div class="mt-8">
                            {!! nl2br(e($post->content)) !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout> 
import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        setLoading(true); // Set loading to true when fetching data
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        }).catch((error) => {
            console.error("Error fetching posts:", error);
        }).finally(() => {
            setLoading(false); // Set loading to false after data is fetched
        });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FaSpinner className="w-12 h-12 text-purple-500 animate-spin" /> {/* Loading spinner */}
            </div>
        );
    }

    return (
        <div className='min-h-screen py-12'>
            <Container>
                <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-8 text-center'>
                    All Posts
                </h1>

                {posts.length === 0 ? (
                    <div className='text-center text-purple-100/80 py-12'>
                        <p className='text-xl'>No posts to display</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                className='transition-transform duration-300 hover:scale-105'
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
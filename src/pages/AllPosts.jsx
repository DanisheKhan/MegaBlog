import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { FaSpinner } from 'react-icons/fa';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchPosts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await appwriteService.getPosts(null);
                if (isMounted) {
                    setPosts(response?.documents || []);
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
                if (isMounted) setError("Failed to load posts. Please try again later.");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchPosts();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <FaSpinner className="w-12 h-12 text-purple-500" />
            </div>
        );
    }

    return (
        <div className='min-h-screen py-12'>
            <Container>
                <h1 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent mb-8 text-center'>
                    All Posts
                </h1>

                {error ? (
                    <div className='text-center text-red-400 py-12'>
                        <p className='text-xl'>{error}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className='text-center text-purple-100/80 py-12'>
                        <p className='text-xl'>No posts to display</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {posts.map((post) => (
                            <div key={post.$id}>
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
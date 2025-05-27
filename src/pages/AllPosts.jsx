import React, { useState, useEffect } from 'react';
import { Container, PostCard, Loader } from '../components';
import appwriteService from "../appwrite/config";

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
                if (isMounted) {
                    // Add a small delay for better UX
                    setTimeout(() => {
                        setLoading(false);
                    }, 800);
                }
            }
        };

        fetchPosts();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c1425]/95 p-4">
                <div className="glass-container bg-[#182234]/60 p-8 rounded-xl border border-blue-900/30 shadow-xl backdrop-blur-lg w-full max-w-xl">
                    <Loader type="shimmer" text="Loading all posts..." />
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen py-12'>
            <Container>

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
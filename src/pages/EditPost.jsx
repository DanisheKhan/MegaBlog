import React, { useEffect, useState } from 'react'
import { Container, PostForm, Loader } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                } else {
                    navigate('/')
                }
            })
                .catch(() => navigate('/'))
                .finally(() => setLoading(false))
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-container bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur-lg">
                    <Loader type="particles" text="Loading editor..." />
                </div>
            </div>
        )
    }

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
import { useState, useEffect } from 'react'
import axios from 'axios'
import PostForm from './components/PostForm/PostForm.jsx'
import PostList from './components/PostList/PostList.jsx'
import SearchFilter from './components/SearchFilter/SearchFilter.jsx'
import styles from './App.module.scss'

const App = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')

    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/posts')
                setPosts(response.data.posts)
            } catch (error) {
                console.error('Ошибка при загрузке постов:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    
    const handlePostAdded = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts])
    }

    
    const handleDeletePost = (id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
    }

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div className={styles.app}>
            <h1 className={styles.heading}>Посты</h1>

            <PostForm onPostAdded={handlePostAdded} />

            <SearchFilter value={filter} onChange={setFilter} />

            <PostList
                posts={filteredPosts}
                loading={loading}
                onDelete={handleDeletePost}
            />
        </div>
    )
}

export default App

import PostItem from '../PostItem/PostItem.jsx'
import styles from './PostList.module.scss'

const PostList = ({ posts, loading, onDelete }) => {
    if (loading) {
        return <p className={styles.status}>Загрузка постов...</p>
    }

    if (posts.length === 0) {
        return <p className={styles.status}>Постов не найдено</p>
    }

    return (
        <div className={styles.postList}>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default PostList

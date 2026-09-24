import styles from './PostItem.module.scss'

const PostItem = ({ post, onDelete }) => {
    return (
        <div className={styles.postItem}>
            <div className={styles.header}>
                <h3 className={styles.title}>{post.title}</h3>
                <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(post.id)}
                >
                    Удалить
                </button>
            </div>
            <p className={styles.body}>{post.body}</p>
        </div>
    )
}

export default PostItem

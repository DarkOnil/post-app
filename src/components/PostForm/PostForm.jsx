import { useState } from 'react'
import axios from 'axios'
import styles from './PostForm.module.scss'

const PostForm = ({ onPostAdded }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const validate = () => {
        const newErrors = {}

        if (!title.trim()) {
            newErrors.title = 'Заголовок обязателен'
        }

        if (!body.trim()) {
            newErrors.body = 'Текст поста обязателен'
        }

        setErrors(newErrors)

       
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSuccessMessage('')

        if (!validate()) {
            return
        }

        setIsSubmitting(true)

        try {
            const response = await axios.post('https://dummyjson.com/posts/add', {
                title,
                body,
                userId: 1,
            })

           
            onPostAdded(response.data)

            setSuccessMessage('Пост успешно добавлен!')
            setTitle('')
            setBody('')
            setErrors({})
        } catch (error) {
            console.error('Ошибка при добавлении поста:', error)
            setErrors({ submit: 'Не удалось отправить пост. Попробуйте ещё раз.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Добавить пост</h2>

            <div className={styles.field}>
                <label htmlFor="title">Заголовок</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                />
                {errors.title && <p className={styles.error}>{errors.title}</p>}
            </div>

            <div className={styles.field}>
                <label htmlFor="body">Текст поста</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className={styles.textarea}
                    rows={4}
                />
                {errors.body && <p className={styles.error}>{errors.body}</p>}
            </div>

            {errors.submit && <p className={styles.error}>{errors.submit}</p>}
            {successMessage && <p className={styles.success}>{successMessage}</p>}

            <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
        </form>
    )
}

export default PostForm

import styles from './SearchFilter.module.scss'

const SearchFilter = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Поиск по заголовку..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.filterInput}
        />
    )
}

export default SearchFilter

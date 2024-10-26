import styles from './AddWorkImages.module.scss'

export default function AddWorkImages() {
    return (
        <div className={styles.layout}>
            <h4>Add Work Images <span>( min - 1 slot )</span></h4>

            <div className={styles.slots}>
                <div className={styles.slot}>
                    <form>
                        <input type="text" placeholder='Title' />
                        <input type="text" placeholder='Description' />
                    </form>
                </div>
            </div>
        </div>
    )
}

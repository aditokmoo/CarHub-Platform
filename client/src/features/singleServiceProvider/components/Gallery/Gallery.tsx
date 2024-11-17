import { RiGalleryView2 } from 'react-icons/ri'
import styles from './Gallery.module.scss'

interface PropTypes {
    work: {
        images: string[],
        title: string,
        description: string,
    }[]
}

export default function Gallery({ work }: PropTypes) {
    console.log(work)
    return (
        <div className={styles.gallery}>
            {work.map(({images}, index) => (
                <img
                    key={index}
                    src={`http://localhost:8000/uploads/${images[0]}`}
                    className={styles.image}
                />
            ))}
            <button className={styles.galleryBtn}><RiGalleryView2 /> Show all photos</button>
        </div>
    )
}
import { RiGalleryView2 } from 'react-icons/ri'
import styles from './Gallery.module.scss'

interface PropTypes {
    workImages: {
        images: string[],
        title: string,
        description: string,
    }[]
}

export default function Gallery({ workImages }: PropTypes) {
    console.log(workImages)
    return (
        <div className={styles.gallery}>
            {workImages.map(({images}, index) => (
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
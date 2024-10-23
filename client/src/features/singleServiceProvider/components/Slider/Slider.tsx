import { RiGalleryView2 } from 'react-icons/ri'
import styles from './Slider.module.scss'

interface PropTypes {
    images: string[]
}

export default function Slider({ images }: PropTypes) {
    console.log(images)
    return (
        <div className={styles.slider}>
            {images.slice(0, 5).map((image: string, index: number) => (
                <img
                    key={index}
                    src={`http://localhost:8000/uploads/${image}`}
                    className={styles.image}
                />
            ))}
            <button className={styles.galleryBtn}><RiGalleryView2 /> Show all photos</button>
        </div>
    )
}
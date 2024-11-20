import { RiGalleryView2 } from 'react-icons/ri';
import { Work } from '../../../../types';
import NoImage from '../../../../assets/no-image.jpg'
import styles from './Gallery.module.scss';

export default function Gallery({ work }: { work: Work[] }) {
    console.log(work);

    const imagesToDisplay = work.length === 0
    ? Array(5).fill(NoImage)
    : [
        ...work.slice(0, 5).map(({ images }) => images.length > 0 ? `http://localhost:8000/uploads/${images[0]}` : NoImage),
        ...Array(5 - Math.min(work.length, 5)).fill(NoImage)
    ];

    return (
        <div className={styles.gallery}>
            {imagesToDisplay.map((imageSrc, index) => (
                <img
                    key={index}
                    src={imageSrc}
                    alt={`Work ${index}`}
                    className={styles.image}
                />
            ))}
            <button className={styles.galleryBtn}>
                <RiGalleryView2 /> Show all posts
            </button>
        </div>
    );
}
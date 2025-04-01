import { RiGalleryView2, RiImageEditLine } from 'react-icons/ri';
import NoImage from '../../../../assets/no-image.jpg'
import { Work } from '../../../auth/types';
import styles from './Gallery.module.scss';

interface PropTypes {
    work: Work[];
    isCurrentUser: boolean;
}

export default function Gallery({ work, isCurrentUser }: PropTypes) {
    console.log(work);

    const imagesToDisplay = work.length === 0
        ? Array(5).fill(NoImage)
        : [
            ...work.slice(0, 5).map(({ images }) => images.length > 0 ? images[0] : NoImage),
            ...Array(5 - Math.min(work.length, 5)).fill(NoImage)
        ];

    return (
        <div className={styles.gallery}>
            {imagesToDisplay.map((imageSrc, index) => (
                <div className={styles.imageWrapper}>
                    <img
                        key={index}
                        src={imageSrc}
                        alt={`Work ${index}`}
                        className={styles.image}
                    />
                    {isCurrentUser && <span className={styles.editGallery}><RiImageEditLine /></span>}
                </div>
            ))}
            <button className={styles.galleryBtn}>
                <RiGalleryView2 /> Show all posts
            </button>
        </div>
    );
}
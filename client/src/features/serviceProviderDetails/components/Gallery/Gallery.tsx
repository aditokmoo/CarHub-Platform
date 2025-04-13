import { RiGalleryView2, RiImageEditLine } from 'react-icons/ri';
import NoImage from '../../../../assets/no-image.jpg'
import { Work } from '../../../auth/types';
import useToggle from '../../../../hooks/useToggle';
import styles from './Gallery.module.scss';
import Modal from '../../../../components/Modal/Modal';
import WorkPost from './components/WorkPost/WorkPost';
import { useState } from 'react';

interface PropTypes {
    work: Work[];
    isCurrentUser: boolean;
}

export default function Gallery({ work, isCurrentUser }: PropTypes) {
    const { toggle, isActive } = useToggle();
    const [clickedPost, setClickedPost] = useState<number>(0);

    const handleGallery = (index: number) => {
        setClickedPost(index)
        if (work.length > 0 && work[index]?.workTitle !== undefined) toggle('gallery');
    }

    const imagesToDisplay = work.length === 0
        ? Array(5).fill(NoImage)
        : [
            ...work.slice(0, 5).map(({ images }) => images.length > 0 ? images[0] : NoImage),
            ...Array(5 - Math.min(work.length, 5)).fill(NoImage)
        ];

    return (
        <div className={styles.gallery}>
            {imagesToDisplay.map((imageSrc, index) => (
                <div className={styles.imageWrapper} key={index} onClick={() => handleGallery(index)}>
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

            {isActive['gallery'] && work.length > 0 && (
                <Modal type='full-screen'>
                    <WorkPost toggle={toggle} work={work} clickedPost={clickedPost} />
                </Modal>
            )}
        </div>
    );
}
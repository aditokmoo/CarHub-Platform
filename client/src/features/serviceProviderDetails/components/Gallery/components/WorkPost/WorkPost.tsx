import { IoCloseOutline } from 'react-icons/io5'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useState } from 'react';
import { Work } from '../../../../../auth/types';
import styles from './WorkPost.module.scss'

interface PropTypes {
    toggle: (key: string) => void
    work: Work[]
}

export default function WorkPost({ toggle, work }: PropTypes) {
    const [currentPost, setCurrentPost] = useState<number>(0);
    const [currentPostSlide, setCurrentPostSlide] = useState<number>(0);

    return (
        <div className={styles.galleryModal}>
            <button className={styles.closeBtn} onClick={() => toggle('gallery')}>
                <IoCloseOutline />
            </button>
            <h3 className={styles.workTitle}> {currentPost + 1} / {work.length} {work[currentPost].workTitle}</h3>
            <div className={styles.slide}>

                <div className={styles.postSliderOptions}>
                    <MdKeyboardArrowLeft className={styles.arrowLeft} onClick={() => { setCurrentPost((prev) => prev === 0 ? work.length - 1 : prev - 1), setCurrentPostSlide(0) }} />
                    <MdKeyboardArrowRight className={styles.arrowRight} onClick={() => { setCurrentPost((prev) => prev === work.length - 1 ? 0 : prev + 1), setCurrentPostSlide(0) }} />
                </div>

                <div className={styles.postSlider} style={{ background: `url(${work[currentPost].images[currentPostSlide]})` }}></div>

                <div className={styles.sliderOptions}>
                    <MdKeyboardArrowLeft className={styles.arrowLeft} onClick={() => setCurrentPostSlide((prev) => prev === 0 ? work[currentPost].images.length - 1 : prev - 1)} />
                    <span className={styles.sliderCounter}>{currentPostSlide + 1}/{work[currentPost].images.length}</span>
                    <MdKeyboardArrowRight className={styles.arrowRight} onClick={() => setCurrentPostSlide((prev) => prev === work[currentPost].images.length - 1 ? 0 : prev + 1)} />
                </div>

                <div className={styles.sliderImages}>
                    <div className={styles.sliderContainer}>
                        {work[currentPost].images.map((image: string, imageIndex: number) => (
                            <img
                                key={imageIndex}
                                src={image}
                                alt="Image"
                                className={currentPostSlide === imageIndex ? `${styles.image} ${styles.active}` : styles.image}
                                onClick={() => setCurrentPostSlide(+imageIndex)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

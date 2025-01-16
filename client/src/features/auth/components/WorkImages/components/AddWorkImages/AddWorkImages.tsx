import React from 'react';
import Input from '../../../../../../components/Input/Input';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Button from '../../../../../../components/Button/Button';
import Textarea from '../../../../../../components/Textarea/Textarea';
import useWork from '../../hooks/useWork';
import { AddWorkImagesProps } from '../../../../types';
import styles from './AddWorkImages.module.scss';
import { Controller } from 'react-hook-form';

const AddWorkImages: React.FC<AddWorkImagesProps> = ({ control, errors, toggle, setValue, handleSubmit, getValues }) => {
    const { previews, handleAddFiles, handleDeleteFile, handleAddWork } = useWork({
        getValues,
        setValue,
        toggle,
    });

    return (
        <div className={styles.layout}>
            <div className={styles.slots}>
                <div className={styles.slot}>
                    <form>
                        <div className={styles.inputField}>
                            <Controller
                                control={control}
                                name="workTitle"
                                rules={{ required: 'Enter vehicle name' }}
                                render={({ field, fieldState }) => (
                                    <Input
                                        {...field}
                                        placeholder="Enter vehicle name"
                                        label="Vehicle name"
                                        id={field.name}
                                        type="text"
                                        size="large"
                                        variant={
                                            errors[field.name] && (fieldState.isTouched || fieldState.isDirty)
                                                ? 'error'
                                                : 'default'
                                        }
                                    />
                                )}
                            />
                        </div>

                        <div className={styles.inputField}>
                            <Controller
                                control={control}
                                name="workDescription"
                                rules={{ required: 'Enter some workDescription' }}
                                render={({ field, fieldState }) => (
                                    <Textarea
                                        {...field}
                                        id={field.name}
                                        placeholder="Enter some details about the vehicle that you worked on"
                                        label="Describe your work"
                                        size="medium"
                                        variant={
                                            errors[field.name] && (fieldState.isTouched || fieldState.isDirty)
                                                ? 'error'
                                                : 'default'
                                        }
                                    />
                                )}
                            />
                        </div>

                        <div className={styles.work}>
                            <label htmlFor="images" className={styles.slotFields}>
                                <FaPlus /> Add Work Images
                            </label>
                            <Controller
                                control={control}
                                name="images"
                                rules={{
                                    required: 'Please upload at least one image.',
                                    validate: (value) => (value && value.length > 0) || 'You must upload at least one image.',
                                }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Input
                                            type="file"
                                            id={field.name}
                                            onChange={(e) => handleAddFiles(e.target.files)}
                                            multiple
                                        />
                                        {fieldState.error && (
                                            <span className={styles.error}>{fieldState.error.message}</span>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        <div className={styles.imagePreviews}>
                            {previews.map((preview: string, index: number) => (
                                <div key={index} className={styles.imagePreview}>
                                    <span className={styles.removeImage} onClick={() => handleDeleteFile(index)}>
                                        <FaTimes />
                                    </span>
                                    <img src={preview} className={styles.previewImage} />
                                </div>
                            ))}
                        </div>

                        <div className={styles.btns}>
                            <Button size="medium" variant="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                            <Button size="medium" onClick={handleSubmit(handleAddWork)}>
                                Add
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AddWorkImages);
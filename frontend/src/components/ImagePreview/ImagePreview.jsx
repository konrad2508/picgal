import styles from './ImagePreview.module.css';
import React from 'react';
import networkService from '../../services/networkService';
import useImagePreviewState from './useImagePreviewState';

const ImagePreview = ({ img, selected=false, active=true, multiselect=false }) => {
    const { usedContextValue } = useImagePreviewState();

    const onClickAction = () => {
        if (!active) {
            return;
        }

        if (multiselect) {
            usedContextValue.onClickPreviewInMultiselect(img);
        }
        else {
            usedContextValue.onImagePreviewClick(img);
        }
    };

    const MAX_DIM = 150;

    const { width, height } = img;

    let newWidth = 0;
    let newHeight = 0;

    if (width > height) {
        const diviser = width / MAX_DIM;
        
        newWidth = MAX_DIM;
        newHeight = Math.ceil(height / diviser);
    }
    else {
        const diviser = height / MAX_DIM;
        
        newWidth = Math.ceil(width / diviser);
        newHeight = MAX_DIM;
    }

    let style;
    if (img.encrypted && selected) {
        style = styles.selectedEncrypted;
    }
    else if (img.encrypted && !selected) {
        style = styles.notSelectedEncrypted;
    }
    else if (!img.encrypted && selected) {
        style = styles.selected;
    }
    else {
        style = styles.notSelected;
    }

    return (
        <div className={styles.container}>
            <img
                src={networkService.getURLToBackend(img.preview)}
                alt={img.preview}
                width={newWidth}
                height={newHeight}
                onClick={onClickAction}
                className={style}
            />
        </div>
    );
};
 
export default ImagePreview;

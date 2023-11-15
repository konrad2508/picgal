import styles from './BatchSelect.module.css';
import React from 'react';
import UsedQuery from '../UsedQuery/UsedQuery';
import ImagePreview from '../ImagePreview/ImagePreview';
import Pager from '../Pager/Pager';
import useBatchSelectState from './useBatchSelectState';

const BatchSelect = ({ title }) => {
    const { usedContextValue } = useBatchSelectState();

    return (
        <>
            <h3>{title}</h3>
            <UsedQuery/>
            <div className={styles.previews}>
                {
                    usedContextValue.imagesToShow.map(img => 
                        <ImagePreview
                            key={img.id}
                            img={img}
                            batchEditor={true}
                            selected={usedContextValue.batchEditorSelected.some((i) => i.id === img.id)}
                        />
                    )
                }
            </div>
            <div>
                <Pager/>
            </div>
            <h3>Selected images</h3>
            <div className={styles.previews}>
                {usedContextValue.batchEditorSelected.map(img => <ImagePreview key={img.id} img={img} active={false}/>)}
            </div>
        </>
    );
};

export default BatchSelect;

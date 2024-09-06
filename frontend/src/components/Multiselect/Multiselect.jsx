import styles from './Multiselect.module.css';
import React from 'react';
import UsedQuery from '../UsedQuery/UsedQuery';
import ImagePreview from '../ImagePreview/ImagePreview';
import Pager from '../Pager/Pager';
import useMultiselectState from './useMultiselectState';

const Multiselect = ({ title }) => {
    const { usedContextValue } = useMultiselectState();

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
                            multiselect={true}
                            selected={usedContextValue.multiselectSelected.some((i) => i.id === img.id)}
                        />
                    )
                }
            </div>
            <div>
                <Pager/>
            </div>
            <h3>Selected images</h3>
            <div className={styles.previews}>
                {usedContextValue.multiselectSelected.map(img => <ImagePreview key={img.id} img={img} active={false}/>)}
            </div>
        </>
    );
};

export default Multiselect;

import styles from './Multiselect.module.css';
import React from 'react';
import Count from '../Count/Count';
import UsedQuery from '../UsedQuery/UsedQuery';
import ImagePreview from '../ImagePreview/ImagePreview';
import Pager from '../Pager/Pager';
import MultiselectCount from '../MultiselectCount/MultiselectCount';
import useMultiselectState from './useMultiselectState';

const Multiselect = () => {
    const { usedContextValue } = useMultiselectState();

    return (
        <div className={styles.box}>
            <div className={styles.container}>
                <UsedQuery/>
                <Count/>
                <MultiselectCount/>
                <hr className={styles.breakline}/>
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
                <div className={styles.pager}>
                    <Pager/>
                </div>
            </div>
        </div>
    );
};

export default Multiselect;

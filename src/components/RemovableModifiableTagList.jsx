import styles from '../styles/RemovableModifiableTagList.module.css';
import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import ModifiableTag from './ModifiableTag';
import ModifiableTagListContext from './context/ModifiableTagListContext';

const RemovableModifiableTagList = ({ tagType }) => {
    const { tagList, switchStateNormal } = React.useContext(ModifiableTagListContext);

    return (
        <>
            <div className={styles.container}>
                <h3>{tagType}</h3>
                <div className={styles.buttonContainer}>
                    <button 
                        className={styles.button}
                        disabled={true}
                    >
                        <FaSave className='fontAwesome'/>
                    </button>
                    <button
                        className={styles.button}
                        onClick={switchStateNormal}
                    >
                        <FaTimes className='fontAwesome'/>
                    </button>
                </div>
            </div>
            <ul>
                {tagList.map((e, i) => <ModifiableTag key={i} tag={e}/>)}
            </ul>
        </>
    );
};

export default RemovableModifiableTagList;

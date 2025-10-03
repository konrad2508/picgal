import styles from './AddableModifiableTagList.module.css';
import React from 'react';
import { FaPlus, FaRegTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import ModifiableTag from '../ModifiableTag/ModifiableTag';
import AutocompleteNewTag from '../AutocompleteNewTag/AutocompleteNewTag';
import useAddableModifiableTagListState from './useAddableModifiableTagListState';

const AddableModifiableTagList = ({ tagType, existingTags }) => {
    const { usedContextValue } = useAddableModifiableTagListState();

    const filterUsedTags = () => {
        const tagListNames = usedContextValue.tagList.map(e => e.name);
        const tagsNames = existingTags.map(e => e.name);

        const filteredTagsNames = tagsNames.filter(e => !tagListNames.includes(e));

        return existingTags.filter(e => filteredTagsNames.includes(e.name));
    };

    return (
        <>
            <div className={styles.container}>
                <h3>{tagType.overridedBy ? usedContextValue.config[tagType.overridedBy] : tagType.name}</h3>
                <div className={styles.buttonContainer}>
                    <button className={styles.button1} disabled={true} style={{cursor: 'default'}}>
                        <FaPlus className='fontAwesome'/>
                    </button>
                    <button className={styles.button2} disabled={true} style={{cursor: 'default'}}>
                        <FaRegTrashAlt className='fontAwesome'/>
                    </button>
                </div>
            </div>
            {usedContextValue.tagList.map((e, i) => <ModifiableTag key={i} tag={e}/>)}
            <form className={styles.form} onSubmit={usedContextValue.onAddTag}>
                <div className={styles.container}>
                    <div className={styles.inputContainer}>
                        <AutocompleteNewTag existingTags={filterUsedTags()}/>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button1} type='submit'>
                            <FaSave className='fontAwesome'/>
                        </button>
                        <button className={styles.button2} type='button' onClick={usedContextValue.switchStateNormal}>
                            <FaTimes className='fontAwesome'/>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddableModifiableTagList;

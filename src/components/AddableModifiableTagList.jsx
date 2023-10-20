import styles from '../styles/AddableModifiableTagList.module.css';
import React from 'react';
import { FaPlus, FaRegTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import ModifiableTag from './ModifiableTag';
import AutocompleteNewTag from './AutocompleteNewTag';
import useAddableModifiableTagListState from '../hooks/useAddableModifiableTagListState';

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
                    <button className={styles.button} disabled={true}>
                        <FaPlus className='fontAwesome'/>
                    </button>
                    <button className={styles.button} disabled={true}>
                        <FaRegTrashAlt className='fontAwesome'/>
                    </button>
                </div>
            </div>
            <ul>
                {usedContextValue.tagList.map((e, i) => <ModifiableTag key={i} tag={e}/>)}
            </ul>
            <form onSubmit={usedContextValue.onAddTag}>
                <div className={styles.container}>
                    <div className={styles.inputContainer}>
                        <AutocompleteNewTag existingTags={filterUsedTags()}/>
                    </div>
                    <button type='submit'>
                        <FaSave className='fontAwesome'/>
                    </button>
                    <button type='button' onClick={usedContextValue.switchStateNormal}>
                        <FaTimes className='fontAwesome'/>
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddableModifiableTagList;

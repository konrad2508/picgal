import styles from '../styles/AddableModifiableTagList.module.css';
import React from 'react';
import ModifiableTag from './ModifiableTag';
import AutocompleteNewTag from './AutocompleteNewTag';


const AddableModifiableTagList = ({ tagType,
                                    tagList,
                                    tagListState,
                                    newTagName,
                                    onAddTag,
                                    onInputChange,
                                    switchStateNormal,
                                    existingTags }) => {
    const filterUsedTags = () => {
        const tagListNames = tagList.map(e => e.name);
        const tagsNames = existingTags.map(e => e.name);

        const filteredTagsNames = tagsNames.filter(e => !tagListNames.includes(e));

        return existingTags.filter(e => filteredTagsNames.includes(e.name));
    };

    return (
        <>
            <div className={styles.container}>
                <h3>{tagType}</h3>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} disabled={true}>+</button>
                    <button className={styles.button} disabled={true}>-</button>
                </div>
            </div>
            <ul>
                {tagList.map((e, i) => <ModifiableTag key={i} tag={e} tagListState={tagListState}/>)}
            </ul>
            <form onSubmit={onAddTag}>
                <div className={styles.container}>
                    <div className={styles.inputContainer}>
                        <AutocompleteNewTag
                            query={newTagName}
                            handleQueryChange={onInputChange}
                            existingTags={filterUsedTags()}
                        />
                    </div>
                    <button type='submit'>+</button>
                    <button type='button' onClick={switchStateNormal}>-</button>
                </div>
            </form>
        </>
    );
};

export default AddableModifiableTagList;

import React from 'react';
import AddableModifiableTagList from './AddableModifiableTagList';
import RemovableModifiableTagList from './RemovableModifiableTagList';
import CancelableModifiableTagList from './CancelableModifiableTagList';
import useModifiableTagListState from '../hooks/useModifiableTagListState';
import TagListState from '../enums/TagListState';
import TagType from '../enums/TagType';
import ModifiableTagListContext from './context/ModifiableTagListContext';

const ModifiableTagList = ({ tagType, tags }) => {
    const { usedContextValue, contextValue } = useModifiableTagListState(tagType, tags); 

    const filterExistingTags = (tagType) => {
        if (tagType === TagType.CHARACTERS) {
            return usedContextValue.existingTags.filter(e => e.type === 1);
        }
        else if (tagType === TagType.SOURCES) {
            return usedContextValue.existingTags.filter(e => e.type === 2);
        }
        else if (tagType === TagType.GENERAL) {
            return usedContextValue.existingTags.filter(e => e.type === 3);
        }
        else if (tagType === TagType.META) {
            return usedContextValue.existingTags.filter(e => e.type === 4);
        }
        else {
            return [];
        };
    };

    const renderTagList = () => {
        if (contextValue.tagListState === TagListState.ADD) {
            return (
                <AddableModifiableTagList tagType={tagType} existingTags={filterExistingTags(tagType)}/>
            );
        }
        else if (contextValue.tagListState === TagListState.REMOVE) {
            return (
                <RemovableModifiableTagList tagType={tagType}/>
            );
        }
        else {
            return (
                <CancelableModifiableTagList tagType={tagType}/>
            );
        }
    };

    return (
        <ModifiableTagListContext.Provider value={contextValue}>
            { renderTagList() }
        </ModifiableTagListContext.Provider>
    );
};

export default ModifiableTagList;

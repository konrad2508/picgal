import React from 'react';
import AddableModifiableTagList from '../AddableModifiableTagList/AddableModifiableTagList';
import RemovableModifiableTagList from '../RemovableModifiableTagList/RemovableModifiableTagList';
import CancelableModifiableTagList from '../CancelableModifiableTagList/CancelableModifiableTagList';
import useModifiableTagListState from './useModifiableTagListState';
import TagListState from '../../enums/TagListState';
import TagType from '../../enums/TagType';
import ModifiableTagListContext from '../../context/ModifiableTagListContext';

const ModifiableTagList = ({ tagType, tags }) => {
    const { usedContextValue, contextValue } = useModifiableTagListState(tagType, tags); 

    const filterExistingTags = (tagType) => {
        if (tagType === TagType.CHARACTERS) {
            return usedContextValue.existingTags.filter(e => e.tagType === TagType.CHARACTERS.value);
        }
        else if (tagType === TagType.SOURCES) {
            return usedContextValue.existingTags.filter(e => e.tagType === TagType.SOURCES.value);
        }
        else if (tagType === TagType.GENERAL) {
            return usedContextValue.existingTags.filter(e => e.tagType === TagType.GENERAL.value);
        }
        else if (tagType === TagType.META) {
            return usedContextValue.existingTags.filter(e => e.tagType === TagType.META.value);
        }
        else {
            return [];
        }
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

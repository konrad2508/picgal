import React from 'react';
import TagListState from '../enums/TagListState';
import useModifiableTagListState from '../hooks/useModifiableTagListState';
import ModifiableTagListCommand from '../enums/ModifiableTagListCommand';
import AddableModifiableTagList from './AddableModifiableTagList';
import RemovableModifiableTagList from './RemovableModifiableTagList';
import CancelableModifiableTagList from './CancelableModifiableTagList';

const ModifiableTagList = ({ tagType, tags, onModificationsChange, existingTags }) => {
    const { modifiableTagListState, setModifiableTagListState } = useModifiableTagListState(tags); 

    const switchStateNormal    = ()          => setModifiableTagListState(ModifiableTagListCommand.SWITCH_STATE, { state: TagListState.NORMAL });
    const switchStateAdd       = ()          => setModifiableTagListState(ModifiableTagListCommand.SWITCH_STATE, { state: TagListState.ADD });
    const switchStateRemove    = ()          => setModifiableTagListState(ModifiableTagListCommand.SWITCH_STATE, { state: TagListState.REMOVE });
    const onAddTag             = (event)     => setModifiableTagListState(ModifiableTagListCommand.ADD_TAG,      { event, tagType, onModificationsChange });
    const onInputChange        = (event)     => setModifiableTagListState(ModifiableTagListCommand.INPUT_CHANGE, { event });
    const onRemoveTag          = (tag)       => setModifiableTagListState(ModifiableTagListCommand.REMOVE_TAG,   { tag, tagType, onModificationsChange });
    const onCancelModification = (tag, type) => setModifiableTagListState(ModifiableTagListCommand.CANCEL,       { tag, type, tagType, onModificationsChange });

    if (modifiableTagListState.tagListState === TagListState.ADD) {
        return (
            <AddableModifiableTagList
                tagType={tagType}
                tagList={modifiableTagListState.tagList}
                tagListState={modifiableTagListState.tagListState}
                newTagName={modifiableTagListState.newTagName}
                switchStateNormal={switchStateNormal}
                onAddTag={onAddTag}
                onInputChange={onInputChange}
                existingTags={existingTags}
            />
        );
    }
    else if (modifiableTagListState.tagListState === TagListState.REMOVE) {
        return (
            <RemovableModifiableTagList
                tagType={tagType}
                tagList={modifiableTagListState.tagList}
                tagListState={modifiableTagListState.tagListState}
                switchStateNormal={switchStateNormal}
                onRemoveTag={onRemoveTag}
            />
        );
    }
    else {
        return (
            <CancelableModifiableTagList
                tagType={tagType}
                tagList={modifiableTagListState.tagList}
                tagListState={modifiableTagListState.tagListState}
                switchStateAdd={switchStateAdd}
                switchStateRemove={switchStateRemove}
                onCancelModification={onCancelModification}
            />
        );
    }
};

export default ModifiableTagList;

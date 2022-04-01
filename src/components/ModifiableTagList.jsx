import React from 'react';
import AddableModifiableTagList from './AddableModifiableTagList';
import RemovableModifiableTagList from './RemovableModifiableTagList';
import CancelableModifiableTagList from './CancelableModifiableTagList';
import useModifiableTagListState from '../hooks/useModifiableTagListState';
import TagListState from '../enums/TagListState';
import ModifiableTagListCommand from '../enums/ModifiableTagListCommand';
import TagType from '../enums/TagType';
import TagListsContext from './context/TagListsContext';
import AppContext from './context/AppContext';
import ModifiableTagListContext from './context/ModifiableTagListContext';

const ModifiableTagList = ({ tagType, tags }) => {
    const { existingTags } = React.useContext(AppContext);
    const { onModificationsChange } = React.useContext(TagListsContext);

    const { modifiableTagListState, setModifiableTagListState } = useModifiableTagListState(tags); 

    const switchStateNormal = () => setModifiableTagListState(ModifiableTagListCommand.SWITCH_STATE, { state: TagListState.NORMAL });
    const switchStateAdd = () => setModifiableTagListState(ModifiableTagListCommand.SWITCH_STATE, { state: TagListState.ADD });
    const switchStateRemove = () => setModifiableTagListState(ModifiableTagListCommand.SWITCH_STATE, { state: TagListState.REMOVE });
    const onAddTag = (event) =>
        setModifiableTagListState(ModifiableTagListCommand.ADD_TAG, { event, tagType, onModificationsChange, existingTags });
    const onInputChange = (event) => setModifiableTagListState(ModifiableTagListCommand.INPUT_CHANGE, { event });
    const onRemoveTag = (tag) => setModifiableTagListState(ModifiableTagListCommand.REMOVE_TAG, { tag, tagType, onModificationsChange });
    const onCancelModification = (tag, type) =>
        setModifiableTagListState(ModifiableTagListCommand.CANCEL, { tag, type, tagType, onModificationsChange });

    const modifiableTagListContextValue = {
        tagList: modifiableTagListState.tagList,
        tagListState: modifiableTagListState.tagListState,
        newTagName: modifiableTagListState.newTagName,
        switchStateNormal,
        switchStateAdd,
        switchStateRemove,
        onAddTag,
        onInputChange,
        onRemoveTag,
        onCancelModification
    };

    const filterExistingTags = (tagType) => {
        if (tagType === TagType.CHARACTERS) {
            return existingTags.filter(e => e.type === 1);
        }
        else if (tagType === TagType.SOURCES) {
            return existingTags.filter(e => e.type === 2);
        }
        else if (tagType === TagType.GENERAL) {
            return existingTags.filter(e => e.type === 3);
        }
        else if (tagType === TagType.META) {
            return existingTags.filter(e => e.type === 4);
        }
        else {
            return [];
        };
    };

    const renderTagList = () => {
        if (modifiableTagListState.tagListState === TagListState.ADD) {
            return (
                <AddableModifiableTagList tagType={tagType} existingTags={filterExistingTags(tagType)}/>
            );
        }
        else if (modifiableTagListState.tagListState === TagListState.REMOVE) {
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
        <ModifiableTagListContext.Provider value={modifiableTagListContextValue}>
            { renderTagList() }
        </ModifiableTagListContext.Provider>
    );
};

export default ModifiableTagList;

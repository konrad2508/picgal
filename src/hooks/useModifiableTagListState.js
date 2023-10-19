import React from 'react';
import TagListsContext from '../components/context/TagListsContext';
import AppContext from '../components/context/AppContext';
import TagListState from '../enums/TagListState';
import TagState from '../enums/TagState';
import modifiableTagListStateService from '../services/modifiableTagListStateService';

const useModifiableTagListState = (tagType, tags) => {
    const { existingTags } = React.useContext(AppContext);
    const { onModificationsChange } = React.useContext(TagListsContext);

    const startingTags = tags ? tags.map((e) => ({ name: e, type: TagState.NORMAL })) : [];

    const [ tagList, setTagList ] = React.useState(startingTags);
    const [ tagListState, setTagListState ] = React.useState(TagListState.NORMAL);
    const [ newTagName, setNewTagName ] = React.useState('');

    const hookService = modifiableTagListStateService({ setTagList, setTagListState, setNewTagName });

    const switchStateNormal = () => hookService.switchStateCommand(TagListState.NORMAL);

    const switchStateAdd = () => hookService.switchStateCommand(TagListState.ADD);

    const switchStateRemove = () => hookService.switchStateCommand(TagListState.REMOVE);

    const onAddTag = (event) => {
        event.preventDefault();

        hookService.addTagCommand(newTagName, existingTags, tagType, tagList, onModificationsChange);
    };

    const onInputChange = (event) => hookService.inputChangeCommand(event);

    const onRemoveTag = (tag) => hookService.removeTagCommand(tag, tagType, onModificationsChange, tagList);

    const onCancelModification = (tag, type) => hookService.cancelCommand(type, tag, tagType, onModificationsChange, tagList);

    const usedContextValue = {
        existingTags,
        onModificationsChange
    };

    const contextValue = {
        tagList,
        tagListState,
        newTagName,
        switchStateNormal,
        switchStateAdd,
        switchStateRemove,
        onAddTag,
        onInputChange,
        onRemoveTag,
        onCancelModification
    };

    return {
        usedContextValue,
        contextValue
    };
};

export default useModifiableTagListState;

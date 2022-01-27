import React from 'react';
import TagListState from '../enums/TagListState';
import TagState from '../enums/TagState';
import ModifiableTagListCommand from '../enums/ModifiableTagListCommand';
import TagType from '../enums/TagType';
import TagTypeNumerical from '../enums/TagTypeNumerical';
import queryService from '../services/queryService';

const useModifiableTagListState = (tags) => {
    const startingTags = tags.map((e) => ({ name: e, type: TagState.NORMAL }));

    const [tagList, setTagList] = React.useState(startingTags);
    const [tagListState, setTagListState] = React.useState(TagListState.NORMAL);
    const [newTagName, setNewTagName] = React.useState('');

    const canAddTag = (existingTags, tagType, toAdd) => {
        if (toAdd.includes(':')) {
            const potentialVirtualTag = queryService.findPotentialVirtualTag(toAdd, existingTags);

            if (potentialVirtualTag !== undefined) {
                return false;
            }
        }
        
        const potentialDuplicate = existingTags.find(e => e.name === toAdd);

        if (potentialDuplicate === undefined) {
            return true;
        }

        let numericalTagType;
        if (tagType === TagType.CHARACTERS) {
            numericalTagType = TagTypeNumerical.CHARACTERS;
        }
        else if (tagType === TagType.SOURCES) {
            numericalTagType = TagTypeNumerical.SOURCES;
        }
        else if (tagType === TagType.GENERAL) {
            numericalTagType = TagTypeNumerical.GENERAL;
        }
        else if (tagType === TagType.META) {
            numericalTagType = TagTypeNumerical.META;
        }
        else {
            numericalTagType = TagTypeNumerical.UNDEFINED;
        }

        if (potentialDuplicate.type === numericalTagType) {
            return true;
        }

        return false;
    };

    const setModifiableTagListState = (command, args) => {
        switch (command) {
            case ModifiableTagListCommand.ADD_TAG: {
                const { event, tagType, onModificationsChange, existingTags } = args;

                event.preventDefault();

                const toAdd = queryService.inputTagToNormalTag(newTagName);

                if (canAddTag(existingTags, tagType, toAdd) && !tagList.map(e => e.name).includes(toAdd)) {
                    onModificationsChange(`${tagType.toLowerCase()}Added`, toAdd);

                    setTagList([...tagList, { name: toAdd, type: TagState.ADDED }])
                }

                setNewTagName('');
                setTagListState(TagListState.NORMAL);

                break;
            }

            case ModifiableTagListCommand.INPUT_CHANGE: {
                const { event } = args;

                setNewTagName(event.target.value);

                break;
            }

            case ModifiableTagListCommand.REMOVE_TAG: {
                const { tag, tagType, onModificationsChange } = args;

                onModificationsChange(`${tagType.toLowerCase()}Removed`, tag);

                const newTags = [...tagList];
                newTags.find((e, i) => {
                    if (e.name === tag) {
                        newTags[i] = { name: tag, type: TagState.REMOVED };

                        return true;
                    }
                    return false;
                });
                setTagList(newTags);

                setTagListState(TagListState.NORMAL);

                break;
            }

            case ModifiableTagListCommand.CANCEL: {
                const { tag, type, tagType, onModificationsChange } = args;

                let action = ''
                if (type === TagState.ADDED) {
                    action = 'Removed';
                }
                else {
                    action = 'Added';
                }

                onModificationsChange(`${tagType.toLowerCase()}${action}`, tag);

                let newTags = [...tagList];
                newTags.find((e, i) => {
                    if (e.name === tag) {
                        if (type === TagState.REMOVED) {
                            newTags[i] = { name: tag, type: TagState.NORMAL };
                        }
                        else {
                            newTags = newTags.filter(e => e.name !== tag);
                        }
                        return true;
                    }
                    return false;
                });
                setTagList(newTags);

                break;
            }

            case ModifiableTagListCommand.SWITCH_STATE: {
                const { state } = args;

                setTagListState(state);

                break;
            }

            default: { }
        }
    };

    return {
        modifiableTagListState: { tagList, tagListState, newTagName },
        setModifiableTagListState
    };
};

export default useModifiableTagListState;

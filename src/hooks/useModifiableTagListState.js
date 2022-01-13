import React from 'react';
import TagListState from '../enums/TagListState';
import TagState from '../enums/TagState';
import ModifiableTagListCommand from '../enums/ModifiableTagListCommand';
import TagType from '../enums/TagType';

const useModifiableTagListState = (tags) => {
    const startingTags = tags.map((e) => ({ name: e, type: TagState.NORMAL }));

    const [tagList, setTagList] = React.useState(startingTags);
    const [tagListState, setTagListState] = React.useState(TagListState.NORMAL);
    const [newTagName, setNewTagName] = React.useState('');

    const checkIfDuplicateExists = (existingTags, tagType, toAdd) => {
        const potentialDuplicate = existingTags.find(e => e.name === toAdd);

        let numericalTagType;
        if (tagType === TagType.CHARACTERS) {
            numericalTagType = 1;
        }
        else if (tagType === TagType.SOURCES) {
            numericalTagType = 2;
        }
        else if (tagType === TagType.GENERAL) {
            numericalTagType = 3;
        }
        else if (tagType === TagType.META) {
            numericalTagType = 4;
        }
        else {
            numericalTagType = 9999;
        }

        return potentialDuplicate !== undefined && potentialDuplicate.type !== numericalTagType;
    };

    const setModifiableTagListState = (command, args) => {
        switch (command) {
            case ModifiableTagListCommand.ADD_TAG: {
                const { event, tagType, onModificationsChange, existingTags } = args;

                event.preventDefault();

                const toAdd = newTagName.trim().replaceAll('_', ' ');
                
                if (!checkIfDuplicateExists(existingTags, tagType, toAdd) && !tagList.map(e => e.name).includes(toAdd)) {
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

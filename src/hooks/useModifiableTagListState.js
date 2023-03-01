import React from 'react';
import TagListState from '../enums/TagListState';
import TagState from '../enums/TagState';
import ModifiableTagListCommand from '../enums/ModifiableTagListCommand';
import modifiableTagListStateService from '../services/modifiableTagListStateService';

const useModifiableTagListState = (tags) => {
    const startingTags = tags ? tags.map((e) => ({ name: e, type: TagState.NORMAL })) : [];

    const [tagList, setTagList] = React.useState(startingTags);
    const [tagListState, setTagListState] = React.useState(TagListState.NORMAL);
    const [newTagName, setNewTagName] = React.useState('');

    const hookService = modifiableTagListStateService({ setTagList, setTagListState, setNewTagName });

    const setModifiableTagListState = (command, args) => {
        switch (command) {
            case ModifiableTagListCommand.ADD_TAG: {
                const { event, tagType, onModificationsChange, existingTags } = args;
                event.preventDefault();

                hookService.addTagCommand(newTagName, existingTags, tagType, tagList, onModificationsChange);

                break;
            }

            case ModifiableTagListCommand.INPUT_CHANGE: {
                const { event } = args;

                hookService.inputChangeCommand(event);

                break;
            }

            case ModifiableTagListCommand.REMOVE_TAG: {
                const { tag, tagType, onModificationsChange } = args;

                hookService.removeTagCommand(tag, tagType, onModificationsChange, tagList);

                break;
            }

            case ModifiableTagListCommand.CANCEL: {
                const { tag, type, tagType, onModificationsChange } = args;

                hookService.cancelCommand(type, tag, tagType, onModificationsChange, tagList);

                break;
            }

            case ModifiableTagListCommand.SWITCH_STATE: {
                const { state } = args;

                hookService.switchStateCommand(state);

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

import TagListState from '../enums/TagListState';
import TagState from '../enums/TagState';
import queryService from '../services/queryService';

const modifiableTagListStateService = ({ setTagList, setTagListState, setNewTagName }) => {
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

        if (potentialDuplicate.type === tagType.value) {
            return true;
        }

        return false;
    };

    const addTagCommand = (newTagName, existingTags, tagType, tagList, onModificationsChange) => {
        const toAdd = queryService.inputTagToNormalTag(newTagName);

        if (canAddTag(existingTags, tagType, toAdd) && !tagList.map(e => e.name).includes(toAdd)) {
            onModificationsChange(`${tagType.name.toLowerCase()}Added`, toAdd);

            setTagList([...tagList, { name: toAdd, type: TagState.ADDED }]);
        }

        setNewTagName('');
        setTagListState(TagListState.NORMAL);
    };

    const inputChangeCommand = (e) => {
        setNewTagName(e.target.value);
    };

    const removeTagCommand = (tag, tagType, onModificationsChange, tagList) => {
        onModificationsChange(`${tagType.name.toLowerCase()}Removed`, tag);

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
    };

    const cancelCommand = (type, tag, tagType, onModificationsChange, tagList) => {
        let action = '';
        if (type === TagState.ADDED) {
            action = 'Removed';
        }
        else {
            action = 'Added';
        }

        onModificationsChange(`${tagType.name.toLowerCase()}${action}`, tag);

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
    };

    const switchStateCommand = (state) => {
        setTagListState(state);
    };

    return {
        addTagCommand,
        inputChangeCommand,
        removeTagCommand,
        cancelCommand,
        switchStateCommand
    };
};

export default modifiableTagListStateService;

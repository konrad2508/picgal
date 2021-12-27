import React from 'react';
import TagList from './TagList';
import TagListsTitleBar from './TagListsTitleBar';
import TagListsCommand from '../enums/TagListsCommand';
import useTagListsState from '../hooks/useTagListsState';
import TagType from '../enums/TagType';

const TagLists = ({ img, onClickTag, onSaveModifiedTagsClick, existingTags }) => {
    const { tagListsState, setTagListsState } = useTagListsState();

    const onModificationsChange  = (op, element) => setTagListsState(TagListsCommand.ADD_MODIFICATION, { op, element });
    const changeModificationMode = (mode)        => setTagListsState(TagListsCommand.SWITCH_MODE,      { id: img.id, onSaveModifiedTagsClick, mode });

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

    return (
        <>
            <TagListsTitleBar modificationMode={tagListsState.modificationMode} changeModificationMode={changeModificationMode}/>
            <TagList
                tagType={TagType.CHARACTERS}
                tags={img.characters}
                onClickTag={onClickTag}
                modificationMode={tagListsState.modificationMode}
                onModificationsChange={onModificationsChange}
                existingTags={filterExistingTags(TagType.CHARACTERS)}
            />
            <TagList
                tagType={TagType.SOURCES}
                tags={img.sources}
                onClickTag={onClickTag}
                modificationMode={tagListsState.modificationMode}
                onModificationsChange={onModificationsChange}
                existingTags={filterExistingTags(TagType.SOURCES)}
            />
            <TagList
                tagType={TagType.GENERAL}
                tags={img.general}
                onClickTag={onClickTag}
                modificationMode={tagListsState.modificationMode}
                onModificationsChange={onModificationsChange}
                existingTags={filterExistingTags(TagType.GENERAL)}
            />
            <TagList
                tagType={TagType.META}
                tags={img.meta}
                onClickTag={onClickTag}
                modificationMode={tagListsState.modificationMode}
                onModificationsChange={onModificationsChange}
                existingTags={filterExistingTags(TagType.META)}
            />
        </>
    );
};

export default TagLists;

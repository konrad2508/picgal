import React from 'react';
import TagList from './TagList';
import TagListsTitleBar from './TagListsTitleBar';
import TagListsCommand from '../enums/TagListsCommand';
import TagType from '../enums/TagType';
import useTagListsState from '../hooks/useTagListsState';
import AppContext from './context/AppContext';
import TagListsContext from './context/TagListsContext';

const TagLists = ({ img }) => {
    const { onSaveModifiedTagsClick } = React.useContext(AppContext);

    const { tagListsState, setTagListsState } = useTagListsState();

    const onModificationsChange  = (op, element) => setTagListsState(TagListsCommand.ADD_MODIFICATION, { op, element });
    const changeModificationMode = (mode) => setTagListsState(TagListsCommand.SWITCH_MODE, { id: img.id, onSaveModifiedTagsClick, mode });

    const tagListsContextValue = {
        modificationMode: tagListsState.modificationMode,
        changeModificationMode,
        onModificationsChange
    };

    return (
        <TagListsContext.Provider value={tagListsContextValue}>
            <TagListsTitleBar/>
            <TagList tagType={TagType.CHARACTERS} tags={img.characters}/>
            <TagList tagType={TagType.SOURCES} tags={img.sources}/>
            <TagList tagType={TagType.GENERAL} tags={img.general}/>
            <TagList tagType={TagType.META} tags={img.meta}/>
        </TagListsContext.Provider>
    );
};

export default TagLists;

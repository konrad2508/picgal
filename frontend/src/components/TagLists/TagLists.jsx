import React from 'react';
import TagList from '../TagList/TagList';
import TagListsTitleBar from '../TagListsTitleBar/TagListsTitleBar';
import TagType from '../../enums/TagType';
import useTagListsState from './useTagListsState';
import TagListsContext from '../../context/TagListsContext';

const TagLists = ({ img }) => {
    const { contextValue } = useTagListsState(img);

    return (
        <TagListsContext.Provider value={contextValue}>
            <TagListsTitleBar/>
            <TagList tagType={TagType.CHARACTERS} tags={img?.characters}/>
            <TagList tagType={TagType.SOURCES} tags={img?.sources}/>
            <TagList tagType={TagType.GENERAL} tags={img?.general}/>
            <TagList tagType={TagType.META} tags={img?.meta}/>
        </TagListsContext.Provider>
    );
};

export default TagLists;

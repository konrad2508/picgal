import React from 'react';
import TagList from '../TagList/TagList';
import TagListsTitleBar from '../TagListsTitleBar/TagListsTitleBar';
import TagType from '../../enums/TagType';
import AppState from '../../enums/AppState';
import useTagListsState from './useTagListsState';
import TagListsContext from '../../context/TagListsContext';

const TagLists = ({ img }) => {
    const { usedContextValue, contextValue } = useTagListsState(img);

    const shouldRenderHr = (tags, tagsBelow) => {
        if (contextValue.modificationMode || usedContextValue.appState === AppState.BATCH_TAG_EDITOR) {
            return true;
        }

        return tags?.length > 0 && tagsBelow.some(e => e?.length > 0);
    };

    return (
        <TagListsContext.Provider value={contextValue}>
            <TagListsTitleBar/>
            <TagList tagType={TagType.LOWLEVEL} tags={img?.lowlevel}/>
            { shouldRenderHr(img?.lowlevel, [img?.highlevel, img?.general, img?.meta]) && <hr/> }
            <TagList tagType={TagType.HIGHLEVEL} tags={img?.highlevel}/>
            { shouldRenderHr(img?.highlevel, [img?.general, img?.meta]) && <hr/> }
            <TagList tagType={TagType.GENERAL} tags={img?.general}/>
            { shouldRenderHr(img?.general, [img?.meta]) && <hr/> }
            <TagList tagType={TagType.META} tags={img?.meta}/>
        </TagListsContext.Provider>
    );
};

export default TagLists;

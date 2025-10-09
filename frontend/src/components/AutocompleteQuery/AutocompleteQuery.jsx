import styles from './AutocompleteQuery.module.css';
import React from 'react';
import TagCategory from '../../enums/TagCategory';
import useAutocompleteQueryState from './useAutocompleteQueryState';
import queryService from '../../services/queryService';
import TagType from '../../enums/TagType';

const AutocompleteQuery = ({ query, handleQueryChange, existingTags }) => {
    const { contextValue } = useAutocompleteQueryState(existingTags);

    let rightQuery, leftQuery;
    if (query) {
        const splittedQuery = query.split(' ');
        rightQuery = splittedQuery.at(-1);
        leftQuery = splittedQuery.slice(0, -1).join(' ');

        if (rightQuery.includes(':')) {
            const potentialVirtualTag = queryService.findPotentialVirtualTag(rightQuery, existingTags);

            if (potentialVirtualTag !== undefined && !contextValue.virtualTagMode) {
                contextValue.enableVirtualTagMode(potentialVirtualTag.subtags);
            }
        }
        else if (contextValue.virtualTagMode) {
            contextValue.disableVirtualTagMode();
        }
    }

    const handleInputClick = () => {
        const inputElement = contextValue.inputRef.current;

        inputElement.setSelectionRange(-1, -1);
        inputElement.scrollLeft = inputElement.scrollWidth;

        contextValue.enableDisplay();
    };

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.tagCategory === TagCategory.VIRTUAL) {
            activateSubtags(suggestion);
        }
        else if (suggestion.tagCategory === TagCategory.NORMAL) {
            addSuggestion(suggestion);
        }
    };

    const activateSubtags = (suggestion) => {
        const newInput = `${leftQuery} ${queryService.normalVirtualTagToInputVirtualTag(suggestion.name)}`.trimStart();
        
        handleQueryChange({ target: { value: newInput } });
        contextValue.enableVirtualTagMode(suggestion.subtags);
    };

    const addSuggestion = (suggestion) => {
        const newInput = `${leftQuery} ${queryService.normalTagToInputTag(suggestion.name)} `.trimStart();

        handleQueryChange({ target: { value: newInput } });
        contextValue.disableDisplay();
        contextValue.disableVirtualTagMode();
    };

    const getSuggestions = () => {
        const sortingFunction = (a, b) => {
            let aScore = 0;
            let bScore = 0;

            if (a.name.startsWith(rightQuery)) {
                aScore += 4;
            }
            if (b.name.startsWith(rightQuery)) {
                bScore += 4;
            }

            if (a.name.length < b.name.length) {
                aScore += 1;
            }
            else if (b.name.length < a.name.length) {
                bScore += 1;
            }

            if (a.count > b.count) {
                aScore += 2;
            }
            else if (b.count > a.count) {
                bScore += 2;
            }

            return bScore - aScore;
        };

        const suggestions = contextValue.virtualTagMode
            ? contextValue.subtagList
            : existingTags;

        return suggestions
            .filter(e => rightQuery && (e.name.toLowerCase().includes(rightQuery) || e.name.toLowerCase().includes(rightQuery.replaceAll('_', ' '))))
            .sort(sortingFunction)
            .slice(0, 10);
    };

    const renderSuggestions = (suggestions) => {
        const suggestionTextColor = (sug) => {
            let color;

            if (sug.tagType === TagType.LOWLEVEL.value) {
                color = TagType.LOWLEVEL.color;
            }
            else if (sug.tagType === TagType.GENERAL.value) {
                color = TagType.GENERAL.color;
            }
            else if (sug.tagType === TagType.META.value) {
                color = TagType.META.color;
            }
            else if (sug.tagType === TagType.HIGHLEVEL.value) {
                color = TagType.HIGHLEVEL.color;
            }
            else if (sug.tagType === TagType.VIRTUAL.value) {
                color = TagType.VIRTUAL.color;
            }

            return {
                color: color
            };
        };

        const tagNameFormatter = (tagName) => tagName.includes(':') ? tagName.split(':')[1] : tagName;

        const tagCountFormatter = (tagCount) => {
            const abbrevs = 'kMBTq';

            if (isNaN(tagCount)) {
                return '';
            }

            if (tagCount < 1e3) {
                return tagCount;
            }
            
            let i = 0;
            let low = 1e3;
            let high = 1e6;
            while (i < abbrevs.length) {
                if (!(low <= tagCount && tagCount < high)) {
                    low *= 1e3;
                    high *= 1e3;
                    i++;

                    continue;
                }

                // [1.0x, 10x)
                if (tagCount < low * 1e1) {
                    const hundreds = Math.floor(tagCount / (low / 1e1));
                    
                    return `${hundreds === 10 ? '1.0' : hundreds / 10}${abbrevs[i]}`;
                }
                
                // [10x, 1000x)
                else {
                    const thousands = Math.floor(tagCount / low);

                    return `${thousands}${abbrevs[i]}`;
                }
            }

            return `999${abbrevs[abbrevs.length - 1]}+`;
        };

        return (
            <div className={styles.fixedContainer}>
                { suggestions.map((e, i) => (
                    <div key={i} onClick={() => handleSuggestionClick(e)} className={styles.suggestionBox}>
                        <div style={suggestionTextColor(e)} className={styles.suggestion} title={e.name}>{tagNameFormatter(e.name)}</div>
                        <div className={styles.counter}>{tagCountFormatter(e.count)}</div>
                    </div>
                ))}
            </div>
        );
    };

    const suggestedTags = getSuggestions();

    return (
        <div className={styles.container} ref={contextValue.wrapperRef}>
            <input
                ref={contextValue.inputRef}
                value={query}
                onChange={handleQueryChange}
                className={styles.input}
                onClick={handleInputClick}
                placeholder='enter query...'
            />
            { contextValue.display && suggestedTags.length > 0 && (
                <div className={styles.suggestionsOuterContainer}>
                    <div className={styles.suggestionsInnerContainer}>
                        { renderSuggestions(suggestedTags) }
                    </div>
                </div>
            )}
        </div>
    );
};

export default AutocompleteQuery;

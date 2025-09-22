import requestService from './requestService';
import queryService from './queryService';
import notificationService from './notificationService';
import AppState from '../enums/AppState';
import ViewEncrypted from '../enums/ViewEncrypted';

const appStateService = (setters, history, multiselectImages, notifications) => {
    const {
        setQuery,
        setImagesCounter,
        setImagesToShow,
        setAppState,
        setViewEncrypted,
        setUsedQuery,
        setCurrentPage,
        setMaxPage,
        setExistingTags,
        setSavedQueries,
        setHistory,
        setMultiselectImages,
        setConfig,
        setShowOriginal,
        setNotifications
    } = setters;

    const fetchSavedDataEffect = () => {
        requestService
            .getTags(ViewEncrypted.NO)
            .then(tags => setExistingTags(tags));
        
        requestService
            .getSavedQueries()
            .then(queries => setSavedQueries(queries));
        
        requestService
            .getConfig()
            .then(config => setConfig(config));
    };

    const searchCommand = (q, viewEncrypted) => {
        const cmd = () => (
            (query) => {
                const urlFormattedQuery = queryService.inputQueryToUrlQuery(query);

                requestService
                    .getImagesStats(urlFormattedQuery, viewEncrypted)
                    .then(stats => {
                        setImagesCounter(stats.imagesCount);
                        setMaxPage(Math.max(1, stats.pagesCount));
                    });

                requestService
                    .getImages(urlFormattedQuery, 1, viewEncrypted)
                    .then(images => {
                        setImagesToShow(images);
                        setAppState(AppState.BROWSING);
                    });

                setUsedQuery(query);
                setQuery('');
                setCurrentPage(1);
            }
        )(q);

        cmd();
        setHistory([...history, cmd]);
    };

    const previewCommand = (i) => {
        const cmd = () => (
            (img) => {
                setImagesToShow([img]);
                setAppState(AppState.PREVIEW);
                setShowOriginal(false);
            }
        )(i);

        cmd();
        setHistory([...history, cmd]);
    };

    const queryChangeCommand = (e) => {
        setQuery(e.target.value);
    };

    const clickTagCommand = (t, viewEncrypted) => {
        const cmd = () => (
            (tag) => {
                const inputTag = queryService.normalTagToInputTag(tag);
                const urlFormattedQuery = queryService.inputQueryToUrlQuery(inputTag);

                requestService
                    .getImagesStats(urlFormattedQuery, viewEncrypted)
                    .then(stats => {
                        setImagesCounter(stats.imagesCount);
                        setMaxPage(Math.max(1, stats.pagesCount));
                    });

                requestService
                    .getImages(urlFormattedQuery, 1, viewEncrypted)
                    .then(images => {
                        setImagesToShow(images);
                        setAppState(AppState.BROWSING);
                    });
                
                setUsedQuery(inputTag);
                setQuery('');
                setCurrentPage(1);
            }
        )(t);

        cmd();
        setHistory([...history, cmd]);
    };

    const clickBackCommand = () => {
        if (history.length > 1) {
            history.at(-2)();
            setHistory(history.slice(0, -1));
        }
    };

    const pageNavCommand = (usedQuery, newPage, viewEncrypted) => {
        const cmd = () => (
            (query, newPageNum) => {
                const urlFormattedQuery = queryService.inputQueryToUrlQuery(query);

                requestService
                    .getImages(urlFormattedQuery, newPageNum, viewEncrypted)
                    .then(images => {
                        setImagesToShow(images);
                        setAppState(AppState.BROWSING);
                    });
                
                requestService
                    .getImagesStats(urlFormattedQuery, viewEncrypted)
                    .then(stats => {
                        setImagesCounter(stats.imagesCount);
                        setMaxPage(Math.max(1, stats.pagesCount));
                    });
                
                setUsedQuery(query);
                setQuery('');
                setCurrentPage(newPageNum);
            }
        )(usedQuery, newPage);

        cmd();
        setHistory([...history, cmd]);
    };

    const modifyImageCommand = (id, modifications, viewEncrypted) => {
        requestService
            .modifyImage(id, modifications)
            .then(modifiedImage => {
                setImagesToShow([modifiedImage]);

                requestService
                    .getTags(viewEncrypted)
                    .then(tags => setExistingTags(tags));
            });
    };

    const clickSavedQueryCommand = (q, viewEncrypted) => {
        const cmd = () => (
            (query) => {
                const urlFormattedQuery = queryService.inputQueryToUrlQuery(query);

                requestService
                    .getImagesStats(urlFormattedQuery, viewEncrypted)
                    .then(stats => {
                        setImagesCounter(stats.imagesCount);
                        setMaxPage(Math.max(1, stats.pagesCount));
                    });

                requestService
                    .getImages(urlFormattedQuery, 1, viewEncrypted)
                    .then(images => {
                        setImagesToShow(images);
                        setAppState(AppState.BROWSING);
                    });

                setUsedQuery(query);
                setQuery('');
                setCurrentPage(1);
            }
        )(q);

        cmd();
        setHistory([...history, cmd]);
    };

    const modifySavedQueryCommand = (id, modifications, savedQueries) => {
        requestService
            .modifySavedQuery(id, modifications)
            .then(modifiedSavedQuery => {
                const newSavedQueries = [...savedQueries];
                
                const idx = newSavedQueries.findIndex((e) => e.id === id);
                newSavedQueries[idx] = modifiedSavedQuery;
                
                setSavedQueries(newSavedQueries);
            });
    };

    const deleteSavedQueryCommand = (id, savedQueries) => {
        requestService
            .deleteSavedQuery(id)
            .then((_) => {
                const newSavedQueries = [...savedQueries];

                const idx = newSavedQueries.findIndex((e) => e.id === id);
                newSavedQueries.splice(idx, 1);

                setSavedQueries(newSavedQueries);
            });
    };

    const addSavedQueryCommand = (newSavedQuery, savedQueries) => {
        requestService
            .createSavedQuery(newSavedQuery)
            .then((createdSavedQuery) => setSavedQueries([...savedQueries, createdSavedQuery]));
    };

    const syncDatabase = (viewEncrypted) => {
        requestService
            .syncDatabase()
            .then((syncDatabaseResult) => {
                const { deletedCounter, restoredPreviewsCounter, restoredSamplesCounter, addCounter } = syncDatabaseResult;

                if ([ deletedCounter, restoredPreviewsCounter, restoredSamplesCounter, addCounter ].every((c) => c === 0)) {
                    setNotifications([...notifications, notificationService.noChangesNotification()]);
                }
                else {
                    deletedCounter > 0 &&
                        setNotifications([...notifications, notificationService.deletedNotification(deletedCounter)]);
                    restoredPreviewsCounter > 0 &&
                        setNotifications([...notifications, notificationService.restoredPreviewsNotification(restoredPreviewsCounter)]);
                    restoredSamplesCounter > 0 &&
                        setNotifications([...notifications, notificationService.restoredSamplesNotification(restoredSamplesCounter)]);
                    addCounter > 0 &&
                        setNotifications([...notifications, notificationService.addedNotification(addCounter)]);
                }

                requestService
                    .getTags(viewEncrypted)
                    .then(tags => setExistingTags(tags));
            });
    };

    const startDuplicatesScannerCommand = () => {
        const cmd = () => (
            () => {
                setAppState(AppState.DUPLICATES_SCANNER);
                setUsedQuery('');
                setQuery('');
                setCurrentPage(1);
                setMaxPage(1);
                setImagesToShow([]);
            }
        )();

        cmd();
        setHistory([...history, cmd]);
    };

    const startBatchTagEditorCommand = (viewEncrypted) => {
        const urlFormattedQuery = queryService.inputQueryToUrlQuery('');

        requestService
            .getImagesStats(urlFormattedQuery, viewEncrypted)
            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

        requestService
            .getImages(urlFormattedQuery, 1, viewEncrypted)
            .then(images => {
                setImagesToShow(images);
                setAppState(AppState.BATCH_TAG_EDITOR);
            });

        setUsedQuery('');
        setQuery('');
        setCurrentPage(1);
    };

    const clickPreviewInMultiselectCommand = (img) => {
        const alreadyAdded = multiselectImages.some((i) => i.id === img.id);

        if (alreadyAdded) {
            setMultiselectImages(multiselectImages.filter((v, _) => v.id !== img.id));
        }
        else {
            setMultiselectImages([...multiselectImages, img]);
        }
    };

    const searchInMultiselectCommand = (q, viewEncrypted) => {
        const urlFormattedQuery = queryService.inputQueryToUrlQuery(q);

        requestService
            .getImagesStats(urlFormattedQuery, viewEncrypted)
            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

        requestService
            .getImages(urlFormattedQuery, 1, viewEncrypted)
            .then(images => setImagesToShow(images));

        setUsedQuery(q);
        setQuery('');
        setCurrentPage(1);
    };

    const cancelMultiselectCommand = () => {
        setAppState(AppState.START);
        setMultiselectImages([]);
    };

    const startSettingsCommand = () => {
        const cmd = () => (
            () => {
                setAppState(AppState.SETTINGS);
                setUsedQuery('');
                setQuery('');
                setCurrentPage(1);
                setMaxPage(1);
                setImagesToShow([]);
            }
        )();

        cmd();
        setHistory([...history, cmd]);
    };

    const saveSettingsCommand = (modifications) => {
        requestService
            .modifyConfig(modifications)
            .then(modifiedConfig => setConfig(modifiedConfig));

        setAppState(AppState.START);
    };

    const startEncryptorCommand = (viewEncrypted) => {
        const urlFormattedQuery = queryService.inputQueryToUrlQuery('');

        requestService
            .getImagesStats(urlFormattedQuery, viewEncrypted)
            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

        requestService
            .getImages(urlFormattedQuery, 1, viewEncrypted)
            .then(images => {
                setImagesToShow(images);
                setAppState(AppState.ENCRYPTOR);
            });

        setUsedQuery('');
        setQuery('');
        setCurrentPage(1);
    };

    const startScanningCommand = (baseDir, scanDir, outDir, viewEncrypted) => {
        const scanRequest = { baseDir, scanDir, outDir };

        requestService
            .scanForDuplicates(scanRequest, viewEncrypted)
            .then((scanResult) => {
                const { reportFile } = scanResult;

                setNotifications([...notifications, notificationService.scanReportNotification(reportFile)]);
            });

        setAppState(AppState.START);
    };

    const clickEncryptCommand = (viewEncrypted) => {
        const imagesToEncrypt = {ids: multiselectImages.map((v) => v.id)};

        requestService
            .toggleEncryptImages(imagesToEncrypt)
            .then((_) => {
                requestService
                    .getTags(viewEncrypted)
                    .then(tags => setExistingTags(tags));
            });

        setAppState(AppState.START);
        setMultiselectImages([]);
    };

    const clickViewEncrypted = (viewEncrypted) => {
        const setCorrectView = (newView) => {
            setViewEncrypted(newView);

            requestService
                .getTags(newView)
                .then(tags => setExistingTags(tags));
        };

        if (viewEncrypted === ViewEncrypted.NO) {
            requestService
                .authenticate()
                .then((result) => {
                    const { success } = result;

                    if (success) {
                        setCorrectView(ViewEncrypted.YES);
                    }
                });
        }
        else {
            setCorrectView(ViewEncrypted.NO);
        }
    };

    const clickTitleCommand = () => {
        const cmd = () => (
            () => {
                setAppState(AppState.START);
                setUsedQuery('');
                setQuery('');
                setCurrentPage(1);
                setMaxPage(1);
                setImagesToShow([]);
            }
        )();

        cmd();
        setHistory([...history, cmd]);
    };

    const clickSavedQueryInMultiselectCommand = (q, viewEncrypted) => {
        const urlFormattedQuery = queryService.inputQueryToUrlQuery(q);

        requestService
            .getImagesStats(urlFormattedQuery, viewEncrypted)
            .then(stats => setMaxPage(Math.max(1, stats.pagesCount)));

        requestService
            .getImages(urlFormattedQuery, 1, viewEncrypted)
            .then(images => setImagesToShow(images));

        setUsedQuery(q);
        setQuery('');
        setCurrentPage(1);
    };

    const modifyImageInBatchTagEditorCommand = (modifications, viewEncrypted) => {
        const batchModifications = {...modifications, ids: multiselectImages.map((v) => v.id)};

        requestService
            .modifyImageBatch(batchModifications)
            .then((_) => {
                requestService
                    .getTags(viewEncrypted)
                    .then(tags => setExistingTags(tags));
            });

        setAppState(AppState.START);
        setMultiselectImages([]);
    };

    const pageNavInMultiselectCommand = (usedQuery, newPageNum, viewEncrypted) => {
        const urlFormattedQuery = queryService.inputQueryToUrlQuery(usedQuery);

        requestService
            .getImages(urlFormattedQuery, newPageNum, viewEncrypted)
            .then(images => setImagesToShow(images));

        setUsedQuery(usedQuery);
        setQuery('');
        setCurrentPage(newPageNum);
    };

    const clickSaveImageCommand = (id, dir, filename) => {
        const body = {
            dir: dir,
            filename: filename
        };

        requestService
            .saveImage(id, body)
            .then((saveImageResult) => {
                const { filename } = saveImageResult;

                setNotifications([...notifications, notificationService.downloadedImageNotification(filename)]);
            });
    };

    const toggleShowOriginal = (showOriginal) => {
        setShowOriginal(!showOriginal);
    };

    const clickNotificationCommand = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    return {
        fetchSavedDataEffect,
        searchCommand,
        previewCommand,
        queryChangeCommand,
        clickTagCommand,
        clickBackCommand,
        pageNavCommand,
        modifyImageCommand,
        clickSavedQueryCommand,
        modifySavedQueryCommand,
        deleteSavedQueryCommand,
        addSavedQueryCommand,
        syncDatabase,
        startDuplicatesScannerCommand,
        startBatchTagEditorCommand,
        clickPreviewInMultiselectCommand,
        searchInMultiselectCommand,
        cancelMultiselectCommand,
        startSettingsCommand,
        saveSettingsCommand,
        startEncryptorCommand,
        startScanningCommand,
        clickEncryptCommand,
        clickViewEncrypted,
        clickTitleCommand,
        clickSavedQueryInMultiselectCommand,
        modifyImageInBatchTagEditorCommand,
        pageNavInMultiselectCommand,
        clickSaveImageCommand,
        toggleShowOriginal,
        clickNotificationCommand
    };
};

export default appStateService;

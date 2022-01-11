import React, {useContext, useMemo, useEffect} from 'react';
import {nanoid} from "nanoid";
import openApp from '../openApp';
import DependencyContext from "../DependencyContext";

import type {DisplayApp, DependencyContext as DependencyContextType} from "../types";

import styles from './SearchEmbeddedApp.scss';

type Props = {
    app: DisplayApp;
    closeSearch: () => void;
}

const openInContentArea = (app: DisplayApp, closeSearch: () => void, context: DependencyContextType) => {
    openApp(app, context).then(() => {
        closeSearch();
    });
}

export default ({app, closeSearch}: Props) => {
    const context = useContext(DependencyContext);
    const randomHostId = useMemo(() => nanoid(8), []);
    useEffect(() => {
        let unloaded = false;
        let appId: string | undefined;
        setTimeout(() => {
            const host = document.getElementById(randomHostId);
            if (!host) {
                return;
            }
            host.innerHTML = '';
            context.portalAppService.loadApp(randomHostId, app.name, undefined).then((app) => {
                appId = app.id;
                if (unloaded) {
                    context.portalAppService.unloadApp(appId);
                }
            });
        }, 100);
        return () => {
            if (appId) {
                context.portalAppService.unloadApp(appId);
                unloaded = true;
            }
        };
    }, []);

    return (
        <div className={styles.SearchEmbeddedApp}>
            <div className={styles.ChipWrapper}>
                <div className={styles.Chip}>
                    App
                </div>
            </div>
            <div className={styles.Details}>
                <div className={styles.AppWrapper} id={randomHostId}>
                    <div className="mashroom-portal-app-loading">
                        <span />
                    </div>
                </div>
                <div className={styles.Actions}>
                    <button className={styles.OpenAppButton} onClick={() => openInContentArea(app, closeSearch, context)}>
                        <span>Open in Content Area</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

import React, {useContext, useMemo} from 'react';
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

    return (
        <div className={styles.SearchEmbeddedApp}>
            <div className={styles.ChipWrapper}>
                <div className={styles.Chip}>
                    App
                </div>
            </div>
            <div className={styles.Details}>
                <div className={styles.AppWrapper} id={randomHostId}>
                    TODO: open {app.name}
                </div>
                <div className={styles.Actions}>
                    <button className={styles.OpenAppButton} onClick={() => openInContentArea(app, closeSearch, context)}>
                        Open in Content Area
                    </button>
                </div>
            </div>
        </div>
    );
}

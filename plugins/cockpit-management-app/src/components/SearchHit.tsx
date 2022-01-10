import React, {useContext} from 'react';
import DependencyContext from "../DependencyContext";
import openApp from '../openApp';

import type {ReactNode} from 'react';
import type {DisplayApp, DisplayApps, DependencyContext as DependencyContextType} from "../types";

import styles from './SearchHit.scss';

type Props = {
    type: string;
    header: ReactNode;
    subHeader: ReactNode;
    apps: DisplayApps;
    closeSearch: () => void;
}

export const openAppInContentArea = (app: DisplayApp, closeSearch: () => void, context: DependencyContextType) => {
    openApp(app, context).then(() => {
       closeSearch();
    });
}

export default ({type, header, subHeader, apps, closeSearch}: Props) => {
    const context = useContext(DependencyContext);
    return (
        <div className={styles.SearchHit}>
            <div className={styles.ChipWrapper}>
                <div className={styles.Chip}>
                    {type}
                </div>
            </div>
            <div className={styles.Details}>
                <div className={styles.Header}>
                    {header}
                </div>
                <div className={styles.SubHeader}>
                    {subHeader}
                </div>
                <div className={styles.Actions}>
                    {apps.map((app) => (
                        <button className={styles.OpenAppButton} onClick={() => openAppInContentArea(app, closeSearch, context)}>
                            <span>{app.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

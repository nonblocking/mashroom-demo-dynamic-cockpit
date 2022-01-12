
import React, {useState, useEffect} from 'react';
import DependencyContext from '../DependencyContext';
import SearchPanel from './SearchPanel';
import {subscribeToOpenAppMessage, unsubscribeToOpenAppMessage} from '../messages';

import type {MashroomPortalMessageBus, MashroomPortalAppService} from "@mashroom/mashroom-portal/type-definitions";

import styles from './App.scss';

type Props = {
    backendApiBasePath: string;
    locale: string;
    messageBus: MashroomPortalMessageBus;
    portalAppService: MashroomPortalAppService;
    openAppsInArea: string;
}

export default ({backendApiBasePath, locale, messageBus, portalAppService, openAppsInArea}: Props) => {
    const dependencyContext = {
        backendApiBasePath,
        locale,
        messageBus,
        portalAppService,
        openAppsInArea
    }

    const [panelOpen, setPanelOpen] = useState(false);
    useEffect(() => {
        subscribeToOpenAppMessage(messageBus, dependencyContext);
        return () => unsubscribeToOpenAppMessage(messageBus);
    }, []);

    return (
        <DependencyContext.Provider value={dependencyContext}>
            <div className={styles.App}>
                <div className={`${styles.SearchBar} ${panelOpen ? styles.PanelOpen : ''}`}>
                    <input type="search" placeholder="Search customers, products, apps, ..." onFocus={() => setPanelOpen(true)} />
                </div>
                <SearchPanel
                    open={panelOpen}
                    onClose={() => setPanelOpen(false)}
                />
            </div>
        </DependencyContext.Provider>
    );
}

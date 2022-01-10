
import React from 'react';

import type {MashroomPortalMessageBus, MashroomPortalAppService} from "@mashroom/mashroom-portal/type-definitions";

import styles from './App.scss';

type Props = {
    backendApiBasePath: string;
    messageBus: MashroomPortalMessageBus;
    portalAppService: MashroomPortalAppService;
}

export default ({backendApiBasePath, messageBus, portalAppService}: Props) => {
    return (
        <div className={styles.App}>
            <div className={styles.SearchBar}>
                <input type="search" placeholder="Search customers, products, apps, ..." />
            </div>
        </div>
    );
}

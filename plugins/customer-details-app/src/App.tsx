
import React from 'react';

import styles from './App.scss';

type Props = {
    customerId: string;
    backendApiBasePath: string;
}

export default ({customerId, backendApiBasePath}: Props) => {
    return (
        <div className={styles.App}>
            TODO
        </div>
    );
}

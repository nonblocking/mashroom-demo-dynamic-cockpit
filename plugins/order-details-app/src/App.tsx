
import React from 'react';

import styles from './App.scss';

type Props = {
    orderId: string;
    backendApiBasePath: string;
}

export default ({orderId, backendApiBasePath}: Props) => {
    return (
        <div className={styles.App}>
            TODO
        </div>
    );
}

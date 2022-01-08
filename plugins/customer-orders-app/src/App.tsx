
import React from 'react';

import styles from './App.scss';

type Props = {
    productId: string;
    backendApiBasePath: string;
}

export default ({productId}: Props) => {
    return (
        <div className={styles.App}>
            TODO
        </div>
    );
}

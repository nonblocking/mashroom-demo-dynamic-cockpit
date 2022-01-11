import type {DependencyContext, DisplayApp} from "./types";

const DROP_ZONE_CLASS = 'demo-cockpit-app-drop-zone';

const createDropZone = (idx: number, appAreaId: string, context: DependencyContext) => {
    const dropZone = document.createElement('div');
    dropZone.className = DROP_ZONE_CLASS;
    dropZone.ondragover = (evt) => {
        evt.preventDefault();
        dropZone.classList.add('drag-over');
    };
    dropZone.ondragleave = () => {
        dropZone.classList.remove('drag-end');
    };
    dropZone.ondrop = (evt) => {
        evt.preventDefault();
        const appId = evt.dataTransfer?.getData('portal-app-id');
        if (appId) {
            hideDropZones();
            context.portalAppService.moveApp(appId, appAreaId, idx);
        }
    };
    return dropZone;
};

const showDropZones = (context: DependencyContext) => {
    const ownAppAreaId = context.portalAppService.loadedPortalApps
        .find((app) => app.pluginName === 'Mashroom Dynamic Cockpit Demo Cockpit Management App')
        ?.portalAppAreaId || '????';
    const appAreas = document.querySelectorAll('.mashroom-portal-app-area');
    const appAreaIds: Array<string> = [];
    appAreas.forEach((el) => {
        if (el.id !== ownAppAreaId) {
            appAreaIds.push(el.id);
        }
    });

    appAreaIds.forEach((appAreaId) => {
        const appAreaEl = document.getElementById(appAreaId)!;
        const children = [...appAreaEl.children] || [];
        for (let i = 0; i < children.length; i++) {
            const dropZone = createDropZone(i,appAreaId, context);
            console.info('INSERTING', dropZone, 'BEFORE', children[i]);
            appAreaEl.insertBefore(dropZone, children[i]);
        }
        const dropZone = createDropZone(children.length, appAreaId, context);
        appAreaEl.append(dropZone);
    });
};

const hideDropZones = () => {
    document.querySelectorAll('.' + DROP_ZONE_CLASS).forEach((node) => {
       node.parentElement?.removeChild(node);
    });
};

export default (app: DisplayApp, context: DependencyContext): Promise<string> => {
    const {openAppsInArea, portalAppService} = context;

    return portalAppService.loadApp(openAppsInArea,app.name, undefined, 0, {
       ...app.config,
    }).then((loadedApp) => {
        const appId = loadedApp.id;

        // Force show header
        loadedApp.portalAppWrapperElement.classList.add('show-header');

        const moveButton = document.createElement('div');
        moveButton.className = 'demo-cockpit-app-header-move';
        moveButton.onmousedown = () => {
            loadedApp.portalAppWrapperElement.draggable = true;
        };
        moveButton.onmouseup = () => {
            loadedApp.portalAppWrapperElement.draggable = false;
        };
        loadedApp.portalAppWrapperElement.ondragstart = (evt) => {
            evt.dataTransfer?.setData('portal-app-id', appId);
            setTimeout(() => {
                showDropZones(context);
            }, 100);
        };
        loadedApp.portalAppWrapperElement.ondragend = () => {
            hideDropZones();
            loadedApp.portalAppWrapperElement.draggable = false;
        };

        const closeButton = document.createElement('div');
        closeButton.className = 'mashroom-portal-app-header-close';
        closeButton.onclick = () => {
            portalAppService.unloadApp(appId);
        };

        loadedApp.portalAppTitleElement?.parentElement?.appendChild(moveButton);
        loadedApp.portalAppTitleElement?.parentElement?.appendChild(closeButton);

        // highlight the newly opened app for a few seconds
        loadedApp.portalAppWrapperElement.classList.add('demo-cockpit-new-app');
        setTimeout(() => {
            loadedApp.portalAppWrapperElement.classList.remove('demo-cockpit-new-app');
        }, 1000);

        return appId;
    })
}

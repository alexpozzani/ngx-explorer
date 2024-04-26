import { InjectionToken, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Data, NgeExplorerConfig, View } from './types';
import { IconsComponent, ListComponent } from '../../public-api';

export const DEFAULT_CONFIG: Partial<NgeExplorerConfig> = {
    homeNodeName: 'Files',
    multipleSelection: true,
    features: {
        delete: true,
        upload: true,
        download: true,
        rename: true,
        createDir: true,
    },
};

export const VIEWS = new InjectionToken<View[]>('NXE_VIEWS', {
    providedIn: 'root',
    factory: () => [
        {
            name: 'Icons',
            icon: 'nxe-th-large',
            component: IconsComponent,
        },
        {
            name: 'List',
            icon: 'nxe-menu',
            component: ListComponent,
        },
    ],
});

export const CONFIG = new InjectionToken<NgeExplorerConfig>('NXE_CONFIG', {
    providedIn: 'root',
    factory: () => {
        const views = inject(VIEWS);
        const defaultView = views[0].name;
        return { ...DEFAULT_CONFIG, defaultView } as NgeExplorerConfig;
    },
});

export const CURRENT_VIEW = new InjectionToken<BehaviorSubject<string>>('NXE_CURRENT_VIEW', {
    providedIn: 'root',
    factory: () => {
        const config = inject(CONFIG);
        const views = inject(VIEWS);
        const defaultView = config.defaultView || views[0].name;
        return new BehaviorSubject<string>(defaultView);
    },
});

export const NAME_FUNCTION = new InjectionToken<(data: Data) => string>('NXE_NAME_FUNCTION', {
    providedIn: 'root',
    factory: () => (data: Data) => data as unknown as string,
});

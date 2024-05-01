import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CONFIG, DataService, NgeExplorerConfig } from 'ngx-explorer';
import { ExampleDataService } from './app/data.service';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        { provide: DataService, useClass: ExampleDataService },
        {
            provide: CONFIG,
            useValue: {
                homeNodeName: 'Home',
                defaultView: 'Icons',
                multipleSelection: false,
                features: {
                    delete: false,
                    upload: false,
                    download: false,
                    rename: false,
                    createDir: false,
                },
            } as NgeExplorerConfig,
        },
    ],
});

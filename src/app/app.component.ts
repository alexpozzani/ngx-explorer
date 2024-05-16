import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContentComponent, ExplorerComponent, ExplorerService, TreeComponent } from 'ngx-explorer';
import { map } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [ExplorerComponent, ContentComponent, TreeComponent, AsyncPipe],
})
export class AppComponent {
    private explorerService = inject(ExplorerService);
    protected openedDir$ = this.explorerService.openedDir$.pipe(map((p) => p?.data['name']));
    protected selectionLength$ = this.explorerService.selection$.pipe(map((s) => s.length));
    protected rootLen$ = this.explorerService.root$.pipe(map((r) => r.children.length));

    title = 'explorer-app';

    constructor() {
        this.explorerService.openTree({ id: 15, name: 'Aerosmith', path: '/Music/Rock/' });
    }
}

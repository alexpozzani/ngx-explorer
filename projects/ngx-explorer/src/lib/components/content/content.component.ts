import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VIEWS } from '../../shared/providers';
import { ExplorerService } from '../../services/explorer.service';
import { map } from 'rxjs';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { TreeComponent } from '../tree/tree.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'nxe-content',
    standalone: true,
    imports: [AsyncPipe, NgComponentOutlet, MenuBarComponent, BreadcrumbsComponent],
    templateUrl: './content.component.html',
    styleUrl: './content.component.scss'
})
export class ContentComponent {
    protected explorerService = inject(ExplorerService);
    protected views = inject(VIEWS);
    public viewComponent$ = this.explorerService.currentView$.pipe(map((view) => this.views.find((v) => v.name === view)!.component));
}

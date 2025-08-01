import { Component, inject, HostListener } from '@angular/core';
import { TreeComponent } from '../tree/tree.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { VIEWS } from '../../shared/providers';
import { ExplorerService } from '../../services/explorer.service';
import { map } from 'rxjs';

@Component({
    selector: 'nxe-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss'],
    standalone: true,
    imports: [TreeComponent, MenuBarComponent, BreadcrumbsComponent, AsyncPipe, NgComponentOutlet]
})
export class ExplorerComponent {
    isTreeHidden = window.innerWidth <= 768;
    protected explorerService = inject(ExplorerService);
    protected views = inject(VIEWS);
    public viewComponent$ = this.explorerService.currentView$.pipe(map((view) => this.views.find((v) => v.name === view)!.component));

    @HostListener('window:resize')
    onResize() {
        if (window.innerWidth <= 768) {
            this.isTreeHidden = true;
        } else {
            this.isTreeHidden = false;
        }
    }

    showTree() {
        this.isTreeHidden = false;
    }

    hideTree() {
        this.isTreeHidden = true;
    }

    toggleTree() {
        this.isTreeHidden = !this.isTreeHidden;
    }
}

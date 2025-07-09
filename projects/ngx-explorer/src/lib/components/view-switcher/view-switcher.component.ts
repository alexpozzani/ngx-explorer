import { Component, ViewEncapsulation, inject } from '@angular/core';
import { VIEWS } from '../../shared/providers';
import { ExplorerService } from '../../services/explorer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'nxe-view-switcher',
    templateUrl: './view-switcher.component.html',
    styleUrls: ['./view-switcher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule]
})
export class ViewSwitcherComponent {
    private explorerService = inject(ExplorerService);
    protected views = inject(VIEWS);

    setView(view: string) {
        this.explorerService.currentView$.next(view);
    }
}

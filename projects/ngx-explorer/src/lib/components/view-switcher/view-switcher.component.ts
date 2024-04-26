import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CURRENT_VIEW, VIEWS } from '../../shared/providers';

@Component({
    selector: 'nxe-view-switcher',
    templateUrl: './view-switcher.component.html',
    styleUrls: ['./view-switcher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
})
export class ViewSwitcherComponent {
    private currentView = inject(CURRENT_VIEW);
    protected views = inject(VIEWS);

    setView(view: string) {
        this.currentView.next(view);
    }
}

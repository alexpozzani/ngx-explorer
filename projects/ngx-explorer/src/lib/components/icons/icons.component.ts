import { Component, ViewEncapsulation } from '@angular/core';
import { BaseView } from '../base-view/base-view.directive';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { NgClass } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'nxe-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DragDropDirective, NgClass, MatIconModule]
})
export class IconsComponent extends BaseView {

    constructor() {
        super();
    }
}

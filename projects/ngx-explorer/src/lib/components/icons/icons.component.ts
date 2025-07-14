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
    public readonly icons = {
        node: 'folder',
        leaf: 'insert_drive_file',
        movie: 'movie',
        image: 'image',
        pdf: 'picture_as_pdf',
        archive: 'archive',
        text: 'description',
    };

    getFileIcon(item: any): string {
        if (!item.isLeaf) return this.icons.node;
        const ext = (item.name.split('.').pop() || '').toLowerCase();
        if (['mp4', 'avi', 'mov', 'mkv', 'wmv'].includes(ext)) return this.icons.movie;
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext)) return this.icons.image;
        if (['pdf'].includes(ext)) return this.icons.pdf;
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return this.icons.archive;
        if (['txt', 'md', 'json', 'xml', 'csv', 'log'].includes(ext)) return this.icons.text;
        return this.icons.leaf;
    }

    constructor() {
        super();
    }
}

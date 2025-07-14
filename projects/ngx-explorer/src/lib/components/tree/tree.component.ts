import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { ExplorerService } from '../../services/explorer.service';
import { map } from 'rxjs/operators';
import { INode } from '../../shared/types';
import { AsyncPipe, JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CONFIG } from '../../shared/providers';

@Component({
    selector: 'nxe-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet, NgClass, AsyncPipe, JsonPipe, MatIconModule]
})
export class TreeComponent {
    private explorerService = inject(ExplorerService);
    private config = inject(CONFIG);
    protected treeNodes: INode[] = [];
    protected showRootNode = this.config.showRootNode !== false;
    protected tree$ = this.explorerService.root$.pipe(map((r) => this.showRootNode ? [r] : r.children));
    protected selectedId$ = this.explorerService.openedDir$.pipe(map((p) => p?.id));

    open(node: INode) {
        this.explorerService.openNode(node.id);
    }

    expand(event: Event, node: INode) {
        event.preventDefault();
        event.stopPropagation();
        this.explorerService.expand(node.id);
    }

    collapse(event: Event, node: INode) {
        event.preventDefault();
        event.stopPropagation();
        this.explorerService.collapse(node.id);
    }
}

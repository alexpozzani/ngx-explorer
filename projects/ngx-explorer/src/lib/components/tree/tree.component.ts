import { Component, OnDestroy, ViewEncapsulation, inject } from '@angular/core';
import { ExplorerService } from '../../services/explorer.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { INode } from '../../shared/types';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'nxe-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgTemplateOutlet, NgClass],
})
export class TreeComponent implements OnDestroy {
    private explorerService = inject(ExplorerService);
    protected treeNodes: INode[] = [];
    protected selectedId = -1;
    private sub = new Subscription();

    constructor() {
        this.sub.add(
            this.explorerService.root$.pipe(filter((x) => !!x)).subscribe((root) => {
                this.treeNodes = this.buildTree(root).children;
            })
        );

        this.sub.add(
            this.explorerService.openedDir$.pipe(filter((x) => !!x)).subscribe((node) => {
                this.selectedId = node!.id;
            })
        );
    }

    open(node: INode) {
        this.selectedId = node.id;
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

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private buildTree(node: INode): INode {
        const { id, name, parentId, data, isLeaf, children, expanded } = node;
        const treeNode = {
            id,
            name,
            parentId,
            data,
            isLeaf,
            expanded,
        } as INode;

        if (node.expanded) {
            treeNode.children = children.filter((x) => !x.isLeaf).map((x) => this.buildTree(x));
        }

        return treeNode;
    }
}

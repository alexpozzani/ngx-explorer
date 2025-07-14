import { Directive, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { INode, NgeExplorerConfig } from '../../shared/types';
import { CONFIG } from '../../shared/providers';
import { ExplorerService } from '../../services/explorer.service';

@Directive()
export class BaseView implements OnDestroy {
    public readonly icons = {
        node: 'folder',
        leaf: 'insert_drive_file',
        movie: 'movie',
        image: 'image',
        pdf: 'picture_as_pdf',
        archive: 'archive',
        text: 'description',
        music: 'music_note'
    };

    protected selection = new Set<number>();
    protected items: INode[] = [];
    protected dragging = false;
    protected subs = new Subscription();
    protected shiftSelectionStartId: number | undefined;

    protected explorerService: ExplorerService = inject(ExplorerService);
    protected config: NgeExplorerConfig = inject(CONFIG);

    constructor() {
        this.subs.add(
            this.explorerService.openedDir$.subscribe((nodes) => {
                this.items = nodes ? nodes.children : [];
            })
        );

        this.subs.add(
            this.explorerService.selection$.subscribe((nodes) => {
                this.selection.clear();
                if (nodes) {
                    this.selection = new Set(nodes.map((n) => n.id));
                }
            })
        );
    }

    select(event: MouseEvent, item: INode) {
        const shiftKeyPressed = event.shiftKey;
        const metaKeyPressed = event.metaKey || event.ctrlKey;

        if (this.config.multipleSelection && shiftKeyPressed) {
            if (this.selection.size === 0) {
                this.selection.add(item.id);
                this.shiftSelectionStartId = item.id;
            } else {
                this.selection.clear();
                const headIndex = this.items.findIndex((i) => i.id === this.shiftSelectionStartId);
                const currentIndex = this.items.findIndex((i) => i.id === item.id);

                const start = Math.min(headIndex, currentIndex);
                const end = Math.max(headIndex, currentIndex);

                for (let i = start; i <= end; i++) {
                    this.selection.add(this.items[i].id);
                }
            }
        } else {
            if (this.config.multipleSelection && metaKeyPressed) {
                if (this.selection.has(item.id)) {
                    this.selection.delete(item.id);
                } else {
                    this.selection.add(item.id);
                }
            } else {
                this.selection.clear();
                this.shiftSelectionStartId = item.id;
                this.selection.add(item.id);
            }
        }

        const nodes = this.items.filter((i) => this.selection.has(i.id));
        this.explorerService.select(nodes);
    }

    open(event: MouseEvent, item: INode) {
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
        if (!metaKeyPressed) {
            this.explorerService.openNode(item.id);
        }
    }

    isSelected(item: INode) {
        return this.selection.has(item.id);
    }

    emptySpaceClick(): void {
        this.explorerService.select([]);
    }

    getFileIcon(item: any): string {
        if (!item.isLeaf) return this.icons.node;
        const ext = (item.name.split('.').pop() || '').toLowerCase();
        if (['mp4','avi','mov','mkv','wmv'].includes(ext)) return this.icons.movie;
        if (['jpg','jpeg','png','gif','bmp','svg','webp'].includes(ext)) return this.icons.image;
        if (['pdf'].includes(ext)) return this.icons.pdf;
        if (['zip','rar','7z','tar','gz'].includes(ext)) return this.icons.archive;
        if (['txt','md','json','xml','csv','log'].includes(ext)) return this.icons.text;
        if (['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(ext)) return this.icons.music;
        return this.icons.leaf;
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}

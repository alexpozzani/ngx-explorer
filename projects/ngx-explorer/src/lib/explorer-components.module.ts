import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExplorerMaterialModule } from './explorer-material.module';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { IconsComponent } from './components/icons/icons.component';
import { ListComponent } from './components/list/list.component';
import { ContentComponent } from './components/content/content.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { TreeComponent } from './components/tree/tree.component';
// ...import other components as needed

@NgModule({
    declarations: [

    ],
    imports: [
        CommonModule,
        ExplorerMaterialModule,
        ViewSwitcherComponent,
        MenuBarComponent,
        BreadcrumbsComponent,
        IconsComponent,
        ListComponent,
        ContentComponent,
        ExplorerComponent,
        TreeComponent],
    exports: [
        MenuBarComponent,
        BreadcrumbsComponent,
        IconsComponent,
        ListComponent,
        ContentComponent,
        ExplorerComponent,
        TreeComponent
    ]
})
export class ExplorerComponentsModule { }

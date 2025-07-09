import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  exports: [MatButtonModule, MatIconModule, MatTableModule]
})
export class ExplorerMaterialModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RenameModalComponent } from './rename-modal';

@NgModule({
  declarations: [
    RenameModalComponent,
  ],
  imports: [
    IonicPageModule.forChild(RenameModalComponent),
  ],
  exports: [
    RenameModalComponent
  ]
})
export class RenameModalComponentModule {}

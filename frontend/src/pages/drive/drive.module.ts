import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrivePage } from './drive';
import {FilterPipe} from "../../pipes/filter/filter";

@NgModule({
  declarations: [
    DrivePage,
    FilterPipe,
  ],
  imports: [
    IonicPageModule.forChild(DrivePage),
  ],
  exports: [
    DrivePage
  ]
})
export class DrivePageModule {}

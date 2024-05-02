import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFilterPipe, StatusFilterPipe } from './pipes';

@NgModule({
  declarations: [
    StatusFilterPipe,
    DataFilterPipe
  ],
  exports: [
    StatusFilterPipe,
    DataFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

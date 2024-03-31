import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusFilterPipe } from './pipes';

@NgModule({
  declarations: [
    StatusFilterPipe
  ],
  exports: [
    StatusFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

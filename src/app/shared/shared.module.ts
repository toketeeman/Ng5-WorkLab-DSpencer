import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // For common built-in browser-related features.

import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule,      // Note: there's no need to include CommonModule in an imports: array.
    DropdownDirective 
  ]
})
export class SharedModule {

}
import { NgModule } from '@angular/core';
import { HasAnyAuthorityDirective } from './has-any-authority.directive';
import { CellTemplateDirective } from './cell-template.directive';


const directives = [
  HasAnyAuthorityDirective,
  CellTemplateDirective
];

@NgModule({
  declarations: directives,
  exports: directives
})
export class DirectivesModule {}

import { NgModule } from '@angular/core';
import { OptionClassPipe } from './option-class.pipe';
import { OptionLabelPipe } from './option-value.pipe';

const pipes = [OptionClassPipe, OptionLabelPipe];

@NgModule({
  declarations: pipes,
  exports: pipes,
})
export class PipesModule {}

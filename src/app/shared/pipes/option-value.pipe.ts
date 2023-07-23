import { Pipe, PipeTransform } from '@angular/core';
import { OptionModel } from '@shared/models/option-model';

@Pipe({
  name: 'optionLabel',
})
export class OptionLabelPipe implements PipeTransform {
  transform(value: any, options?: OptionModel<any>[]): any {
    return options?.find((option: OptionModel<any>) => option.value === value)
      ?.label;
  }
}

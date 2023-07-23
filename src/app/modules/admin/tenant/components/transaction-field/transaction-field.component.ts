import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from 'app/layout/common/data-table/data-table.component';

@Component({
  selector: 'app-transaction-field',
  templateUrl: './transaction-field.component.html',
  styles: [
  ]
})
export class TransactionFieldComponent implements OnInit {
  @Input() items=[];
  @Input() columns:IColumn[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}

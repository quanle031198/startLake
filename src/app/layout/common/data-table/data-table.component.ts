/* eslint-disable arrow-body-style */
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { CellTemplateDirective } from '@shared/directives/cell-template.directive';
export interface IPagination {
  size: number;
  total: number;
  index: number;
}
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent implements OnInit, OnChanges,AfterContentInit {
  @ContentChildren(CellTemplateDirective, {})
  cellTemplates: QueryList<CellTemplateDirective>;
  @Input() rows: any = [];
  @Input() columns: IColumn[] | undefined = [];
  @Input() limit: any = 10;
  @Input() count: any = 0;
  @Input() page: any = 0;
  @Input() columnWidth: string;
  @Input() paginate: boolean = true;
  @Input() actionTemplate: TemplateRef<any>;
  @Input() rowTemplate: TemplateRef<any>;
  @Output() sortColumn = new EventEmitter<any>();
  /*Paginate by hung*/
  @Input() pagination: IPagination = { size: 10, index: 1, total: 120 };
  @Output() pageChange = new EventEmitter<any>();
  @Output() sizeChange = new EventEmitter<number>();
  sizes = [10, 20, 30, 40, 50];
  pages = [];
  constructor(private cdk: ChangeDetectorRef) {}
  get displayedColumns() {
    return this.columns.map((c: any) => c.columnDef);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { columns, pagination,...change } = changes;
    if (Object.keys(this.columns).length > 0) {
      this.columns = this.columns.map((key) => {
        return {
          ...key,
          templateColumn: (
            this.cellTemplates?.find(
              (cell) => key.columnDef === cell.key
            ) as CellTemplateDirective
          )?.templateRef
        };
      });
    }
    if (pagination) {
      this.initPages();
    }
  }
  ngAfterContentInit(): void {
    this.columns
      .filter((t) => t.pipe === 'template')
      ?.forEach((t) => {
        const cell = (
          this.cellTemplates.find(
            (cell) => t.columnDef === cell.key
          ) as CellTemplateDirective
        )?.templateRef;
        t.templateColumn = cell;
      });

  }

  changePage(e: any): void {
    this.pageChange.emit(e);
  }

  calcColumnWidth(column: any): any {
    if (this.columnWidth) {
      return this.columnWidth;
    }
    const totalFlex = this.columns?.reduce(
      (total, col) => (col.flex ?? 1) + total,
      0
    );
    return ((column.flex ?? 1) * 100) / totalFlex + '%';
  }

  getRowIndex(row: any): any {
    // return this.rows.indexOf(row) + this.limit * this.page;
    return this.rows.indexOf(row) + this.pagination.size * (this.pagination.index - 1);
  }

  sortData(columnDef: string): void {
    this.sortColumn.emit(columnDef);
  }
  initPages() {
    const residuals: number = this.pagination.total % this.pagination.size;
    const totalPage: number =
      (this.pagination.total - (this.pagination.total % this.pagination.size)) /
        this.pagination.size +
      (residuals === 0 ? 0 : 1);
    const arrPage = Array.from({ length: totalPage }, (_, i) => i + 1);
    this.pages = arrPage.filter((i, index) => index < 5);
  }
  onSizeChange() {
    this.sizeChange.emit(this.pagination.size);
  }
  onIndexChange(page: number) {
    this.pagination = { ...this.pagination, index: page };
    const residuals: number = this.pagination.total % this.pagination.size;
    const totalPage: number =
      (this.pagination.total - (this.pagination.total % this.pagination.size)) /
        this.pagination.size +
      (residuals === 0 ? 0 : 1);
    if (page > 2 && page <= totalPage - 2) {
      this.pages = new Array(page - 2, page - 1, page, page + 1, page + 2);
    } else if (page <= 2) {
      const arrPage = Array.from({ length: totalPage }, (_, i) => i + 1);
      this.pages = arrPage.filter((i, index) => index < 5);
    } else {
      if (totalPage > 5) {
        this.pages = new Array(
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      }
    }
    this.pageChange.emit(page);
  }
  onPageLeft() {
    if (this.pagination.index > 1) {
      this.pagination = {
        ...this.pagination,
        index: this.pagination.index - 1,
      };
      this.onIndexChange(this.pagination.index);
    }
  }
  onPageRight() {
    const residuals: number = this.pagination.total % this.pagination.size;
    const totalPage: number =
      (this.pagination.total - (this.pagination.total % this.pagination.size)) /
        this.pagination.size +
      (residuals === 0 ? 0 : 1);
    if (this.pagination.index < totalPage) {
      this.pagination = {
        ...this.pagination,
        index: this.pagination.index + 1,
      };
      this.onIndexChange(this.pagination.index);
    }
  }
}

export interface IColumn {
  columnDef?: string;
  header?: string;
  cellRenderer?: any;
  flex?: number;
  pipe?: string;
  tdClass?: string;
  isShowFilter?: boolean;
  templateColumn?: TemplateRef<any>;
}
const actions = [
  {
    id: 'delete',
    label: 'Delete',
    icon: 'heroicons_outline:trash',
    color: 'red',
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: 'heroicons_outline:pencil-alt',
    color: 'orange',
  },
  {
    id: 'lock',
    label: 'Lock',
    icon: 'heroicons_outline:lock-closed',
    color: 'red',
  },
  {
    id: 'resetPassword',
    label: 'Reset Password',
    icon: 'heroicons_outline:refresh',
    color: 'red',
  },
  {
    id: 'view',
    label: 'View',
    icon: 'heroicons_outline:eye',
    color: 'primary',
  },
];

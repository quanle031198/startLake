import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { IPagination } from '../data-table.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pagination: IPagination = { size: 10, index: 1, total: 120 };
  @Output() sizeChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<any>();

  sizes = [10, 20, 30, 40, 50];
  pages = [];
  constructor() {}

  ngOnInit(): void {
    this.initPages();
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { pagination } = changes;
    if (pagination) {
      this.initPages();
    }
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

import { Component, Injector } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, take } from 'rxjs';
import { RESPONSE_BODY_CODE, SUCCESS } from './app.constant';
import { BaseService } from '@core/base.service';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-base',
  template: '',
  styles: [],
})
export class BaseComponent {
  noResultText = 'Không có dữ liệu hiển thị';
  public matDialog: MatDialog;
  public matSnackBar: MatSnackBar;
  public fb: FormBuilder;

  public baseService: BaseService | undefined;

  public dialogRef: MatDialogRef<any> | undefined;
  public listData: any;
  public dataDetail: any;
  public _destroy$ = new Subject();

  columnsData: any = [];
  formSearch: FormGroup;
  formSave: FormGroup;
  isLoading = false;

  searchModel: any = {
    totalRecords: 0,
    pageIndex: 0,
    pageSize: 10,
  };
  dataModel: any = {};

  constructor(injector: Injector,
              service?: BaseService,
              dialogRef?: MatDialogRef<any>) {
    this.matDialog = injector.get(MatDialog);
    this.matSnackBar = injector.get(MatSnackBar);
    this.fb = injector.get(FormBuilder);
    this.baseService = service;
    this.dialogRef = dialogRef;
    this.formSearch = this.fb.group({});
    this.formSave = this.fb.group({});
  }

  showSnackBar(messages: string, type?: string): void {
    this.matSnackBar.open(messages, '', {
      panelClass: type === SUCCESS ? 'bg-primary' : type === 'warning' ? 'bg-warning' : 'bg-danger',
    });
  }

  showDialog(component?: any, options: MatDialogConfig = {}, callback?: any): void {
    const ref = this.matDialog.open(component, {
      width: '30vw',
      ...options,
    });
    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((value) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        callback && callback(value);
      });
  }

  getListData(objSearch?: any): void {
    this.baseService?.searchData(objSearch)
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        this.handleDataResponse(res, this.listData);
      });
  }

  getDataDetail(id: any): void {
    this.baseService?.getDetail(id)
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        this.handleDataResponse(res, this.dataDetail);
      });
  }

  deleteItem(id: any): void {
    this.baseService?.deleteItem(id)
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        if (res?.body?.code === RESPONSE_BODY_CODE) {
          this.showSnackBar('Delete success', SUCCESS);
          this.dialogRef?.close('reload');
        }
      });
  }

  updateItem(obj: any): void {
    this.baseService?.updateItem(obj)
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        if (res?.body?.code === RESPONSE_BODY_CODE) {
          this.showSnackBar('Update item success', SUCCESS);
          this.dialogRef?.close('reload');
        }
      });
  }

  addItem(obj: any): void {
    this.baseService?.addItem(obj)
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        if (res?.body?.code === RESPONSE_BODY_CODE) {
          this.showSnackBar('Add new item success', SUCCESS);
          this.dialogRef?.close();
        }
      });
  }

  handleDataResponse(res: any, data: any): void {
    if (res?.body?.code === RESPONSE_BODY_CODE) {
      data = res.body.results;
    }
  }

  public processSearch(): void {
    this.isLoading = true;
    this.columnsData = [];
    this.searchModel.totalRecords = 0;
    this.baseService?.searchData(this.searchModel).subscribe((res) => {
      if (res.code === '00') {
        const {data, totalRecords} = res;
        this.columnsData = data;
        this.searchModel.totalRecords = totalRecords;
      } else {
        this.showSnackBar(res.message, 'error');
      }
      this.isLoading = false;
    }, () =>  {
      this.isLoading = false;
    });
  }

  save(): void {
    this.isLoading = true;
    if (this.dataModel.id) {
      this.baseService?.updateItem(this.dataModel).subscribe((rs) => {
        this.showSaveOrUpdate(rs);
      }, () => this.isLoading = false);
    } else {
      this.baseService?.addItem(this.dataModel).subscribe((rs) => {
        this.showSaveOrUpdate(rs);
      }, () => this.isLoading = false);
    }

  }
  onClosePopup(): void {
    this.dialogRef?.close();
  }

  showSaveOrUpdate(rs: any, isModal?: boolean): void {
    this.isLoading = false;
    if (rs.code === '00') {
      this.onClosePopup();
      this.showSnackBar('Lưu thông tin thành công');
      if (isModal) {
        this.dialogRef?.close(true);
      }
    } else {
      this.showErrCommonMessage();
    }
  }

  /**
   * Xu ly xoa
   */
  public processDelete(id: any): void {
    if (id && id > 0) {
      this.baseService?.deleteItem(id).subscribe((res) => {
          if (res.code === '00') {
            this.processSearch();
          }
        });
    }
  }

  clearInput(key: any, e: any): void {
    e.stopPropagation();
    if (this.formSearch) {
      this.formSearch.get(key)?.setValue(null);
      return;
    }
    this.formSave?.get(key)?.setValue(null);
  }

  checkInputData(key: any): any {
    let value;
    if (this.formSearch) {
      value = this.formSearch.get(key)?.value;
    } else {
      value = this.formSave?.get(key)?.value;
    }
    return value !== undefined && value !== null && value !== '';
  }

  clearInputRangeDate(fromDate: any, toDate: any): void {
    this.formSearch?.patchValue({[fromDate]: null, [toDate]: null});
  }

  showErrCommonMessage(): void {
    this.showSnackBar('Oops, Có lỗi xảy ra. Xin vui lòng liên hệ quản trị viên!', 'warning');
  }

  toolbarTitle(totalRecords: any): string {
    return `KẾT QUẢ TÌM KIẾM (${totalRecords})`;
  }

  get f(): any {
    if (this.formSearch) {
      return this.formSearch.controls;
    }
    return this.formSave?.controls;
  }

  getNextPage(e: PageEvent): void {
    this.searchModel.pageIndex = e.pageIndex;
    this.searchModel.pageSize = e.pageSize;
    this.processSearch();
  }
}

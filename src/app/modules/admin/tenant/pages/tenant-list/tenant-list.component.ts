import { Component, Injector, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { TenantFormComponent } from '../../components/tenant-form/tenant-form.component';
import { BaseComponent } from '@core/base.component';
import {
  IColumn,
  IPagination,
} from 'app/layout/common/data-table/data-table.component';
import moment from 'moment';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { OptionModel } from '@shared/models/option-model';
import * as lodash from 'lodash-es';
import { Router } from '@angular/router';
import { EStatusTenant } from '../../enums/status-tenant.enum';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styles: [],
})
export class TenantListComponent extends BaseComponent implements OnInit {
  pagination: IPagination = { size: 10, index: 1, total: 0 };
  params = {};
  keyword: FormControl = new FormControl('');
  statusOptions: OptionModel<number>[] = [
    {
      value: EStatusTenant.ACTIVE,
      label: 'Active',
      class: 'border-[#44B987] bg-[#73CBA526] text-[#44B987]',
    },
    {
      value: EStatusTenant.INACTIVE,
      label: 'InActive',
      class: 'border-[#FD557E] text-[#FD557E] bg-[#FEEBEF]',
    },
  ];

  columns: IColumn[] = [
    {
      columnDef: 'idx',
      header: 'ID',
      flex: 0.2,
      tdClass: 'text-center',
      isShowFilter: true,
    },
    {
      columnDef: 'name',
      header: 'Name',
      flex: 0.7,
      isShowFilter: true,
    },
    {
      columnDef: 'partner',
      header: 'Partner',
      flex: 0.7,
      isShowFilter: true,
    },
    {
      columnDef: 'plan',
      header: 'Plan',
      flex: 1,
      isShowFilter: true,
    },
    {
      columnDef: 'lifetime',
      header: 'Lifetime',
      flex: 1,
      isShowFilter: true,
    },
    {
      columnDef: 'status',
      header: 'Status',
      flex: 1,
      isShowFilter: true,
      pipe: 'template',
    },
    {
      columnDef: 'action',
      header: 'Actions',
      flex: 0.5,
      isShowFilter: false,
      pipe: 'template',
    },
    {
      columnDef: 'access',
      header: '',
      flex: 0.5,
      isShowFilter: false,
      pipe: 'template',
    },
  ];
  items = [];

  constructor(
    private injector: Injector,
    private tenantService: TenantService,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.params = {
      pageSize: this.pagination.size || 10,
      page: this.pagination.index || 1,
    };
    this.getItems(this.params);
    this.keyword.valueChanges.pipe(debounceTime(700)).subscribe((x) => {
      this.params = {
        pageSize: this.pagination.size || 10,
        page: this.pagination.index || 1,
        keyword: x,
      };
      this.getItems(this.params);
    });
  }
  addTenant() {
    this.showDialog(
      TenantFormComponent,
      {
        data: {},
        width: '60vw',
        disableClose: true,
      },
      (value) => {
        if (value) {
          this.params = { pageSize: 10, page: 1 };
          this.getItems(this.params);
        }
      }
    );
  }
  getItems(params: any) {
    this.tenantService
      .find({ ...params, page: params.page - 1 })
      .subscribe((res: any) => {
        this.items = res.data
          .filter((el) => el.status !== -1)
          .map((e, i: number) => ({ ...e, idx: i + 1 }));
        this.pagination = { ...this.pagination, total: res.totalRecords };
      });
  }
  editTenant(item: any) {
    this.showDialog(
      TenantFormComponent,
      {
        data: { item },
        width: '60vw',
        disableClose: true,
      },
      (value) => {
        if (value) {
          this.params = { pageSize: 10, page: 1 };
          this.tenantService.update(value.data).subscribe((x) => {
            this.getItems({ pageSize: 10 });
            // this.notif.open({type:'success',content:'Chỉnh sửa thành công.'});
          });
        }
      }
    );
  }
  onSizeChange(event: any) {
    this.params = { ...this.params, pageSize: event };
    this.getItems(this.params);
  }
  onPageChange(event: any) {
    this.params = { ...this.params, page: event };
    this.getItems(this.params);
  }
  changeStatus(row: any, status: number) {
    const body: any =
      row.status === status
        ? { ...row }
        : {
            ...row,
            status:
              row.status === EStatusTenant.ACTIVE
                ? EStatusTenant.INACTIVE
                : EStatusTenant.ACTIVE,
          };
    if (!lodash.isEqual(row, body)) {
      this.tenantService.update(body).subscribe((res) => {
        this.showSnackBar('Đổi trạng thái thành công', 'success');
        this.getItems(this.params);
      });
    }
  }
  onEdit(item: any) {
    this.router.navigate([`/tenant/detail/${item.id}`]);
  }
  onDelete(item: any) {
    this.showDialog(
      ConfirmDialogComponent,
      {
        data: { content: 'Bạn có chắc muốn xóa bản ghi?' },
        width: '60vw',
        disableClose: true,
      },
      (value) => {
        if (value) {
          this.tenantService.delete(item.id).subscribe((x) => {
            this.showSnackBar('Xóa thành công.', 'success');
            this.params = { pageSize: 10, page: 1 };
            this.getItems(this.params);
          });
        }
      }
    );
  }
}

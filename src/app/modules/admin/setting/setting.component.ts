import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import moment from 'moment';
import {SettingService} from './setting.service';
import {ConfirmDialogComponent} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {map, of, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {COLUMNS_TABLE_GROUP, COLUMNS_TABLE_ROLE, COLUMNS_TABLE_USER, LIST_GROUP, LIST_ROLE, LIST_USER} from '@modules/admin/setting/setting.constant';
import {AddOrEditUserComponent} from '@modules/admin/setting/components/tab-user/add-or-edit-user/add-or-edit-user.component';
import {AddOrEditGroupComponent} from '@modules/admin/setting/components/tab-group/add-or-edit-group/add-or-edit-group.component';
import {AssignUserRoleComponent} from '@modules/admin/setting/components/tab-role/assign-user-role/assign-user-role.component';
import {ActivatedRoute, Router} from '@angular/router';
import {IPagination} from "../../../layout/common/data-table/data-table.component";
import {
  LockOrUnlockPopupComponent
} from "@modules/admin/setting/components/tab-user/lock-or-unlock-popup/lock-or-unlock-popup.component";

@Component({
  selector: 'app-user',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent extends BaseComponent implements OnInit, OnDestroy {
  dataTable: any = LIST_USER;
  columns: any = COLUMNS_TABLE_USER;
  paginate: any = {
    keySearch: '',
    size: 10,
    page: 0,
    total: 0
  };
  pagination: IPagination = {index: 1, size: 10, total: 0};
  changeTab$ = new Subject();
  selectedTab = 0;
  constructor(injector: Injector, private settingService: SettingService, private _router: Router, private _activatedRoute: ActivatedRoute) {
    super(injector);
  }
  ngOnInit(): void {
    /*this._activatedRoute.queryParams.subscribe((params: any) => {
      if(params){
        this.selectedTab = params?.tab;
      }
    });*/
    this.selectedTab = localStorage.getItem('tab') ? +JSON.parse(localStorage.getItem('tab')) : 0;
    this.initData();
    /*Change tab*/
    this.changeTab$
      .pipe(
        tap((e: any) => {
          this.selectedTab = e.index;
          switch (this.selectedTab) {
            case 0:
              this.columns = COLUMNS_TABLE_USER;
              break;
            case 1:
              this.columns = COLUMNS_TABLE_GROUP;
              break;
            case 2:
              this.columns = COLUMNS_TABLE_ROLE;
              break;
            default:
              break;
          }
        }),
        switchMap(() => {
          this.dataTable = [];
          switch (this.selectedTab) {
            case 0:
              return this.settingService.getListUser().pipe(catchError(err => of(null)));
              // return of(LIST_USER);
            case 1:
              return this.settingService.getListGroup().pipe(catchError(err => of(null)));
              // return of(LIST_GROUP);
            case 2:
              return this.settingService.getListRole().pipe(catchError(err => of(null)));
            default:
              return of(null);
          }
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((res) => {
        this.handleDataTableResponse(res);
        // this.dataTable = res;
      });
  }
  initData(key?: any): void{
    localStorage.removeItem('tab');
    if(this.selectedTab === 0){
      this.columns = COLUMNS_TABLE_USER;
      this.getListUser();
    }else if(this.selectedTab === 1){
      this.columns = COLUMNS_TABLE_GROUP;
      this.getListGroup();
    }else if(this.selectedTab === 2){
      this.columns = COLUMNS_TABLE_ROLE;
      this.getListRole();
    }
  }
  handleDataTableResponse(res: any): void {
    if (res.body.code === '00') {
      this.dataTable = res.body.data;
      this.transferPagination({total: this.dataTable.length});
    }
  }
  transferPagination(obj: any){
    this.pagination = {
      ...this.pagination,
      ...obj
    };
  }
  getListUser(): void {
    this.settingService.getListUser({keyword: this.paginate.keySearch}).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      this.handleDataTableResponse(res);
    });
  }
  getListGroup(): void{
    this.settingService.getListGroup({keyword: this.paginate.keySearch}).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      this.handleDataTableResponse(res);
    });
  }
  getListRole(): void{
    this.settingService.getListRole({name: this.paginate.keySearch}).pipe(takeUntil(this._destroy$)).subscribe((res) => {
      this.handleDataTableResponse(res);
    });
  }
  addNew(): void {
    if(this.selectedTab === 0){
      this.addOrEditUser();
    }else if(this.selectedTab === 1){
      this.addOrEditGroup();
    }else if(this.selectedTab === 2){
      // this._router.navigate(['user/add-role'], {queryParams: {tab: this.selectedTab}});
      this._router.navigate(['setting/add-role']);
      localStorage.setItem('tab', JSON.stringify(this.selectedTab));
    }
  }
  sortTable(e: any): void {
    const self = [...this.dataTable];
    const temp = [...this.dataTable];
    temp.sort((p1, p2) => (p1[e] < p2[e]) ? 1 : (p1[e] > p2[e]) ? -1 : 0);
    const check = self.every((item, index) => item[e] === temp[index][e]);
    if (check) {
      temp.sort((p1, p2) => (p1[e] > p2[e]) ? 1 : (p1[e] < p2[e]) ? -1 : 0);
    }
    this.dataTable = [...temp];
  }
  changePage(e: any): void {
    this.transferPagination({index: e});
  }
  changeSize(e: any) {
    this.transferPagination({size: e});
  }

  /*** Event tab User
   * @param User
   */
  addOrEditUser(userData?: any): void {
    this.showDialog(AddOrEditUserComponent, {
      data: {
        userData,
      },
      width: '40vw',
      disableClose: true
    }, (value) => {
      if (value) {
        this.getListUser();
      }
    });
  }
  deleteUser(row: any): void {
    const temp = {...row, status: -1};
    this.showDialog(ConfirmDialogComponent, {}, (value) => {
      if (value) {
        this.settingService.addOrEditUser(temp).subscribe((res
        ) => {
          if (res.status === 200) {
            this.showSnackBar('Xóa bản ghi thành công', 'success');
            this.getListUser();
          }
        });
      }
    });
  }
  changeStatusUser(row: any, sta: any): void {
    const temp = {...row, status: sta};
    this.settingService.addOrEditUser(temp).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      if (res.body.code === '00') {
        this.showSnackBar('Thay đổi trạng thái thành công', 'success');
        this.getListUser();
      }
    });
  }

  lockOrUnlockUser(row: any): void {
    this.showDialog(LockOrUnlockPopupComponent, {}, (value) => {
      if (value) {
        console.log(row);
        // this.settingService.addOrEditUser(temp).subscribe((res
        // ) => {
        //   if (res.status === 200) {
        //     this.showSnackBar('Xóa bản ghi thành công', 'success');
        //     this.getListUser();
        //   }
        // });
      }
    });
  }

  resetPassword(userData?: any): void {
    this.showDialog(AddOrEditUserComponent, {
      data: {
        userData,
      },
      width: '40vw',
      disableClose: true
    }, (value) => {
      if (value) {
        this.getListUser();
      }
    });
  }

  /*** Event tab Group
   * @param Group
   */
  addOrEditGroup(groupData?: any): void{
    this.showDialog(AddOrEditGroupComponent, {
      data: {
        groupData,
      },
      width: '40vw',
      disableClose: true
    }, (value) => {
      if (value) {
        this.getListGroup();
      }
    });
  }
  deleteGroup(row: any): void{
    const temp = {...row, status: -1};
    this.showDialog(ConfirmDialogComponent, {}, (value) => {
      if(value){
        this.settingService.addOrEditGroup(temp).pipe(takeUntil(this._destroy$)).subscribe((res) => {
          if(res.body.code === '00'){
            this.showSnackBar('Xóa thành công', 'success');
            this.getListGroup();
          }
        });
      }
    });
  }
  changeStatusGroup(row: any, sta: any): void{
    const temp = {...row, status: sta};
    this.settingService.addOrEditGroup(temp).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
      if (res.body.code === '00') {
        this.showSnackBar('Thay đổi trạng thái thành công', 'success');
        this.getListGroup();
      }
    });
  }

  /**
   * Event Role
   */
  assignUser(): void {
    this.showDialog(AssignUserRoleComponent, {}, (value) => {
      if(value){
        this.getListRole();
      }
    });
  }
  deleteRole(id: any): void {
    this.showDialog(ConfirmDialogComponent, {}, (value) => {
      if(value){
        this.settingService.deleteRole(id).pipe(takeUntil(this._destroy$)).subscribe((res) => {
          if(res.body.code === '00'){
            this.showSnackBar('Xóa thành công', 'success');
            this.getListRole();
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}

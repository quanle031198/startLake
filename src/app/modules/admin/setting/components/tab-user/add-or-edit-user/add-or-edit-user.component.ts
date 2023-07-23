import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SettingService} from '@modules/admin/setting/setting.service';
import {Validators} from '@angular/forms';
import {forkJoin, map, of, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-add-or-edit-user',
  templateUrl: './add-or-edit-user.component.html',
  styleUrls: ['./add-or-edit-user.component.scss']
})
export class AddOrEditUserComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required])],
    fullname: [null, Validators.compose([Validators.required])],
    phone: [null, Validators.compose([Validators.required, Validators.pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)])],
    email: [null, Validators.compose([Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/)])],
    groupIds: [null],
    roleIds: [null],
    status: [1]
  });
  userData: any;
  listRole: any[] = [];
  listGroup: any[] = [];
  save$ = new Subject();

  constructor(injector: Injector, public dialogRef: MatDialogRef<AddOrEditUserComponent>,
              private settingService: SettingService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);
    this.userData = data?.userData;
    this.initData();
    /*if (data?.userData) {
      this.settingService.getListUser({id: data?.userData.id}).pipe(takeUntil(this._destroy$)).subscribe((res: any) => {
        if (res.body.code === '00') {
          this.userData = res.body.data[0];
          const temp = {
            ...this.userData,
            roleIds: this.userData.roleIds,
            groupIds: this.userData.groupIds
          };
          this.formGroup.patchValue(temp);
          // console.log(this.formGroup.value);
        }
      });
    }*/
  }

  initData(): void {
    forkJoin([this.settingService.getListGroup(), this.settingService.getListRole()]).pipe(takeUntil(this._destroy$)).subscribe(([groupResponse, roleResponse]) => {
      this.handleGroupResponse(groupResponse);
      this.handleRoleResponse(roleResponse);
      if (this?.userData) {
        const temp = {...this.userData};
        temp.groupIds = temp?.groupIds.map((groupId: any) => {
          const group = this.listGroup.filter(g => g?.id === groupId);
          return {
            id: group[0]?.id,
            label: group[0]?.label
          };
        });
        temp.roleIds = temp?.roleIds.map((roleId: any) => {
          const role = this.listRole.filter(r => r?.id === roleId);
          return {
            id: role[0]?.id,
            label: role[0]?.label
          };
        });
        this.formGroup.patchValue(temp);
      }
    });
  }

  handleRoleResponse(res: any): void {
    if (res.body.code === '00') {
      this.listRole = res.body.data.map(item => ({id: item?.id, label: item?.code}));
    }
  }

  handleGroupResponse(res: any): void {
    if (res.body.code === '00') {
      this.listGroup = res.body.data.map(item => ({id: item?.id, label: item?.groupName}));
    }
  }

  ngOnInit(): void {
    this.save$
      .pipe(
        map((value: any) => {
          const self = {...value, status: value.status === true || value.status === 1 ? 1 : 0};
          self.groupIds = self.groupIds?.map(group => group?.id);
          self.roleIds = self.roleIds?.map(role => role?.id);
          return {...this.userData, ...self};
        }),
        switchMap(obj => this.settingService.addOrEditUser(obj).pipe(catchError(err => of(null)))),
        takeUntil(this._destroy$)
      )
      .subscribe((res: any) => {
        if (res.body.code === '00') {
          this.showSnackBar(this.userData ? 'Cập nhật thành công' : 'Thêm mới thành công', 'success');
          this.closeDialog('reload');
        }
      });
  }

  closeDialog(title?: string): void {
    this._destroy$.next(null);
    this._destroy$.complete();
    this.dialogRef.close(title);
  }

  removeRole(r: any, e: any): void {
    e.stopPropagation();
    const temp = [...this.formGroup.value.roleIds];
    const roles = temp as string[];
    this.removeFirst(roles, r);
    this.formGroup.controls.roleIds.patchValue(roles); // To trigger change detection
  }

  removeGroup(g: any, e: any): void {
    e.stopPropagation();
    const temp = [...this.formGroup.value.groupIds];
    const groups = temp as string[];
    this.removeFirst(groups, g);
    this.formGroup.controls.groupIds.patchValue(groups); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {Validators} from '@angular/forms';
import {SettingService} from '@modules/admin/setting/setting.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {forkJoin, map, of, Subject, switchMap, takeUntil} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-add-or-edit-group',
  templateUrl: './add-or-edit-group.component.html',
  styleUrls: ['./add-or-edit-group.component.scss']
})
export class AddOrEditGroupComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    groupName: [null, Validators.compose([Validators.required])],
    code: [null, Validators.compose([Validators.required])],
    userIds: [null, Validators.compose([Validators.required])],
    roleIds: [null],
    status: [1]
  });
  groupData: any;
  listRole = [];
  listMember = [];
  save$ = new Subject();
  constructor(injector: Injector, private settingService: SettingService, public dialogRef: MatDialogRef<AddOrEditGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);
    this.initData();
    if(data?.groupData){
      this.groupData = data?.groupData;
      const temp = {
        ...this.groupData,
        userIds: this.groupData?.userIds,
        roleIds: this.groupData?.roleIds,
        status: this.groupData?.status === 1 ? true : false
      };
      console.log(temp);
      this.formGroup.patchValue(temp);
    }
  }
  initData(): void{
    forkJoin([this.settingService.getListUser(), this.settingService.getListRole()])
      .pipe(takeUntil(this._destroy$))
      .subscribe(([userResponse, roleResponse]) => {
        this.handleUserResponse(userResponse);
        this.handleRoleResponse(roleResponse);
      });
  }
  handleUserResponse(res: any): void{
    if(res.body.code === '00'){
      this.listMember = res.body.data;
    };
  }
  handleRoleResponse(res: any): void{
    if(res.body.code === '00'){
      this.listRole = res.body.data;
    }
  }
  ngOnInit(): void {
    this.save$.pipe(
      map((value: any) => {
        const temp = {
          ...value,
          status: value?.status === true || value?.status === 1 ? 1: 0,
        };
        return {...this.groupData, ...temp};
      }),
      switchMap(obj => this.settingService.addOrEditGroup(obj).pipe(catchError(err => of(null))))
    ).subscribe((res: any) => {
      if(res.body.code === '00'){
        this.showSnackBar(this.groupData ? 'Cập nhật thành công': 'Thêm mới thành công', 'success');
        this.closeDialog('reload');
      }
    });
  }

  closeDialog(title?: any): void {
    this._destroy$.next(null);
    this._destroy$.complete();
    this.dialogRef.close(title);
  }

  displayLabel(arr: any, id: any, field: string): any{
    return arr.filter(item => item?.id === id)[0]?.[field];
  }

  removeRole(r: any, e: any): void {
    e.stopPropagation();
    const temp = [...this.formGroup.value.roleIds];
    const roles = temp as string[];
    this.removeFirst(roles, r);
    this.formGroup.controls.roleIds.patchValue(roles); // To trigger change detection
  }

  removeMember(m: any, e: any): void {
    e.stopPropagation();
    const temp = [...this.formGroup.value.userIds];
    const members = temp as string[];
    this.removeFirst(members, m);
    this.formGroup.controls.userIds.patchValue(members); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}

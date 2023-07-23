import {Component, Inject, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {SettingService} from '@modules/admin/setting/setting.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Validators} from '@angular/forms';
import {of, Subject, switchMap, takeUntil} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-assign-user-role',
  templateUrl: './assign-user-role.component.html',
  styleUrls: ['./assign-user-role.component.scss']
})
export class AssignUserRoleComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    role: [null, Validators.compose([Validators.required])],
    member: [null, Validators.compose([Validators.required])],
  });
  listRole = ['Update', 'Create', 'Read'];
  listMember = ['Phong', 'Justina', 'Chu'];
  save$ = new Subject();
  constructor(injector: Injector, private setting: SettingService, public dialogRef: MatDialogRef<AssignUserRoleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super(injector);
  }

  ngOnInit(): void {
    this.save$
      .pipe(
        switchMap(obj => this.setting.assignUserRole(obj).pipe(catchError(err => of(null)))),
        takeUntil(this._destroy$)
      )
      .subscribe((res: any) => {
      this.showSnackBar('Cấp quyền thành công', 'success');
      this.dialogRef.close('reload');
    });
  }
  closeDialog(title?: any): void{
    this._destroy$.next(null);
    this._destroy$.complete();
    this.dialogRef.close(title);
  }

}

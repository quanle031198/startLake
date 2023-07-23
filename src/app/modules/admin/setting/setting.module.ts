import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import {SharedModule} from '@shared/shared.module';
import {DataTableModule} from '../../../layout/common/data-table/data-table.module';
import { AddOrEditUserComponent } from './components/tab-user/add-or-edit-user/add-or-edit-user.component';
import { AddOrEditGroupComponent } from './components/tab-group/add-or-edit-group/add-or-edit-group.component';
import { AssignUserRoleComponent } from './components/tab-role/assign-user-role/assign-user-role.component';
import {ErrorMessageModule} from '@shared/components/error-message/error-message.module';
import { AddRoleComponent } from './components/tab-role/add-role/add-role.component';
import { LockOrUnlockPopupComponent } from './components/tab-user/lock-or-unlock-popup/lock-or-unlock-popup.component';
import { ResetPasswordPopupComponent } from './components/tab-user/reset-password-popup/reset-password-popup.component';


@NgModule({
  declarations: [
    SettingComponent,
    AddOrEditUserComponent,
    AddOrEditGroupComponent,
    AssignUserRoleComponent,
    AddRoleComponent,
    LockOrUnlockPopupComponent,
    ResetPasswordPopupComponent
  ],
    imports: [
        CommonModule,
        SettingRoutingModule,
        SharedModule,
        DataTableModule,
        ErrorMessageModule
    ]
})
export class SettingModule { }

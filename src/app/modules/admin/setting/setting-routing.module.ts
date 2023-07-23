import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingComponent} from '@modules/admin/setting/setting.component';
import {AddRoleComponent} from '@modules/admin/setting/components/tab-role/add-role/add-role.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
  },
  {
    path: 'add-role',
    component: AddRoleComponent,
    data: {breadcrumb: {label: 'Add role'}}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }

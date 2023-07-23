import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from '@shared/shared.module';
import { TenantFormComponent } from './components/tenant-form/tenant-form.component';
import { TenantListComponent } from './pages/tenant-list/tenant-list.component';
import { TenantRoute } from './tenant.routing';
import { DataTableModule } from 'app/layout/common/data-table/data-table.module';
import { TenantDetailComponent } from './pages/tenant-detail/tenant-detail.component';
import { ErrorMessageModule } from '@shared/components/error-message/error-message.module';
import { TransactionFieldComponent } from './components/transaction-field/transaction-field.component';


@NgModule({
  declarations: [
    TenantFormComponent,
    TenantListComponent,
    TenantDetailComponent,
    TransactionFieldComponent
  ],
  imports: [
    CommonModule,
    TenantRoute,
    SharedModule,
    DataTableModule,
    ErrorMessageModule
  ]
})
export class TenantModule { }

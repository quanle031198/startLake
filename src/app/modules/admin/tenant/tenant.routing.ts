import { Routes, RouterModule } from '@angular/router';
import { TenantListComponent } from './pages/tenant-list/tenant-list.component';
import { TenantDetailComponent } from './pages/tenant-detail/tenant-detail.component';

const routes: Routes = [
  { path: '', component: TenantListComponent },
  {
    path: 'detail/:id',
    component: TenantDetailComponent,
    data: { breadcrumb: { label: 'Edit Tenant', url: 'tenant' } },
  },
];

export const TenantRoute = RouterModule.forChild(routes);

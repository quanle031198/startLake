import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { IColumn } from 'app/layout/common/data-table/data-table.component';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tenant-detail',
  templateUrl: './tenant-detail.component.html',
  styles: [],
})
export class TenantDetailComponent implements OnInit {
  isCollapse = [false, true, false];
  id: string = '';
  crrTenant: any;
  columnsTransaction: IColumn[] = [
    {
      columnDef: 'id',
      header: 'ID',
      flex: 0.5,
      isShowFilter:true
    },
    {
      columnDef: 'name',
      header: 'Name',
      flex: 0.7,
      isShowFilter:true
    },
    {
      columnDef: 'partner',
      header: 'Partner',
      flex: 0.7,
      isShowFilter:true
    },
    {
      columnDef: 'plan',
      header: 'Plan',
      flex: 1,
      cellRenderer: (element: any) => `<a
      class="text-primary cursor-pointer"
      [routerLink]="'https://www.google.com/'"
    >
      ${element.plan}
    </a>`,
    isShowFilter:true
  },
    {
      columnDef: 'lifetime',
      header: 'Lifetime',
      cellRenderer: (element: any) => {
        if (element.lifetime) {
          return `${moment(new Date(element.lifetime)).format('DD/MM/YYYY')}`;
        } else {
          return '<span></span>';
        }
      },
      flex: 1,
      isShowFilter:true
    },
    {
      columnDef: 'status',
      header: 'Status',
      flex: 1,
      isShowFilter:true
    },
    {
      columnDef: 'action',
      header: 'Actions',
      flex: 0.5,
      isShowFilter:false
    },
  ];
  itemsTransaction = [
    {
      id: 1,
      name: 'tenant1',
      partner: 'tuannv92',
      plan: 'plan 1',
      lifetime: new Date('2023-01-10'),
      status: false,
    },
    {
      id: 2,
      name: 'tenant1',
      partner: 'tuannv92',
      plan: 'plan 1',
      lifetime: new Date('2023-01-10'),
      status: true,
    },
    {
      id: 3,
      name: 'tenant1',
      partner: 'tuannv92',
      plan: 'plan 1',
      lifetime: new Date('2023-01-10'),
      status: true,
    },
  ];
  constructor(
    private tenantService: TenantService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe((res) => {
      this.id = res.get('id') || '';
      if (this.id) {
        this.findById();
      }
    });
  }
  findById() {
    const params = { id: this.id };
    this.tenantService.find(params).subscribe((res: any) => {
      this.crrTenant = res.data[0];
    });
  }
}

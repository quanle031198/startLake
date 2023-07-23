import moment from 'moment/moment';
import {IColumn} from '../../../layout/common/data-table/data-table.component';

export const COLUMNS_TABLE_USER: IColumn[] = [
  {
    columnDef: 'stt',
    header: 'ID',
    flex: 1,
  },
  {
    columnDef: 'username',
    header: 'Username',
    flex: 0.7,
    isShowFilter: true
  },
  {
    columnDef: 'fullname',
    header: 'Name',
    isShowFilter: true
  },
  {
    columnDef: 'email',
    header: 'Email',
    flex: 1.5,
    isShowFilter: true
  },
  {
    columnDef: 'phone',
    header: 'Phone',
    flex: 0.7,
    isShowFilter: true
  },
  {
    columnDef: 'status',
    header: 'Status',
    isShowFilter: true
  },
  {
    columnDef: 'createdAt',
    header: 'Create date',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    cellRenderer: (element: any) => `${moment(new Date(element.createdAt)).format('DD/MM/yyyy')}`,
    isShowFilter: true
  },
  {
    columnDef: 'action',
    header: 'Actions',
    flex: 0.5
  }
];
export const COLUMNS_TABLE_GROUP: IColumn[] = [
  {
    columnDef: 'stt',
    header: 'ID',
    flex: 0.5,
  },
  {
    columnDef: 'code',
    header: 'Code',
    flex: 0.7,
    isShowFilter: true
  },
  {
    columnDef: 'groupName',
    header: 'Name',
    isShowFilter: true
  },
  {
    columnDef: 'userIds',
    header: 'Members',
    flex: 1.5,
    cellRenderer: (element: any) => `${element.userIds?.length}`,
    isShowFilter: true
  },
  {
    columnDef: 'status',
    header: 'Status',
    isShowFilter: true
  },
  {
    columnDef: 'createdAt',
    header: 'Create date',
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    cellRenderer: (element: any) => `${moment(new Date(element.createdAt)).format('DD/MM/yyyy')}`,
    isShowFilter: true
  },
  {
    columnDef: 'action',
    header: 'Actions',
    flex: 0.5
  }
];

export const COLUMNS_TABLE_ROLE: IColumn[] = [
  {
    columnDef: 'stt',
    header: 'ID',
    flex: 0.5,
  },
  {
    columnDef: 'name',
    header: 'Role name',
    flex: 0.7,
    isShowFilter: true,
  },
  {
    columnDef: 'status',
    header: 'Status',
    isShowFilter: true
  },
  {
    columnDef: 'action',
    header: 'Actions',
    flex: 0.5
  }
];

export const LIST_USER = [
  {
    id: '123',
    username: 'phongvt',
    email: 'phong.vu@lifesup.com.vn',
    phone: '0858097496',
    name: 'Vũ Thanh Phong',
    group: 'VTT',
    status: 1,
    role: ['admin', 'view', 'delete'],
    createdAt: '10/10/2023'
  },
  {
    id: '234',
    username: 'justina',
    email: 'justina.xie@lifesup.com.vn',
    phone: '0858097496',
    name: 'Justina Xie',
    group: 'VTT',
    status: 0,
    role: ['admin', 'create', 'update'],
    createdAt: '10/9/2021'
  },
  {
    id: '456',
    username: 'huyennt',
    email: 'huyen.nguyen@lifesup.com.vn',
    phone: '0858097496',
    name: 'Nguyễn Thanh Huyền',
    group: 'DCM',
    status: 1,
    role: ['view', 'delete'],
    createdAt: '9/9/2021',
  },
];
export const LIST_GROUP = [
  {
    id: '123',
    groupName: 'phongvt',
    member: '0858097496',
    permission: 'Vũ Thanh Phong',
    status: 1,
    createdAt: '10/10/2023'
  },
  {
    id: '234',
    groupName: 'justina',
    member: '0858097496',
    fullName: 'Justina Xie',
    status: 0,
    createdAt: '10/9/2021'
  },
  {
    id: '456',
    groupName: 'huyennt',
    member: 'huyen.nguyen@lifesup.com.vn',
    status: 1,
    createdAt: '9/9/2021',
  },
];
export const LIST_ROLE = [
  {
    id: '123',
    service: 'phongvt',
    authorized: '0858097496',
    createdAt: '10/10/2023'
  },
  {
    id: '234',
    service: 'justina',
    authorized: '0858097496',
    createdAt: '10/9/2021'
  },
  {
    id: '456',
    service: 'huyennt',
    authorized: 'huyen.nguyen@lifesup.com.vn',
    createdAt: '9/9/2021',
  },
];



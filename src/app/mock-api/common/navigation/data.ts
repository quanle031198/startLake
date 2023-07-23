/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import {AuthoritiesConstant} from "../../../authorities.constant";
/*export const defaultNavigation: FuseNavigationItem[] = [
  // {
  //   id      : 'dashboards',
  //   title   : 'Dashboards',
  //   type    : 'basic',
  //   icon    : 'heroicons_outline:home',
  //   link : '/dashboards',
  //   role: []
  // },
  {
    id      : 'tenant',
    title   : 'Tenant',
    type    : 'basic',
    icon    : 'heroicons_outline:layout-corners-dashboard-1',
    link : '/setting/tenant',
    role: []
  },
  /!*{
    id      : 'datalakeManagement',
    title   : 'Datalake Management',
    type    : 'group',
    icon    : 'heroicons_outline:home',
    role: [],
    children: [
      {
        id   : 'clusterManager',
        title: 'Cluster Manager',
        type : 'collapsable',
        icon : 'heroicons_outline:clipboard-check',
        role: [],
        children: [
          {
            id   : 'serverIpTableManager',
            title: 'Server Ip Table Manager',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/cluster-manager/server-ip-table-manager',
            role: [],
          },
          {
            id   : 'ipTableRule',
            title: 'Ip Table Rule',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/cluster-manager/ip-table-rule',
            role: [],
          },
          {
            id   : 'duFileServerRule',
            title: 'Du File Server Rule',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/cluster-manager/du-file-server-rule',
            role: [],
          },
          {
            id   : 'duFileHDFSRule',
            title: 'Du File HDFS Rule',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/cluster-manager/du-file-hdfs-rule',
            role: [],
          },
        ]
      },
      {
        id   : 'lbManager',
        title: 'LB Manager',
        type : 'collapsable',
        icon : 'heroicons_outline:chart-pie',
        role: [],
        children: [
          {
            id   : 'lbConnection',
            title: 'LB Connection',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/lb-manager/lb-connection',
            role: [],
          },
          {
            id   : 'rpApp',
            title: 'RP App',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/lb-manager/rp-app',
            role: [],
          }
        ]
      },
      {
        id   : 'thriftManager',
        title: 'Thrift Manager',
        type : 'collapsable',
        icon : 'heroicons_outline:cash',
        role: [],
        children: [
          {
            id   : 'ThriftAccessRule',
            title: 'Thrift Access Rule',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/thrift-manager/thrift-access-rule',
            role: [],
          },
          {
            id   : 'thriftRule',
            title: 'Thrift Rule',
            type : 'basic',
            icon : 'heroicons_outline:chart-pie',
            link : '/thrift-manager/thrift-rule',
            role: [],
          }
        ]
      },
      {
        id   : 'alertManager',
        title: 'Alert Manager',
        type : 'basic',
        icon : 'heroicons_outline:currency-dollar',
        link : '/alert-manager',
        role: []
      }
    ]
  },
  {
    id      : 'utility',
    title   : 'Utility',
    type    : 'group',
    icon    : 'heroicons_outline:home',
    role: [],
    children: [
      {
        id   : 'supportRequest',
        title: 'Support Request',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-check',
        link : '/support-request',
        role: []
      },
      {
        id   : 'processManager',
        title: 'Process Manager',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-check',
        link : '/process-manager',
        role: []
      },
      {
        id   : 'ingestion&Provisioning',
        title: 'Ingestion & Provisioning',
        type : 'collapsable',
        icon : 'heroicons_outline:clipboard-check',
        role: [],
        children: [
          {
            id   : 'monitor',
            title: 'Monitor',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-check',
            link : '/ingestion-and-provisioning/monitor',
            role: []
          },
          {
            id   : 'flowManager',
            title: 'Flow Manager',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-check',
            link : '/ingestion-and-provisioning/flow-manager',
            role: []
          },
          {
            id   : 'connectionManager',
            title: 'Connection Manager',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-check',
            link : '/ingestion-and-provisioning/connection-manager',
            role: []
          },
          {
            id   : 'flowCustomized',
            title: 'Flow Customized',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-check',
            link : '/ingestion-and-provisioning/flow-customized',
            role: []
          },
        ]
      },
      {
        id   : 'hdfsTool',
        title: 'HDFS Tool',
        type : 'collapsable',
        icon : 'heroicons_outline:clipboard-check',
        role: [],
        children: [
          {
            id   : 'hdfsBrowser',
            title: 'HDFS Browser',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-check',
            link : '/hdfs-tool/hdfs-browser',
            role: []
          },
          {
            id   : 'exportfile',
            title: 'Export File',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-check',
            link : '/hdfs-tool/export-file',
            role: []
          },
        ]
      },
      {
        id   : 'etlTool',
        title: 'ETL Tool',
        type : 'collapsable',
        icon : 'heroicons_outline:clipboard-check',
        role: [],
        children: [
          {
            id   : 'lookupTable',
            title: 'Tra Cứu Table',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-check',
            link : '/etl-tool/lookup-table',
            role: []
          },
          {
            id   : 'job-management',
            title: 'ETL Job Lib',
            type : 'basic',
            icon : 'heroicons_outline:clipboard-check',
            link : '/etl-tool/job-management',
            role: []
          },
        ]
      },
      {
        id   : 'encryptTool',
        title: 'Encrypt Tool',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-check',
        link : '/encrypt-tool',
        role: []
      },
      {
        id   : 'uploadFile',
        title: 'Download/Upload File',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-check',
        link : '/upload-file',
        role: []
      },
      {
        id   : 'dbMakeFileConfig',
        title: 'DB Make File Config',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-check',
        link : '/config-make-file-db',
        role: []
      },

    ]
  },*!/
  {
    id      : 'setting',
    title   : 'Setting',
    type    : 'group',
    icon    : 'heroicons_outline:home',
    role: [],
    children: [
      {
        id   : 'user',
        title: 'User',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-check',
        link : '/setting/user',
        role: [AuthoritiesConstant.USER]
      },
      // {
      //   id   : 'authorization',
      //   title: 'Authorization',
      //   type : 'basic',
      //   icon : 'heroicons_outline:clipboard-check',
      //   link : '/setting/authorization',
      //   role: []
      // },
      {
        id   : 'permission',
        title: 'Permission',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-check',
        link : '/setting/permission',
        role: [AuthoritiesConstant.USER]
      },
      {
        id   : 'module',
        title: 'Module',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-check',
        link : '/setting/module',
        role: []
      },
      /!*{
        id   : 'tenant',
        title: 'Tenant',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-check',
        link : '/setting/tenant',
        role: []
      },*!/
    ]
  },
];*/
/*export const compactNavigation: FuseNavigationItem[] = [
    /!*{
        id      : 'dashboards',
        title   : 'Dashboards',
        tooltip : 'Dashboards',
        type    : 'basic',
        icon    : 'heroicons_outline:home',
        link : '/dashboards',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },*!/

  {
    id      : 'tenant',
    title   : 'Tenant',
    tooltip : 'Tenant',
    type    : 'basic',
    icon    : 'heroicons_outline:layout-corners-dashboard-1',
    link : 'setting/tenant',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },

    /!*{
        id      : 'datalakeManagement',
        title   : 'Datalake Management',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
    },
    {
        id      : 'utility',
        title   : 'Utility',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
    },*!/
    {
        id      : 'setting',
        title   : 'Setting',
        type    : 'aside',
        icon    : 'heroicons_outline:home',
    },
];*/
export const futuristicNavigation: FuseNavigationItem[] = [
  {
    id      : 'dashboards',
    title   : 'Dashboards',
    tooltip : 'Dashboards',
    type    : 'basic',
    icon    : 'heroicons_outline:home',
    link : '/dashboards',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id      : 'datalakeManagement',
    title   : 'Datalake Management',
    type    : 'aside',
    icon    : 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
  {
    id      : 'utility',
    title   : 'Utility',
    type    : 'aside',
    icon    : 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
  {
    id      : 'setting',
    title   : 'Setting',
    type    : 'aside',
    icon    : 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
];
export const horizontalNavigation: FuseNavigationItem[] = [
  {
    id      : 'dashboards',
    title   : 'Dashboards',
    tooltip : 'Dashboards',
    type    : 'basic',
    icon    : 'heroicons_outline:home',
    link : '/dashboards',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id      : 'datalakeManagement',
    title   : 'Datalake Management',
    type    : 'aside',
    icon    : 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
  {
    id      : 'utility',
    title   : 'Utility',
    type    : 'aside',
    icon    : 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
  {
    id      : 'setting',
    title   : 'Setting',
    type    : 'aside',
    icon    : 'heroicons_outline:home',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation

  },
];

/*Custom thin layout navigation*/
export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'resource',
    title: 'Resource monitor',
    tooltip: 'Resource',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie-outline',
    link: 'resource',
    children: []
  },
  {
    id      : 'tenant',
    title   : 'Tenant manager',
    type    : 'basic',
    icon    : 'heroicons_outline:layout-corners-dashboard-1',
    link : 'tenant',
    role: []
  },
  {
    id      : 'service',
    title   : 'Service management',
    tooltip : 'Service',
    type    : 'basic',
    icon    : 'heroicons_outline:briefcase',
    link : 'service',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id   : 'setting',
    title: 'Setting',
    type : 'basic',
    icon : 'heroicons_outline:cog',
    link : 'setting',
    role: []
  },
  /*{
    id   : 'permission',
    title: 'Permission',
    type : 'basic',
    icon : 'heroicons_outline:clipboard-check',
    link : '/setting/permission',
    role: []
  },
  {
    id      : 'test',
    title   : 'Test',
    type    : 'group',
    icon    : 'heroicons_outline:layout-corners-dashboard-1',
    link : '',
    children: [
      {
        id      : 'test1',
        title   : 'Test1',
        type    : 'collapsable',
        icon    : 'heroicons_outline:layout-corners-dashboard-1',
        link : '',
        children: [
          {
            id      : 'test2',
            title   : 'Test2',
            type    : 'basic',
            icon    : '',
            link : '',
          },
        ]
      },
    ] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },*/
];
export const compactNavigation: FuseNavigationItem[] = [
  {
    id: 'resource',
    title: 'Resource monitor',
    tooltip: 'Resource',
    type: 'basic',
    icon: 'heroicons_outline:chart-pie-outline',
    link: 'resource',
    children: []
  },
  {
    id      : 'tenant',
    title   : 'Tenant management',
    tooltip : 'Tenant',
    type    : 'basic',
    icon    : 'heroicons_outline:user-group',
    link : 'tenant',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id      : 'service',
    title   : 'Service management',
    tooltip : 'Service',
    type    : 'basic',
    icon    : 'heroicons_outline:briefcase',
    link : 'service',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id   : 'setting',
    title: 'Setting',
    tooltip : 'Setting',
    type : 'basic',
    icon : 'heroicons_outline:cog',
    link : 'setting',
    role: []
  },
  /*{
    id   : 'permission',
    title: 'Permission',
    tooltip : 'Permission',
    type : 'basic',
    icon : 'heroicons_outline:clipboard-check',
    link : '/setting/permission',
    role: []
  },
  {
    id      : 'test',
    title   : 'Test',
    tooltip : 'Tenant',
    type    : 'aside',
    icon    : 'heroicons_outline:layout-corners-dashboard-1',
    link : '',
    children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  }*/
];

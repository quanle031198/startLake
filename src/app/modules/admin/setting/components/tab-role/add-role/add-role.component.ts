import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from '@core/base.component';
import {Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SettingService} from "@modules/admin/setting/setting.service";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AddRoleComponent extends BaseComponent implements OnInit {
  formGroup = this.fb.group({
    code: [null, Validators.compose([Validators.required])],
    status: [null]
  });
  columnsToDisplay = [];
  listShowExpanded = [];
  listLevelChild: any;

  listAction: any[];
  listMenu: any[];
  raw: any;

  constructor(injector: Injector, private _router: Router, private _activatedRoute: ActivatedRoute, private settingService: SettingService) {
    super(injector);
  }

  ngOnInit(): void {
    /*this.settingService.getListMenu().subscribe((res) => {
      if(res.body.code === '00'){
        console.log(this.listMenu)
        this.listMenu = res.body.code;
      }
    });*/

    this.settingService.getListMenuAction().subscribe((res: any) => {
      if (res.body.code === '00') {
        const menus = res.body.data.menus.map(item => this.transformData(item));
        this.listMenu = [...menus];
        this.listAction = res.body.data.actions;
        const temp = this.listAction.map(item => item.code);
        this.columnsToDisplay = ['module', ...temp, 'action'];
      }
    });
  }

  transformData(inputData) {
    if (inputData?.actions?.length === 0) {
    }

    // Tạo một đối tượng mới để lưu trữ kết quả biến đổi
    const transformedData = {
      id: inputData.id,
      code: inputData.code,
    };

    // Duyệt qua các phần tử trong mảng 'actions'
    for (const action of inputData.actions) {
      // Dùng mã 'code' của mỗi action làm key và gán giá trị true cho nó
      transformedData[action.code] = true;
    }


    if (inputData?.subMenu?.length > 0) {
      transformedData['subMenu'] = [...inputData.subMenu.map(item => this.transformData(item))];
    }

    return transformedData;
  }

  getLevelChild(data: any, level): any {
    return data.map((item) => {
      const temp = {
        id: item.id,
        level: level,
        children: []
      };
      if (item.children?.length > 0) {
        temp.children = this.getLevelChild(item.children, level + 1);
      }
      ;
      return temp;
    });
  }

  backTabRole(): void {
    // this._router.navigate(['user'], {queryParams: {tab: this.selectedTab}});
    this._router.navigate(['setting']);
  }

  showChild(element): any {
    const checkIndex = this.listShowExpanded.indexOf(element.id);
    if (checkIndex > -1) {
      this.listShowExpanded.splice(checkIndex, 1);
    } else {
      this.listShowExpanded = [...this.listShowExpanded, element.id];
    }
    ;
    // this.expandedElement = this.expandedElement === element ? null : element;
  }

  saveRole(): void {
    const menus = [];
    this.listMenu.forEach((item: any) => {
      if (item?.subMenu?.length > 0) {
        item?.subMenu?.forEach((sub: any) => {
          const temp = {
            id: '',
            actionCodes: []
          };
          temp.id = sub.id;
          Object.keys(sub).forEach((key) => {
            if (this.columnsToDisplay.includes(key) && sub[key]) {
              temp.actionCodes = [...temp.actionCodes, key];
            }
          });
          menus.push(temp);
        });
      }
    });
    console.log(menus)
    const obj = {
      name: this.formGroup.value.code,
      code: this.formGroup.value.code,
      status: 1,
      menus: [...menus]
    };
    console.log(obj)
    this.settingService.addRole(obj).subscribe((res: any) => {
      if (res.body.code === '00') {
        this.showSnackBar('Thêm mới thành công', 'success');
      }
    });
  }

}

const DATA: any[] = [
  {
    id: 1,
    module: 'Module 1',
    create: true,
    update: true,
    read: true,
    delete: true,
    children: [
      {
        id: 2,
        module: 'Screen 1',
        create: true,
        update: true,
        read: false,
        delete: false,
        children: [
          {
            id: 78,
            module: 'Screen cháu',
            create: true,
            update: true,
            read: false,
            delete: false,
            children: [
              {
                id: 80,
                module: 'Screen chit',
                create: true,
                update: true,
                read: false,
                delete: false,
              }
            ]
          }
        ]
      },
      {
        id: 3,
        module: 'Screen 2',
        create: false,
        update: true,
        read: false,
        delete: true,
      },
      {
        id: 2,
        module: 'Screen 1',
        create: true,
        update: true,
        read: false,
        delete: false,
      },
      {
        id: 3,
        module: 'Screen 2',
        create: false,
        update: true,
        read: false,
        delete: true,
      },
      {
        id: 2,
        module: 'Screen 1',
        create: true,
        update: true,
        read: false,
        delete: false,
      },
      {
        id: 3,
        module: 'Screen 2',
        create: false,
        update: true,
        read: false,
        delete: true,
      },
      {
        id: 2,
        module: 'Screen 1',
        create: true,
        update: true,
        read: false,
        delete: false,
      },
      {
        id: 3,
        module: 'Screen 2',
        create: false,
        update: true,
        read: false,
        delete: true,
      },
      {
        id: 2,
        module: 'Screen 1',
        create: true,
        update: true,
        read: false,
        delete: false,
      },
      {
        id: 3,
        module: 'Screen 2',
        create: false,
        update: true,
        read: false,
        delete: true,
      },
      {
        id: 2,
        module: 'Screen 1',
        create: true,
        update: true,
        read: false,
        delete: false,
      },
      {
        id: 3,
        module: 'Screen 2',
        create: false,
        update: true,
        read: false,
        delete: true,
      },
      {
        id: 2,
        module: 'Screen 1',
        create: true,
        update: true,
        read: false,
        delete: false,
      },
      {
        id: 3,
        module: 'Screen 2',
        create: false,
        update: true,
        read: false,
        delete: true,
      }
    ]
  },
  {
    id: 4,
    module: 'Module 2',
    create: true,
    update: true,
    read: false,
    delete: true,
  },
  {
    id: 5,
    module: 'Module 3',
    create: true,
    update: true,
    read: false,
    delete: false,
    children: [
      {
        id: 6,
        module: 'api 1',
        create: true,
        update: true,
        read: false,
        delete: false,
      },
      {
        id: 7,
        module: 'api 2',
        create: false,
        update: true,
        read: false,
        delete: true,
      }
    ]
  },
  {
    id: 20,
    module: 'Module 20',
    create: true,
    update: true,
    read: false,
    delete: true,
  },
  {
    id: 58,
    module: 'TEST',
    create: true,
    update: true,
    read: false,
    delete: false,
    children: [
      {
        id: 6,
        module: 'api 1',
        create: true,
        update: true,
        read: false,
        delete: false,
      },
      {
        id: 7,
        module: 'api 2',
        create: false,
        update: true,
        read: false,
        delete: true,
      }
    ]
  },
];

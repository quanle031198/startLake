import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTableComponent} from './data-table.component';
import {MatTableModule} from "@angular/material/table";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [
        DataTableComponent,
        PaginationComponent
    ],
    exports: [
        DataTableComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        FormsModule,
        SharedModule
    ]
})
export class DataTableModule {
}

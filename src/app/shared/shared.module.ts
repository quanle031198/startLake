import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import { BreadcrumbComponent } from '../layout/common/breadcrumb/breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material.module';
import { DirectivesModule } from './directives/derectives.module';
import { TranslocoCoreModule } from '@core/transloco/transloco.module';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from './pipes/pipes.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    MatIconModule,
    TranslocoCoreModule,
    CommonModule,
    MatButtonModule
  ],
  declarations: [BreadcrumbComponent, ConfirmDialogComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    MaterialModule,
    DirectivesModule,
    MatIconModule,
    NgDynamicBreadcrumbModule,
    TranslocoCoreModule,
    PipesModule
  ],
})
export class SharedModule {}

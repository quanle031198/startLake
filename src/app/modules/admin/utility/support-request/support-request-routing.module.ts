import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SupportRequestComponent} from "./support-request.component";

const routes: Routes = [
    {
        path: '',
        component: SupportRequestComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRequestRoutingModule { }

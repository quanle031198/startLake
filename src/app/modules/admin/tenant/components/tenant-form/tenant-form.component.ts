import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../../services/tenant.service';
import { Observable, map } from 'rxjs';
import { OptionModel } from '@shared/models/option-model';
import { EStatusTenant } from '../../enums/status-tenant.enum';

@Component({
  selector: 'app-tenant-form',
  templateUrl: './tenant-form.component.html',
  styles: [],
})
export class TenantFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  partnerList$: Observable<OptionModel<string>[]>;
  servicePlanList$: Observable<OptionModel<string>[]>;
  ownerList$: Observable<OptionModel<string>[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TenantFormComponent>,
    private tenantService: TenantService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.partnerList$ = this.tenantService.findPartner().pipe(
      map((x: any) =>
        x.data.map((el: any) => ({
          ...el,
          value: el.id,
          label: el.name,
        }))
      )
    );
    this.servicePlanList$ = this.tenantService.findServicePlan().pipe(
      map((x: any) =>
        x.data.map((el: any) => ({
          ...el,
          value: el.id,
          label: el.name,
        }))
      )
    );
    this.getOwnerList();
  }
  getOwnerList() {
    this.ownerList$ = this.tenantService.findOwnerList({ pageSize: 99 }).pipe(
      map((x: any) =>
        x.data.map((el: any) => ({
          ...el,
          value: el.id,
          label: el.username,
        }))
      )
    );
  }
  buildForm() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      partnerId: [null, Validators.compose([Validators.required])],
      partnerCode: [null, Validators.compose([Validators.required])],
      ownerId: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      servicePlanId: [null, Validators.compose([Validators.required])],
      // plan: [null, Validators.compose([Validators.required])],
    });
  }
  save() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].markAsDirty();
        this.form.controls[key].markAllAsTouched();
      });
      return;
    } else {
      this.tenantService
        .create({ ...this.form.getRawValue(), status: EStatusTenant.ACTIVE })
        .subscribe((x) => {
          this.dialogRef.close({ create: true });
        });
    }
  }
}

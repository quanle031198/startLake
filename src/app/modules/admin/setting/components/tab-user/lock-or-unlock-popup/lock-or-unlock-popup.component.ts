import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-lock-or-unlock-popup',
  templateUrl: './lock-or-unlock-popup.component.html',
  styleUrls: ['./lock-or-unlock-popup.component.scss']
})
export class LockOrUnlockPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LockOrUnlockPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }

}

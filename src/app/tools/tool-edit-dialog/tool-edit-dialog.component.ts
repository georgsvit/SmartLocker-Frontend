import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tool } from 'src/app/domain/tool';
import { ToolDTO } from 'src/app/dto/tool-dto';

@Component({
  selector: 'tool-edit-dialog-comp',
  templateUrl: './tool-edit-dialog.component.html',
  styleUrls: ['./tool-edit-dialog.component.css']
})
export class ToolEditDialogComponent {

  public error: string

  constructor(
    public dialogRef: MatDialogRef<ToolEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tool
  ) {
    if (this.data == null) {
      this.data = new Tool("", "", "", "", 0, "", "", "")
    } else {
      data.serviceBook.msBetweenServices /= 86400
      const date = new Date(this.data.serviceBook.lastServiceDate)
      this.data.serviceBook.lastServiceDate = this.data.serviceBook.lastServiceDate.substring(0, this.data.serviceBook.lastServiceDate.indexOf('T'))
    }
  }

  public onCreate(): void {
    if (this.data.name != "") {
        this.dialogRef.close(new ToolDTO(this.data))
    } else {
        this.error = "Invalid input"
    }        
  }
}

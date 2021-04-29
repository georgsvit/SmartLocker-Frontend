import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tool } from 'src/app/domain/tool';
import { ToolDTO } from 'src/app/dto/tool-dto';
import { ToolsService } from 'src/app/services/tools.service';
import { ToolEditDialogComponent } from '../tool-edit-dialog/tool-edit-dialog.component';

@Component({
  selector: 'tool-details-comp',
  templateUrl: './tool-details.component.html',
  styleUrls: ['./tool-details.component.css']
})
export class ToolDetailsComponent implements OnInit {

  public tool: Tool

  constructor(
    public dialogRef: MatDialogRef<ToolDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tool,
    private toolsService: ToolsService,
    private editDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tool = this.data
  }

  public requestService(): void {
    this.toolsService.requestService(this.tool.id)
    this.dialogRef.close(true)
  }

  public timeSpan(ms: number): string {
    return String(Math.ceil(ms / 1000 / 60 / 60 / 24))
  }

  public isServiceNeeded(tool: Tool): boolean {
    return tool.serviceBook.usages >= tool.serviceBook.maxUsages || (Date.now().valueOf() - new Date(tool.serviceBook.lastServiceDate).valueOf() >= tool.serviceBook.msBetweenServices) 
  }

  public onDelete(): void {
    this.toolsService.deleteTool(this.tool.id)
    this.dialogRef.close(true)
  }

  public onEdit(): void {
    const dialogRef = this.editDialog.open(ToolEditDialogComponent, { data: this.data })
    
    dialogRef.afterClosed().subscribe((dto: ToolDTO) => {
      console.log(dto)
      dto.msBetweenServices *= 86400
      this.toolsService.edit(this.data, dto)

      this.dialogRef.close(true)
    })
  }
}

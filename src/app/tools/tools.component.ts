import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tool } from '../domain/tool';
import { ToolDTO } from '../dto/tool-dto';
import { ToolsService } from '../services/tools.service';
import { ToolDetailsComponent } from './tool-details/tool-details.component';
import { ToolEditDialogComponent } from './tool-edit-dialog/tool-edit-dialog.component';

@Component({
  selector: 'tools-comp',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Tool>;
  dataSource = new MatTableDataSource<Tool>()

  displayedColumns = ['name', 'accessLevel', 'id', 'serviceState', 'location'];

  ngOnInit(): void {
    this.reloadLockers()
  }

  constructor(
    private toolsService: ToolsService,
    private router: Router,
    private detailsDialog: MatDialog
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
  public onSelect(tool: Tool) {
    this.router.navigate(
      ['/tool/details', tool.id],   
      {
        state: tool
      }
    )
  }

  private isServiceNeeded(tool: Tool): boolean {
    return tool.serviceBook.usages >= tool.serviceBook.maxUsages || (Date.now().valueOf() - new Date(tool.serviceBook.lastServiceDate).valueOf() >= tool.serviceBook.msBetweenServices) 
  }

  private reloadLockers(): void {
    this.toolsService.getAllToolsAsync()
      .then(list => {
        this.dataSource.data = list
      })    
  }

  public openDetailsDialog(tool: Tool): void {
    const dialogRef = this.detailsDialog.open(ToolDetailsComponent, { data: tool })
    
    dialogRef.afterClosed().subscribe(_ => {
      setTimeout(() => {
        this.reloadLockers()
      }, 200)
    })
  }

  public openCreateDialog(): void {
    const dialogRef = this.detailsDialog.open(ToolEditDialogComponent, { data: null })
    
    dialogRef.afterClosed().subscribe((dto: ToolDTO) => {
      console.log(dto)
      dto.msBetweenServices *= 86400

      this.toolsService.createTool(dto)

      setTimeout(() => {
        this.reloadLockers()
      }, 200)
    })
  }
}

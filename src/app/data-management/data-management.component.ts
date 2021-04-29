import { Component, OnInit } from '@angular/core';
import { DataManagementService } from '../services/data-management.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'data-management-comp',
  templateUrl: './data-management.component.html',
  styleUrls: ['./data-management.component.css']
})
export class DataManagementComponent implements OnInit {

  public file: File

  constructor(
    private dataService: DataManagementService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void { }

  public onFileSelect(event): void {
    this.file = event.target.files[0]    
  }
  
  public async onLoadAsync(): Promise<void> {    
    await this.dataService.uploadDataAsync(this.file)
    this.notificationService.displayMessage("File was uploaded")
  }

  public onExport(): void {
    this.dataService.downloadData()  

    this.notificationService.displayMessage("Downloading will start in a few seconds")
  }

  public onBackup(): void {
    this.dataService.downloadBackup()

    this.notificationService.displayMessage("Downloading will start in a few seconds")
  }
}

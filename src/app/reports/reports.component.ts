import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'reports-comp',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(
    private reportsService: ReportsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void { }

  public onAccountingReport(): void {
    this.reportsService.downloadAccountingReport()

    this.notify()
  }

  public onServiceReport(): void {
    this.reportsService.downloadServiceReport()

    this.notify()
  }

  public onViolationReport(): void {
    this.reportsService.downloadViolationReport()

    this.notify()
  }

  private notify(): void {
    this.notificationService.displayMessage("Downloading will start in a few seconds")
  }
}

import { Component, OnInit } from '@angular/core';
import { LanguageSelectorService } from '../services/language-selector-service';
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
    private notificationService: NotificationService,
    private languageService: LanguageSelectorService
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
    if (this.languageService.getLanguage() == "ua") {          
      this.notificationService.displayMessage("Завантаження почнеться за мить")
    } else {        
      this.notificationService.displayMessage("Downloading will start in a few seconds")
    }
  }
}

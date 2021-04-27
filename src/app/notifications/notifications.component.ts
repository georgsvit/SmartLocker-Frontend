import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NotificationItem } from '../domain/notification-item';
import { ServiceNote } from '../domain/service-note';
import { ViolationNote } from '../domain/violation-note';
import { LanguageSelectorService } from '../services/language-selector-service';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'notifications-comp',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<NotificationItem>;
  dataSource = new MatTableDataSource<NotificationItem>();

  displayedColumns = ['content', 'date', 'type', 'id'];

  ngOnInit(): void {
    this.reloadData()
  }

  private reloadData(): void {
    let service = ""
    let violation = ""

    if (this.languageService.getLanguage() == "ua") {      
      service = "Сервіс"
      violation = "Порушення"
    } else {
      service = "Service"
      violation = "Violation"
    }
    

    this.notificationService.getAllAsync()
      .then(response => {

        console.log(service)
        console.log(violation)
        let list = response.serviceNotes.map(
          (note) => {
            return new NotificationItem(note.id, service, this.getServiceNoteContent(note), new Date(note.date).toLocaleString())
        })

        console.log(list)
        let violationNotes = response.violationNotes.map(
          (note) => {
            return new NotificationItem(note.id, violation, this.getViolationNoteContent(note), new Date(note.date).toLocaleString())
        })
        console.log(list)

        this.dataSource.data = list.concat(violationNotes)
      })    
  }

  constructor(
    private notificationService: NotificationsService,
    private languageService: LanguageSelectorService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  public onView(id: string): void {
    this.notificationService.setViewed(id)
      .then(
        () => this.reloadData()
      )
  }

  private getServiceNoteContent(note: ServiceNote): string {
    if (this.languageService.getLanguage() == "ua") {      
      if (note.cost == 0) {
        return `${note.tool.name} було передано до сервісного центру.`;
      } else {
          return `${note.tool.name} було обслуговано ${note.user.firstName} ${note.user.lastName}. Вартість: ${note.cost} $`;
      }
    } else {
      if (note.cost == 0) {
        return `${note.tool.name} was taken to service`;
      } else {
          return `${note.tool.name} was maintened by ${note.user.firstName} ${note.user.lastName}. Cost: ${note.cost} $`;
      }    
    }      
  }

  private getViolationNoteContent(note: ViolationNote): string {
    if (this.languageService.getLanguage() == "ua") {          
      return `${note.tool.name} було узято ${note.user.firstName} ${note.user.lastName} з комірки ${note.locker.login}`;
    } else {
      return `${note.tool.name} was taken by ${note.user.firstName} ${note.user.lastName} from ${note.locker.login}`;
    }
  }
}

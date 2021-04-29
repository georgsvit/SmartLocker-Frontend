import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NotificationItem } from '../domain/notification-item';
import { ServiceNote } from '../domain/service-note';
import { ViolationNote } from '../domain/violation-note';
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
    this.notificationService.getAllAsync()
      .then(response => {

        let list = response.serviceNotes.map(
          (note) => {
            return new NotificationItem(note.id, "Service", this.getServiceNoteContent(note), new Date(note.date).toLocaleString())
        })

        let violationNotes = response.violationNotes.map(
          (note) => {
            return new NotificationItem(note.id, "Violation", this.getViolationNoteContent(note), new Date(note.date).toLocaleString())
        })

        this.dataSource.data = list.concat(violationNotes)
      })    
  }

  constructor(
    private notificationService: NotificationsService
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
    if (note.cost == 0) {
        return `${note.tool.name} was taken to service`;
    } else {
        return `${note.tool.name} was maintened by ${note.user.firstName} ${note.user.lastName}. Cost: ${note.cost} $`;
    }
  }

  private getViolationNoteContent(note: ViolationNote): string {
    return `${note.tool.name} was taken by ${note.user.firstName} ${note.user.lastName} from ${note.locker.login}`;
  }
}

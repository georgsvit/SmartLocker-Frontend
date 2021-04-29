import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../domain/user';
import { UsersService } from '../services/users.service';
import { UserDetailsDialogComponent } from './user-details-dialog/user-details-dialog.component';
import { UserEditDialogComponent } from './user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'users-comp',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource = new MatTableDataSource<User>()

  displayedColumns = ['id', 'login', 'firstName', 'lastName', 'role', 'accessLevel', 'tools'];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.reloadUsers()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  private reloadUsers(): void {
    this.usersService.getAllUsersAsync()
      .then(list => {
        this.dataSource.data = list
      })    
  }

  public openDetailsDialog(user: User): void {
    const dialogRef = this.dialog.open(UserDetailsDialogComponent, { data: user })
    
    dialogRef.afterClosed().subscribe(_ => {
      setTimeout(() => {
        this.reloadUsers()
      }, 200)
    })
  }

  public openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, { data: null })
    
    dialogRef.afterClosed().subscribe((user: User) => {
      this.usersService.registerUser(user)

      setTimeout(() => {
        this.reloadUsers()
      }, 200)
    })
  }
}

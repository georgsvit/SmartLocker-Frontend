import { Component, OnInit } from '@angular/core';
import { Locker } from '../domain/locker';
import { LockersService } from '../services/lockers.service';
import { MatDialog } from "@angular/material/dialog";
import { LockerEditDialog } from './locker-edit-dialog';
import { NotificationService } from '../services/notification.service';
import { LanguageSelectorService } from '../services/language-selector-service';

@Component({
  selector: 'lockers-comp',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.css']
})
export class LockersComponent implements OnInit {
  public lockers: Locker[]
  public errorMessage: string
  public panelExpanded: boolean[]

  constructor(
    private lockersService: LockersService,
    private notificationService: NotificationService,
    public editDialog: MatDialog,
    private languageService: LanguageSelectorService
  ) {}

  ngOnInit(): void {
    this.reloadLockers()
  }

  private reloadLockers(): void {
    this.lockersService.getAllLockersAsync()
      .then(list => {
        this.lockers = list
        this.panelExpanded = list.map(() => false)
      })    
  }

  public changePanelState(index: number, state: boolean): void {
    this.panelExpanded[index] = state
  }

  public async blockLocker(index: number): Promise<void> {
    if (!this.lockers[index].isBlocked) {
      await this.lockersService.blockLockerAsync(this.lockers[index].id)
      this.reloadLockers()
    }
  }

  public async unblockLocker(index: number): Promise<void> {
    if (this.lockers[index].isBlocked) {
      await this.lockersService.unblockLockerAsync(this.lockers[index].id)
      this.reloadLockers()
    }
  }

  public async createLocker(login: string): Promise<void> {
    await this.lockersService.createLocker(login)
    this.reloadLockers()
  }

  public async deleteLocker(id: string): Promise<void> {
    const locker = this.lockers.find(l => l.id == id)
    console.log(locker)
    if (locker.tools.length > 0) {
      if (this.languageService.getLanguage() == "ua") {      
        this.notificationService.displayMessage("Дані не можуть бути видалені")
      } else {          
        this.notificationService.displayMessage("Locker can`t be removed")
      }      
      return
    }
    await this.lockersService.deleteLocker(id)
    this.reloadLockers()
  }

  public async editLocker(locker: Locker): Promise<void> {
    await this.lockersService.editLocker(locker)
    this.reloadLockers()
  }

  public openCreateDialog(): void {
    const dialogRef = this.editDialog.open(LockerEditDialog, { data: { login: "" }})

    dialogRef.afterClosed().subscribe(login => {
      this.createLocker(login)
    })
  }

  public openEditDialog(locker: Locker): void {
    const dialogRef = this.editDialog.open(LockerEditDialog, { data: { login: locker.login }})

    dialogRef.afterClosed().subscribe(login => {
      locker.login = login
      this.editLocker(locker)
    })
  }
}

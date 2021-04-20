// General
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { LayoutModule } from '@angular/cdk/layout';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from "@angular/material/tabs";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LockersComponent } from './lockers/lockers.component';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { LockerEditDialog } from './lockers/locker-edit-dialog';
import { DataManagementComponent } from './data-management/data-management.component';
import { ToolsComponent } from './tools/tools.component';
import { ToolDetailsComponent } from './tools/tool-details/tool-details.component';
import { ToolEditDialogComponent } from './tools/tool-edit-dialog/tool-edit-dialog.component';
import { UsersComponent } from './users/users.component';
import { UserEditDialogComponent } from './users/user-edit-dialog/user-edit-dialog.component';
import { UserDetailsDialogComponent } from './users/user-details-dialog/user-details-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LandingComponent,
    LockersComponent,
    LockerEditDialog,
    DataManagementComponent,
    ToolsComponent,
    ToolDetailsComponent,
    ToolEditDialogComponent,
    UsersComponent,
    UserEditDialogComponent,
    UserDetailsDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatGridListModule,
    FormsModule,
    LayoutModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

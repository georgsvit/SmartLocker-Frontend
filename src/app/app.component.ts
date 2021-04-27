import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from './domain/token';
import { LanguageSelectorService } from './services/language-selector-service';
import { UserManagerService } from './services/user-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public token: Token;

  title = 'SmartLocker-Frontend';  

  constructor(
    private userManagerService: UserManagerService,
    private languageService: LanguageSelectorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userManagerService.getTokenUpdateStream()
      .subscribe(
        {
          next: () => {
            this.token = this.userManagerService.getToken();
          }
        }
      )
  }

  public async logOutAsync(): Promise<void> {
    this.userManagerService.removeToken();
    await this.router.navigate(['/**']);
  }

  public onLanguageChange(language: string): void {
    this.languageService.setLanguage(language)
  }
}

import { Component } from '@angular/core';
//import { HttpEvent, HttpEventType } from '@angular/common/http';  // Can be used for listening for http events
                                                                    // using Angular 5. See below.
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(                             // Fire the service's http request here.
        (response) => {                       // Use (response: HttpEvent) to capture http events.
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();   // Wrap authService call HERE for use in template.
                                                 // Don't use the service explicitly in the template! 
                                                 // Wrapping will allow AOT compile!.
  }
}



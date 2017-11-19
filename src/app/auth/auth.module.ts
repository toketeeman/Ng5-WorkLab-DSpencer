import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,    // Needed here because the declared components use ngModel from FormsModule,
                   // but the components themselves don't individually import the FormsModule.
    AuthRoutingModule
  ]

})
export class AuthModule {}


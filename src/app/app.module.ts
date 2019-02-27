import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { CloudFunctionsService } from './services/cloud-functions.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BackImgDirective } from './back-img.directive';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './character/character.component';
import { NewComponent } from './new/new.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkNewComponent } from './work-new/work-new.component';
import { CategoryNewComponent } from './category-new/category-new.component';
import { CategoryComponent } from './category/category.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'work/new',
    component: WorkNewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'category/new',
    component: CategoryNewComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: ':id',
    component: CharacterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BackImgDirective,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CharacterComponent,
    NewComponent,
    LoginViewComponent,
    SettingsComponent,
    ProfileComponent,
    WorkNewComponent,
    CategoryNewComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [CloudFunctionsService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents: [LoginViewComponent]
})
export class AppModule {}

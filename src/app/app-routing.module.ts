import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllPostComponent } from './post/all-post/all-post.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard.service';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { TestComponent } from './test/test/test.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'post', component: AllPostComponent, canActivate: [authGuard] },
  { path: 'post/new', component: NewPostComponent, canActivate: [authGuard] },
  { path: 'subscribers', component: SubscribersComponent, canActivate: [authGuard] },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

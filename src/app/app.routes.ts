import { Routes, RouterModule } from '@angular/router';

import { PostsListComponent } from './posts-list.component';
import { PostsFormComponent } from './posts-form.component';
import { ReactiveFormComponent } from './reactive-form.component';
import { UsersListComponent } from './users/users-list.component';
import { UserRegistrationComponent } from './users/users-registration.component';
import { UsersSignInComponent } from './users/users-login.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'post-list', pathMatch: 'full' },
    { path: 'post-list', component: PostsListComponent },
    { path: 'post-form', component: PostsFormComponent},
    { path: 'reactive-form', component: ReactiveFormComponent },
    { path: 'users-list', component: UsersListComponent },
    { path: 'users-registration', component: UserRegistrationComponent },
    { path: 'users-sign-in', component: UsersSignInComponent }
];

export const routing = RouterModule.forRoot(appRoutes);


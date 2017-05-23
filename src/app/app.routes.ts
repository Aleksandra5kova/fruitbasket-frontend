import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './users/users-list.component';
import { UserRegistrationComponent } from './users/users-registration.component';
import { UsersSignInComponent } from './users/users-login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { OrdersComponent } from './orders/orders.component';

import { CanActivateViaAuthGuard } from './users/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'users-sign-in', pathMatch: 'full' },
    { path: 'users-registration', component: UserRegistrationComponent },
    { path: 'users-sign-in', component: UsersSignInComponent },
    { path: 'welcome', component: WelcomeComponent, canActivate: [CanActivateViaAuthGuard]},
    { path: 'users-list', component: UsersListComponent, canActivate: [CanActivateViaAuthGuard]},
    { path: 'orders', component: OrdersComponent, canActivate: [CanActivateViaAuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);


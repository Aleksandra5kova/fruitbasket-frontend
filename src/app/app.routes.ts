import { Routes, RouterModule } from '@angular/router';

import { PostsListComponent } from './posts-list.component';
import { PostsFormComponent } from './posts-form.component';
import { ReactiveFormComponent } from './reactive-form.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'post-list', pathMatch: 'full' },
    { path: 'post-list', component: PostsListComponent },
    { path: 'post-form', component: PostsFormComponent},
    { path: 'reactive-form', component: ReactiveFormComponent }
];

export const routing = RouterModule.forRoot(appRoutes);


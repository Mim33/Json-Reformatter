import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { LocationsComponent } from './locations/locations.component';

const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'posts/:id', component: PostComponent},
  {path: 'locations', component: LocationsComponent},
  {path: 'locations/:id', component: LocationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

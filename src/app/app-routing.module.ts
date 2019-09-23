import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';

const routes: Routes = [
  { path: 'browse', component: BrowseComponent },
  { path: 'rsvp/:id', component: RsvpComponent },
  { path: '**', component: BrowseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

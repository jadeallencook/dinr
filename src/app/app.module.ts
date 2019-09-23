import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { DinnerComponent } from './pages/dinner/dinner.component';
import { RsvpComponent } from './pages/rsvp/rsvp.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { FiltersComponent } from './components/filters/filters.component';
import { FeaturedComponent } from './components/featured/featured.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    BrowseComponent,
    DinnerComponent,
    RsvpComponent,
    ProfileComponent,
    SettingsComponent,
    PageNotFoundComponent,
    SearchComponent,
    FiltersComponent,
    FeaturedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

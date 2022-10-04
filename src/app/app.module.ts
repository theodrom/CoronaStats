import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoronaStatsListComponent } from './statistics/stats-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CountryStatsComponent } from './statistics/country-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    CoronaStatsListComponent,
    CountryStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      {path: 'statistics', component: CoronaStatsListComponent},
      {path: 'statistics/:country', component: CountryStatsComponent},
      {path: '', redirectTo: 'statistics', pathMatch: 'full'},
      {path: '**', redirectTo: 'statistics', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

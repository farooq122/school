import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotifierModule, NotifierOptions } from "angular-notifier";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { StaffComponent } from './staff/staff.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffService } from './_services/staff.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BaseUrlInterceptor } from './_helpers/baseURL.interceptor';
import { NotifyService } from './_services/notify.service';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';
import { DateNativeAdapter } from './_helpers/date-native.adapter';
import { DatePipe } from '@angular/common';
import { NumDirective } from './_helpers/num.directive';
import { CustomDateParserFormatter } from './_helpers/date-parser';
/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StaffComponent,
    SidebarComponent,
    DashboardComponent,
    FooterComponent,
    StaffDetailComponent,
    NumDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: NgbDateAdapter, useClass: DateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},
      NotifyService,
    StaffService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

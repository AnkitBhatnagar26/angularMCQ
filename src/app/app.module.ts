import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { McqComponent } from './components/mcq/mcq.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { CaptionCarouselComponent } from './components/caption-carousel/caption-carousel.component';
import { FinishTestComponent } from './components/finish-test/finish-test.component';
import { UserDetailsModalComponent } from './components/user-details-modal/user-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    McqComponent,
    TestComponentComponent,
    CaptionCarouselComponent,
    FinishTestComponent,
    UserDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ToastrModule.forRoot(), // ToastrModule added,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

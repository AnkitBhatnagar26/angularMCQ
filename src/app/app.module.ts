import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { McqComponent } from './components/mcq/mcq.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { CaptionCarouselComponent } from './components/caption-carousel/caption-carousel.component';
import { FinishTestComponent } from './components/finish-test/finish-test.component';

@NgModule({
  declarations: [
    AppComponent,
    McqComponent,
    TestComponentComponent,
    CaptionCarouselComponent,
    FinishTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

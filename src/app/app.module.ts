import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { McqComponent } from './mcq/mcq.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { CaptionCarouselComponent } from './caption-carousel/caption-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    McqComponent,
    TestComponentComponent,
    CaptionCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

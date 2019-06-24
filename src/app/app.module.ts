import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

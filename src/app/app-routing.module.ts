import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { McqComponent } from './mcq/mcq.component';
import { TestComponentComponent } from './test-component/test-component.component';

const routes: Routes = [
  { path: '', component: McqComponent},
  { path: 'startTest', component: TestComponentComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

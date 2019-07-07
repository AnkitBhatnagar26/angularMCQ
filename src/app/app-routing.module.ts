import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { McqComponent } from './components/mcq/mcq.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { FinishTestComponent } from './components/finish-test/finish-test.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: McqComponent },
  { path: 'startTest', component: TestComponentComponent, canActivate: [AuthGuard] },
  { path: 'finishTest', component: FinishTestComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

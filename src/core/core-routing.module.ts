import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';
// import { MaterialNavbarComponent } from './material-navbar/material-navbar.component';


const routes: Routes = [
    // { path: 'navbar', component: MaterialNavbarComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
    ],
    declarations: []
})
export class CoreRoutingModule { }

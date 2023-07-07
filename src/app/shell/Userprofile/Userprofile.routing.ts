import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UserSegmentComponent } from './User-segment/User-segment.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {
    path: 'list',
    data: { mode: 'list' , breadcrumb:'Userprofile / List Userprofile'},
    component: UserprofileComponent,
    canActivate: [AuthGuard]
},
// {
//     path: 'viewuser/:userId',
//     data: { mode: 'view' },
//     component: UserDetailComponent,
//     resolve: {
//         currency: CurrencyListResolver,
//         inventory: GlobalInventoryListResolver,
//         scores: ScoreListResolver,
//         bundle: BundleListResolver
//     },
//     canActivate: [AuthGuard]
// },
{
    path: 'segment',
    data: { mode: 'list' ,breadcrumb:'Userprofile / User Segment'},
    component: UserSegmentComponent,
    canActivate: [AuthGuard]
},
{
    path: '',
    data: { mode: 'list' },
    redirectTo: 'list',
    pathMatch: 'full'
}
];

export const UserprofileRoutes = RouterModule.forChild(routes);

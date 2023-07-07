import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { DashboardComponent } from './common/Dashboard/Dashboard.component';
import { HomeComponent } from './common/home/home.component';
import { ListUserAccountComponent } from './common/list-user-account/list-user-account.component';
import { ShellComponent } from './shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'userprofile',
        data: { title: 'Userprofile'},
        loadChildren: () => import('../shell/Userprofile/Userprofile.module').then(m => m.UserprofileModule),
      },
      {
        path: 'dashboard',
        data: { title: 'Dashboard', breadcrumb: 'Dashboard' },
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manageAccount',
        data: { title: 'Account Management',breadcrumb: 'Account Management' },
        component: ListUserAccountComponent,
        canActivate: [AuthGuard]
    },

    ]
  },
  {
    path: 'home',
    data: { title: 'JetSynthesys', breadcrumb: 'Home' },
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];

export const ShellRoutes = RouterModule.forChild(routes);

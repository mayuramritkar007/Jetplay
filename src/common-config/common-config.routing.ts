import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './SignIn/SignIn.component';

const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent,
},
// {
//     path: 'register',
//     component: RegisterComponent,
// },
// {
//     path: 'verify',
//     component: AccountVerificationComponent,
// }
];

export const CommonConfigRoutes = RouterModule.forChild(routes);

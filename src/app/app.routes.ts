import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { InformesComponent } from './pages/informes/informes.component';
import { AlianzasComponent } from './pages/alianzas/alianzas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ServiciosABMComponent } from './admin/servicios-abm/servicios-abm.component';
import { NoticiasABMComponent } from './admin/noticias-abm/noticias-abm.component';
import { InformesABMComponent } from './admin/informes-abm/informes-abm.component';
import { AlianzasABMComponent } from './admin/alianzas-abm/alianzas-abm.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'informes', component: InformesComponent },
  { path: 'alianzas', component: AlianzasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/servicios', component: ServiciosABMComponent, canActivate: [AuthGuard] },
  { path: 'admin/noticias', component: NoticiasABMComponent, canActivate: [AuthGuard] },
  { path: 'admin/informes', component: InformesABMComponent, canActivate: [AuthGuard] },
  { path: 'admin/alianzas', component: AlianzasABMComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

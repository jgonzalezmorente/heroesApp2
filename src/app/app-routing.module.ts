import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { authGuardCanActivate, authGuardCanMatch } from './auth/guards/auth/auth.guard';
import { publicGuardCanActivate, publicGuardCanMatch } from './auth/guards/auth/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule ),
    canActivate: [publicGuardCanActivate ],
    canMatch: [ publicGuardCanMatch ],
  },
  {
    path: 'heroes',
    loadChildren: () => import( './heroes/heroes.module' ).then( m => m.HeroesModule ),
    canActivate: [ authGuardCanActivate ],
    canMatch: [ authGuardCanMatch ]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

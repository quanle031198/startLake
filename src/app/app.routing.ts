import {Route} from '@angular/router';
import {AuthGuard} from 'app/core/auth/guards/auth.guard';
import {NoAuthGuard} from 'app/core/auth/guards/noAuth.guard';
import {LayoutComponent} from 'app/layout/layout.component';
import {InitialDataResolver} from 'app/app.resolvers';
import {PropertyResolver} from '@shared/services';
import { PermissionGuard } from '@core/auth/guards/permission.guard';
import { AuthoritiesConstant } from './authorities.constant';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'tenant'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
            }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule),
                canActivate: [AuthGuard],
            },
            {
                path: 'unlock-session',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
            }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'home',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
            props: PropertyResolver,
        },
        data: {
            breadcrumb: {
                label: 'Home',
                url: '/'
            }
        },
        children: [
            {
                path: 'example',
                loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule),
                data: {breadcrumb: {label: 'example', url: '/'}}
            },
            {
                path: 'dashboards',
                loadChildren: () => import('app/modules/admin/dashboards/dashboards.module').then(m => m.DashboardsModule),
                data: {breadcrumb: {label: 'Dashboards', url: 'dashboards'}}
            },
            // Tenant
          {
            path: 'tenant',
            loadChildren: () => import('app/modules/admin/tenant/tenant.module').then(m => m.TenantModule),
            data: {
              breadcrumb: { label: 'Tenant', url: 'tenant' },
              permissions: [AuthoritiesConstant.TENANT],
            },
          },
          {
            path: 'setting',
            loadChildren: () => import('app/modules/admin/setting/setting.module').then(m => m.SettingModule),
            data: {breadcrumb: {label: 'Setting', url: 'setting'}}
          }
        ]
    }
];

import { Routes } from "@angular/router";
import { AdminDashboardLayout } from './layouts/admin-dashboard-layout/admin-dashboard-layout';
import { ProductAdmin } from "./pages/product-admin/product-admin";
import { ProductsAdmin } from "./pages/products-admin/products-admin";
import { IsAdminGuard } from "@/auth/guards/is-admin.guard";

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayout,
    canMatch:[
      IsAdminGuard
    ],
    children:[
      {
        path:'products',
        component: ProductsAdmin
      },
      {
        path:'products/:id',
        component: ProductAdmin
      },
      {
        path: '**',
        redirectTo: 'products'
      }
    ]
  }
];

export default adminDashboardRoutes;

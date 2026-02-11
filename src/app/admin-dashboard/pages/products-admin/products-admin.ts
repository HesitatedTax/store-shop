import { Component, inject, signal } from '@angular/core';
import { ProductTable } from "@/products/components/product-table/product-table";
import { ProductsService } from '@/products/services/products.service';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from "@/shared/components/pagination/pagination";

@Component({
  selector: 'app-products-admin',
  imports: [ProductTable, Pagination],
  templateUrl: './products-admin.html',
})
export class ProductsAdmin {
  productsServices = inject(ProductsService);
  paginationService = inject(PaginationService)
  productsPerPage = signal(10);

  productsResource = rxResource({
    params:()=> ({page:this.paginationService.currentPage() - 1,
      limit: this.productsPerPage()
    }),
    stream:({params}) => {
      return this.productsServices.getProducts({
        offset: params.page * 9 ,
        limit: params.limit
      });
    },
  });



}


import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource} from '@angular/core/rxjs-interop';
import { Pagination } from "@/shared/components/pagination/pagination";
import { PaginationService } from '@/shared/components/pagination/pagination.service';


// import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage { 

  productsServices = inject(ProductsService);
  paginationService = inject(PaginationService)

  productsResource = rxResource({
    params:()=> ({page:this.paginationService.currentPage() - 1}),
    stream:({params}) => {
      return this.productsServices.getProducts({ 
        offset: params.page * 9 ,

      });
    },
  });


}

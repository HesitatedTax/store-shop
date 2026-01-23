
import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

// import { ProductCard } from "../../components/product-card/product-card";

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage { 

  productsServices = inject(ProductsService);

  productsResource = rxResource({
    params:()=> ({}),
    stream:({params}) => {
      return this.productsServices.getProducts({ });
    },
  });


}

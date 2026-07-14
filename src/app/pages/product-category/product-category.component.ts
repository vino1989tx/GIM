import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../../data/mock-products';
import type { Product, ProductCategory } from '../../models/product.model';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnDestroy {
  category: ProductCategory | undefined;
  products: Product[] = [];
  allCategories = PRODUCT_CATEGORIES;
  categoryBanner = '/assets/GIM_Nextgen_2026/company-overview.jpg';
  categoryBannerPosition = 'center';
  private categorySubscription: Subscription;

  constructor(private route: ActivatedRoute) {
    this.categorySubscription = this.route.paramMap.subscribe(params => {
      const slug = params.get('category') ?? '';
      this.category = PRODUCT_CATEGORIES.find(cat => cat.id === slug);
      this.products = PRODUCTS.filter(product => product.category === slug);
      this.categoryBanner = this.category?.image || '/assets/GIM_Nextgen_2026/company-overview.jpg';
      this.categoryBannerPosition = this.category?.imagePosition || 'center';
    });
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }
}

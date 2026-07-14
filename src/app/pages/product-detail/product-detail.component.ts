import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../../data/mock-products';
import { GENERATED_PRODUCT_RICH_CONTENT } from '../../data/product-rich-content.generated';
import type { Product, ProductCategory, ProductRichContent } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product: Product | undefined;
  category: ProductCategory | undefined;
  productImage: string | undefined;
  displayRichContent: ProductRichContent | undefined;
  productBrochureFile: string | undefined;
  productBrochureName: string | undefined;
  private brochureVersion = '2026-05-02-product';

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = PRODUCTS.find(p => p.id === id);
    if (!this.product) {
      this.router.navigate(['/']);
      return;
    }
    this.category = PRODUCT_CATEGORIES.find(c => c.id === this.product.category);
    this.productImage = this.product.images?.[0];
    this.productBrochureFile = `/assets/brochures/products/${this.product.id}.pdf?v=${this.brochureVersion}`;
    this.productBrochureName = `${this.product.id}.pdf`;
    this.displayRichContent =
      this.product.richContent ??
      GENERATED_PRODUCT_RICH_CONTENT[this.product.id] ??
      this.buildDefaultRichContent(this.product);
  }

  private buildDefaultRichContent(product: Product): ProductRichContent {
    return {
      label: this.category?.title || 'Product overview',
      overview: product.shortDescription,
      highlights: product.featureBullets,
      sections: product.keyFeatures,
      measurementHeading: 'Typical applications',
      measurements: product.applications
    };
  }
}

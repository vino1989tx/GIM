import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRODUCT_CATEGORIES } from '../../data/mock-products';

type PortfolioStat = {
  value: string;
  label: string;
  detail: string;
};

@Component({
  selector: 'app-products-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss']
})
export class ProductsOverviewComponent {
  categories = PRODUCT_CATEGORIES;
  heroCategories = PRODUCT_CATEGORIES.slice(0, 3);
  portfolioStats: PortfolioStat[] = [
    {
      value: `${PRODUCT_CATEGORIES.length}`,
      label: 'Core categories',
      detail: 'Organized around how infrastructure teams specify monitoring systems.'
    },
    {
      value: 'Field',
      label: 'To cloud',
      detail: 'Coverage from site instrumentation through connectivity and remote visibility.'
    },
    {
      value: '24/7',
      label: 'Project readiness',
      detail: 'Built for live monitoring, alerting, and ongoing engineering review.'
    }
  ];
}

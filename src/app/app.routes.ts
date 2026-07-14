import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsOverviewComponent } from './pages/products-overview/products-overview.component';
import { SolutionsComponent } from './pages/solutions/solutions.component';
import { ServicesComponent } from './pages/services/services.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'solutions', component: SolutionsComponent },
  { path: 'products', component: ProductsOverviewComponent },
  { path: 'products/:category', component: ProductCategoryComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'downloads', component: DownloadsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '**', component: NotFoundComponent }
];

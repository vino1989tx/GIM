import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../../data/mock-products';

type CarouselSlide = {
  image: string;
  alt: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  heroTitle = 'GIM Nextgen';
  heroTagline = 'Precision geotechnical monitoring for resilient infrastructure';
  heroSubtitle = 'Real-time data. Intelligent insights. Trusted instrumentation.';

  carouselSlides: CarouselSlide[] = [
    {
      image: encodeURI('/assets/carousel/gim_slide_1.png'),
      alt: 'GIM Nextgen monitoring slide overview'
    },
    {
      image: encodeURI('/assets/carousel/Screenshot 2026-05-03 at 12.18.29\u202fAM.png'),
      alt: 'GIM Nextgen monitoring workflow presentation'
    },
    {
      image: encodeURI('/assets/carousel/Screenshot 2026-05-03 at 12.18.49\u202fAM.png'),
      alt: 'GIM Nextgen instrumentation and project support slide'
    },
    {
      image: encodeURI('/assets/carousel/Screenshot 2026-05-03 at 12.19.07\u202fAM.png'),
      alt: 'GIM Nextgen infrastructure monitoring slide'
    }
  ];

  activeSlideIndex = 0;

  categories = PRODUCT_CATEGORIES;
  featuredProducts = PRODUCTS.slice(0, 4);

  private autoplayHandle: ReturnType<typeof setInterval> | undefined;
  private readonly autoplayDelayMs = 2000;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  get activeSlide(): CarouselSlide {
    return this.carouselSlides[this.activeSlideIndex];
  }

  previousSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex - 1 + this.carouselSlides.length) % this.carouselSlides.length;
    this.restartAutoplay();
  }

  nextSlide(): void {
    this.activeSlideIndex = (this.activeSlideIndex + 1) % this.carouselSlides.length;
    this.restartAutoplay();
  }

  selectSlide(index: number): void {
    this.activeSlideIndex = index;
    this.restartAutoplay();
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    if (this.autoplayHandle || this.carouselSlides.length < 2) {
      return;
    }

    this.autoplayHandle = setInterval(() => {
      this.activeSlideIndex = (this.activeSlideIndex + 1) % this.carouselSlides.length;
    }, this.autoplayDelayMs);
  }

  private stopAutoplay(): void {
    if (!this.autoplayHandle) {
      return;
    }

    clearInterval(this.autoplayHandle);
    this.autoplayHandle = undefined;
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}

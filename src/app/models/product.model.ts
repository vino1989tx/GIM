export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProductRichSection {
  title: string;
  description: string;
}

export interface ProductRichContent {
  label?: string;
  headline?: string;
  overview: string;
  highlights?: string[];
  interfaceHeading?: string;
  interfaceBullets?: string[];
  sections?: ProductRichSection[];
  measurementHeading?: string;
  measurements?: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  featureBullets: string[];
  keyFeatures: ProductFeature[];
  applications: string[];
  specifications: ProductSpec[];
  images?: string[];
  relatedProducts?: string[];
  richContent?: ProductRichContent;
}

export interface ProductCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  featuredProductId?: string;
  image?: string;
  imagePosition?: string;
}

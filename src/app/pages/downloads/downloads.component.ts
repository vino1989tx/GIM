import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Brochure = {
  title: string;
  description: string;
  edition: string;
  file: string;
  image: string;
};

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent {
  heroImage = '/assets/GIM_Images/Ms - Gateway.jpg';
  cacheVersion = '2026-05-02';
  brochures: Brochure[] = [
    {
      title: 'GIM Nextgen Product Catalogue',
      description: 'Updated overview of instrumentation categories, core capabilities, services, and target industries.',
      edition: 'Updated May 2026',
      file: '/assets/brochures/gim-product-catalogue.pdf',
      image: '/assets/GIM_Images/Ms - Communication Node.jpg'
    },
    {
      title: 'Real-time monitoring platform',
      description: 'Connected workflow covering field devices, gateways, dashboards, alerts, and support delivery.',
      edition: 'Updated May 2026',
      file: '/assets/brochures/monitoring-platform.pdf',
      image: '/assets/GIM_Images/Ms - Gateway.jpg'
    },
    {
      title: 'Project case studies',
      description: 'Representative tunnel, rail, dam, and construction monitoring scenarios with delivery outcomes.',
      edition: 'Updated May 2026',
      file: '/assets/brochures/case-studies.pdf',
      image: '/assets/GIM_Nextgen_2026/geotechnical-services.jpg'
    }
  ];

  downloadPDF(fileName: string): void {
    const link = document.createElement('a');
    link.href = `${fileName}?v=${this.cacheVersion}`;
    link.download = fileName.split('/').pop() || 'document.pdf';
    link.click();
  }
}

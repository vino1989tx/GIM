import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  images: string[] = [
    '/assets/GIM_Nextgen_2026/gim-nextgen-cover.jpg',
    '/assets/GIM_Nextgen_2026/company-overview.jpg',
    '/assets/GIM_Nextgen_2026/about-us.jpg',
    '/assets/GIM_Nextgen_2026/real-time-monitoring.jpg',
    '/assets/GIM_Nextgen_2026/geotechnical-services.jpg',
    '/assets/GIM_Images/ABS Inclinometer Casing.jpg',
    '/assets/GIM_Images/Bi-Reflex Target.jpg',
    '/assets/GIM_Images/Building Settlement Marker.jpg',
    '/assets/GIM_Images/Center Hole Type Load Cell.jpg',
    '/assets/GIM_Images/Crack meter.jpg',
    '/assets/GIM_Images/Dial Gauge Type 3D Joint Meter.jpg',
    '/assets/GIM_Images/Digital Tilt Meter.jpg',
    '/assets/GIM_Images/Drive Point Type VW Piezometer.jpg',
    '/assets/GIM_Images/Ground Settlement Marker.jpg',
    '/assets/GIM_Images/High precision EL Tilt meter.jpg',
    '/assets/GIM_Images/In-Placement VW Extensometer.jpg',
    '/assets/GIM_Images/Inclinometer Monitoring System.jpg',
    '/assets/GIM_Images/MEMS Type EL Beam Sensor.jpg',
    '/assets/GIM_Images/MS - Accelerometer.jpg',
    '/assets/GIM_Images/MS - Environmental Sensor.jpg',
    '/assets/GIM_Images/MS-Tiltmeter.jpg',
    '/assets/GIM_Images/Magnetic Extensometer.jpg',
    '/assets/GIM_Images/Mechanical Type Rod Settlement Meter.jpg',
    '/assets/GIM_Images/Ms - Communication Node.jpg',
    '/assets/GIM_Images/Ms - Dynamic Displacement Sensor.jpg',
    '/assets/GIM_Images/Ms - Gateway.jpg',
    '/assets/GIM_Images/Ms-Vibrometer.jpg',
    '/assets/GIM_Images/Pavement Marker.jpg',
    '/assets/GIM_Images/Soil Pressure Meter 1.jpg',
    '/assets/GIM_Images/Soil Pressure Meter.jpg',
    '/assets/GIM_Images/Tilt Plate.jpg',
    '/assets/GIM_Images/VW - Arc-Weldable Type Strain Gauge.jpg',
    '/assets/GIM_Images/VW - Embedment Type Strain Gauge.jpg',
    '/assets/GIM_Images/VW - Spot-Weldable Type Strain Gauge.jpg',
    '/assets/GIM_Images/VW Type 3D Crack Meter.jpg',
    '/assets/GIM_Images/VW Type Displacement Meter (Crack Meter).jpg',
    '/assets/GIM_Images/VW Type Load Cell.jpg',
    '/assets/GIM_Images/VW Type Piezometer.jpg',
    '/assets/GIM_Images/VW Type Rock Bolt Stress Meter.jpg',
    '/assets/GIM_Images/VW Type Shotcrete Stress Meter.jpg',
    '/assets/GIM_Images/Water Level Indicator.jpg',
    '/assets/GIM_Images/Wheel Type In-Place Inclinometer.jpg'
  ];

  currentPage = 1;
  pageSize = 12;

  get totalPages(): number {
    return Math.ceil(this.images.length / this.pageSize);
  }

  get paginatedImages(): string[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.images.slice(start, start + this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}

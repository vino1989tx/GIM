import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'GIM Nextgen';
}

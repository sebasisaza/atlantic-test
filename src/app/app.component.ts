import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-root',
  imports: [SearchComponent, ResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'atlantic-test';
}

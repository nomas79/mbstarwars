import { Component, OnInit } from '@angular/core';
import { GlobalService } from './global.service';
import { ApiService } from './api.service';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Star Wars Characters';
  constructor(public Global: GlobalService, private Api: ApiService) {

  }
  ngOnInit() {
    this.getCharacters();
  }
  getCharacters() {
    this.Api.makeApi('assets/characters.json')
      .subscribe((response: any) => (this.Global.characters = response.characters), () => {
        this.Global.addError('Error loading characters');
      });
  }
}

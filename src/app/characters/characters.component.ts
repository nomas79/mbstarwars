import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(public Api: ApiService, public Global: GlobalService) { }

  ngOnInit() {
    this.getCharacters();
  }
  
  getCharacters() {
    this.Api.makeApi('assets/characters.json')
      .subscribe((response: any) => (this.Global.characters = response.characters), () => {
        this.Global.addError('Error');
      });      
  }
}

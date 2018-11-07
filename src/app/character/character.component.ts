import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  public character: any;
  public filmsurl: any;
  public films: any = [];
  public counter: number = 0;
  public loading: boolean = true;

  constructor(private Api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public Global: GlobalService) { }

  ngOnInit() {    
    console.log(this.Global.characters.length);
    if (this.Global.characters.length === 0) {
      this.router.navigate['/characters'];
      return;
    }
    console.log('continued');
    this.getCharacter();
  }
  getCharacter() {
    if (this.Global.characters.length === 0) return false;
    const name = this.route.snapshot.paramMap.get('name');
    this.character = this.Global.characters.find(character => character.name === name);    
    this.Api.makeApi(this.character.url)
      .subscribe((response: any) => (this.filmsurl = response.films), () => {
        this.Global.addError('Error');
        this.loading = false;
      }, () => {
        this.getFilmsDetails();
      });
  }

  getFilmsDetails() {

    this.filmsurl.forEach(element => {
      this.counter++;
      this.getFilmDetails(element);
    });

    this.loading = !(this.filmsurl.length === 0);
  }

  getFilmDetails(url) {
    this.Api.makeApi(url)
    .subscribe((response: any) => (this.films.push(response)), () => {
      this.Global.addError('Error');
      this.loading = false;
    }, () => {
      this.counter--;
      this.loading = (this.counter > 0);
    });

  }

}

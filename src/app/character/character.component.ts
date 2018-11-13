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
      this.router.navigate(['/characters']);
    }
    this.getCharacter();
    this.Global.setTitle('Star Wars');
  }
  getCharacter() {
    if (this.Global.characters.length === 0) return false;
    const name = this.route.snapshot.paramMap.get('name');
    this.character = this.Global.characters.find(character => character.name === name);
    this.Api.makeApi(this.character.url)
      .subscribe((response: any) => (this.character = response), () => {
        this.Global.addError('Error loading character details');
        this.loading = false;
        this.Global.stopWarp();
      }, () => {        
        this.getFilmsDetails();
        this.Global.setTitle('Star Wars - ' + this.character.name);
      });
  }

  getFilmsDetails() {

    this.character.films.forEach(element => {
      this.counter++;
      this.getFilmDetails(element);
    });

    this.loading = !(this.character.films.length === 0);
  }

  getFilmDetails(url) {
    this.Api.makeApi(url)
      .subscribe((response: any) => (this.films.push(response)), () => {
        this.Global.addError('Error getting movie details');
        this.loading = false;
        this.Global.stopWarp();
      }, () => {
        this.counter--;
        if (this.counter === 0) {
          this.Global.stopWarp();          
          this.sortEpisode();
        }
      });
  }

  sortEpisode() {

    this.films.sort(function (a, b) {
      return (a.episode_id - b.episode_id);
    });
    this.loading = false;
  }

}

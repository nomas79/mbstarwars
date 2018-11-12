import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(public Global: GlobalService,
    private router: Router) { }

  ngOnInit() {    
    this.Global.clearError();
  }

  redirectToCharacter(name) {
this.router.navigate([ '/character/' + name]);
  }
  
  
}

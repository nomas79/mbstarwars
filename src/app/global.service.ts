import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public errors = '';
  public characters: any = [];
  public images: any = [];
  constructor() { }

  addError(message: string) {
    this.errors = message;
  }
  clearError() {
    this.errors = '';
  }

  getImage() {
return '/assets/images/noimage.png';
    //.images.find(image => character.id === id) }}
  }
}

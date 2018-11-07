import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public errors = '';
  public characters: any = [];
  constructor() { }

  addError(message: string) {
    this.errors = message;
  }
  clearError() {
    this.errors = '';
  }
}

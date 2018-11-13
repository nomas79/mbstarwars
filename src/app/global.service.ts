import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
//import '../assets/js/warpspeed.min.js';

declare var WarpSpeed: any;

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public errors = '';
  public characters: any = [];
  public images: any = [];
  constructor(
    private title: Title
  ) { }

  public setTitle(title: string) {
    this.title.setTitle(title);
  }
  addError(message: string) {
    this.errors = message;
  }
  clearError() {
    this.errors = '';
  }

  stopWarp() {
    var x = new WarpSpeed("canvas", { "speed": 0, "density": 10, "shape": "circle", "starSize": 10, "backgroundColor": "#000000", "starColor": "#FFFFFF" });
  }
  startWarp() {
    var x = new WarpSpeed("canvas", { "speed": 2, "speedAdjFactor": 0.1, "density": 10, "shape": "circle", "warpEffect": true, "warpEffectLength": 5, "depthFade": true, "starSize": 10, "backgroundColor": "#000000", "starColor": "#FFFFFF" });
  }
}

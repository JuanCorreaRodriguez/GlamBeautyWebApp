import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SharedService} from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarStateService {

  get theme(): BehaviorSubject<boolean> {
    return this._theme;
  }

  set theme(value: BehaviorSubject<boolean>) {
    this._theme = value;
  }

  private _theme: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private serviceShared: SharedService) { }

  multiply(a: number, b: number) {
    this.serviceShared.sharedFunc()
    return a * b
  }
}

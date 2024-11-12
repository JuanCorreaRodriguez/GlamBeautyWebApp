import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToolbarStateService} from '../../Core/Services/toolbar-state.service';
import {MatButton} from '@angular/material/button';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {firstValueFrom, interval, map} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements AfterViewInit{
  strategy = inject(ChangeDetectorRef)
  http =  inject(HttpClient)
  value = ""
  city = {}
  signalModel = model(false)

  data$ = interval(1000).pipe(
    map(() => new Date() )
  )

  constructor(private serviceState: ToolbarStateService) {
  }

  ngAfterViewInit(): void {
    this.serviceState.theme.subscribe(theme => {
      theme ? this.value = "light" : "dark"
    })

    this.apiCall()
    this.strategy.detectChanges()
  }

  changeTheme() {
    this.signalModel.set(!this.signalModel())
    this.serviceState.theme.next(this.signalModel())
  }

  async apiCall() {
    let url = "https://restcountries.com/v3.1/name/South Georgia"

    let res = await firstValueFrom(
      this.http.get(url, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
    )
    // fetch(url, {method: "GET", headers: {"Content-Type": "application/json"}}).then((call)=>{
    // console.log(call.json())
    //
    // })
    console.log(res)
    console.log(JSON.stringify(res))
    this.city = res
  }
}

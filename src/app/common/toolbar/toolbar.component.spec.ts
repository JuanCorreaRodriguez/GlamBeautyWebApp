import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {ToolbarStateService} from '../../Core/Services/toolbar-state.service';
import {SharedService} from '../../Core/Services/shared.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe("ApiCall", () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ToolbarComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),],
    }).compileComponents()

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  })

  it('should create', () => {
    const mockData = {}
    let ctrl = TestBed.inject(HttpTestingController)

    ctrl.expectOne("https://restcountries.com/v3.1/name/South Georgia").flush({})

    expect(component.city).toEqual(mockData)
    ctrl.verify()
  })
})

describe("SPY Testing: Multiply", ()=> {
  it("should multiply",  () => {
    const servShared = new SharedService()
    const serv = new ToolbarStateService(servShared)
    const res = serv.multiply(5,5)
    expect(res).toBe(25)
  })

  it("callfunc",  () => {
    const shared = new SharedService()
    spyOn(shared, "sharedFunc")
    const serv = new ToolbarStateService(shared)
    const res = serv.multiply(5,5)
    expect(shared.sharedFunc).toHaveBeenCalled()
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaksDetailComponent } from './taks-detail.component';

describe('TaksDetailComponent', () => {
  let component: TaksDetailComponent;
  let fixture: ComponentFixture<TaksDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaksDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

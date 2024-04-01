import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MLabelsComponent } from './m-labels.component';

describe('MLabelsComponent', () => {
  let component: MLabelsComponent;
  let fixture: ComponentFixture<MLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

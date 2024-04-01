import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MTaskComponent } from './m-task.component';

describe('MTaskComponent', () => {
  let component: MTaskComponent;
  let fixture: ComponentFixture<MTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

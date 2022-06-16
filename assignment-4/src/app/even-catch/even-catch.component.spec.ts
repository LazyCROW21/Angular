import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenCatchComponent } from './even-catch.component';

describe('EvenCatchComponent', () => {
  let component: EvenCatchComponent;
  let fixture: ComponentFixture<EvenCatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenCatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenCatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

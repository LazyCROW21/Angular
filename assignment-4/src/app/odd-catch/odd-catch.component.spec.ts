import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddCatchComponent } from './odd-catch.component';

describe('OddCatchComponent', () => {
  let component: OddCatchComponent;
  let fixture: ComponentFixture<OddCatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddCatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OddCatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

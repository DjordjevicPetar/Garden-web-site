import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajDekorateraComponent } from './dodaj-dekoratera.component';

describe('DodajDekorateraComponent', () => {
  let component: DodajDekorateraComponent;
  let fixture: ComponentFixture<DodajDekorateraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajDekorateraComponent]
    });
    fixture = TestBed.createComponent(DodajDekorateraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

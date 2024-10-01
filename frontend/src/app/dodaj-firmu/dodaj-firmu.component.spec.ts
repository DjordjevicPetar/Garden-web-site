import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajFirmuComponent } from './dodaj-firmu.component';

describe('DodajFirmuComponent', () => {
  let component: DodajFirmuComponent;
  let fixture: ComponentFixture<DodajFirmuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajFirmuComponent]
    });
    fixture = TestBed.createComponent(DodajFirmuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajKomentarComponent } from './dodaj-komentar.component';

describe('DodajKomentarComponent', () => {
  let component: DodajKomentarComponent;
  let fixture: ComponentFixture<DodajKomentarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajKomentarComponent]
    });
    fixture = TestBed.createComponent(DodajKomentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

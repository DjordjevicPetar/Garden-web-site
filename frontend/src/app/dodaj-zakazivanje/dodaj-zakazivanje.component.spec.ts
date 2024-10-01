import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajZakazivanjeComponent } from './dodaj-zakazivanje.component';

describe('DodajZakazivanjeComponent', () => {
  let component: DodajZakazivanjeComponent;
  let fixture: ComponentFixture<DodajZakazivanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajZakazivanjeComponent]
    });
    fixture = TestBed.createComponent(DodajZakazivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

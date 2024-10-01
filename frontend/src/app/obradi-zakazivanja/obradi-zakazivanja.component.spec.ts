import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObradiZakazivanjaComponent } from './obradi-zakazivanja.component';

describe('ObradiZakazivanjaComponent', () => {
  let component: ObradiZakazivanjaComponent;
  let fixture: ComponentFixture<ObradiZakazivanjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObradiZakazivanjaComponent]
    });
    fixture = TestBed.createComponent(ObradiZakazivanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

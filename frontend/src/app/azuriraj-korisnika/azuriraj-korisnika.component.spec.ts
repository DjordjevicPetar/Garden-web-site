import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajKorisnikaComponent } from './azuriraj-korisnika.component';

describe('AzurirajKorisnikaComponent', () => {
  let component: AzurirajKorisnikaComponent;
  let fixture: ComponentFixture<AzurirajKorisnikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzurirajKorisnikaComponent]
    });
    fixture = TestBed.createComponent(AzurirajKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

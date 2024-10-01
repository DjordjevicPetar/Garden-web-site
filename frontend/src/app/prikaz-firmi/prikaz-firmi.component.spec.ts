import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrikazFirmiComponent } from './prikaz-firmi.component';

describe('PrikazFirmiComponent', () => {
  let component: PrikazFirmiComponent;
  let fixture: ComponentFixture<PrikazFirmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrikazFirmiComponent]
    });
    fixture = TestBed.createComponent(PrikazFirmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

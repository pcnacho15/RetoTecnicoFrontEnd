import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiParticipacionComponent } from './mi-participacion.component';

describe('MiParticipacionComponent', () => {
  let component: MiParticipacionComponent;
  let fixture: ComponentFixture<MiParticipacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiParticipacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiParticipacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRespostaComponent } from './modal-resposta.component';

describe('ModalRespostaComponent', () => {
  let component: ModalRespostaComponent;
  let fixture: ComponentFixture<ModalRespostaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRespostaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRespostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrdemComponent } from './modal-ordem.component';

describe('ModalOrdemComponent', () => {
  let component: ModalOrdemComponent;
  let fixture: ComponentFixture<ModalOrdemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOrdemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

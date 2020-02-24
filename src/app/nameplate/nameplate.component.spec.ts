import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameplateComponent } from './nameplate.component';

describe('NameplateComponent', () => {
  let component: NameplateComponent;
  let fixture: ComponentFixture<NameplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

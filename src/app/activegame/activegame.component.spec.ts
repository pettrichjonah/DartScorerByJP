import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivegameComponent } from './activegame.component';

describe('ActivegameComponent', () => {
  let component: ActivegameComponent;
  let fixture: ComponentFixture<ActivegameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivegameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

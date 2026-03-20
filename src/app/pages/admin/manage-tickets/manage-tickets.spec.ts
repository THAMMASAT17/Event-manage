import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTickets } from './manage-tickets';

describe('ManageTickets', () => {
  let component: ManageTickets;
  let fixture: ComponentFixture<ManageTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTickets],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTickets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListViewComponent } from './store-list-view.component';

describe('StoreListViewComponent', () => {
  let component: StoreListViewComponent;
  let fixture: ComponentFixture<StoreListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

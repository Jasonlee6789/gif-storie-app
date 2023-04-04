import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifCollectionComponent } from './gif-collection.component';

describe('GifCollectionComponent', () => {
  let component: GifCollectionComponent;
  let fixture: ComponentFixture<GifCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GifCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

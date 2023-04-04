import { TestBed } from '@angular/core/testing';

import { GifStorageService } from './gif-storage.service';

describe('GifStorageService', () => {
  let service: GifStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

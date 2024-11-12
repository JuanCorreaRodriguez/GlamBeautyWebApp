import { TestBed } from '@angular/core/testing';

import { ToolbarStateService } from './toolbar-state.service';

describe('ToolbarStateService', () => {
  let service: ToolbarStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

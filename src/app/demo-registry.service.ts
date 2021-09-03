import { Injectable, Type } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RegisteredDemo } from './types';

@Injectable({
  providedIn: 'root'
})
export class DemoRegistryService {

  registry = new BehaviorSubject<RegisteredDemo | undefined>(undefined);

  constructor() { }

  registerDemo(demo: RegisteredDemo) {
    this.registry.next(demo);
  }
}

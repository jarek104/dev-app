import { Type } from "@angular/core";

export interface DemoComponentSpec {
  component: Type<any>;
}

export interface RegisteredDemo {
  demoLabel: string;
  componentType: any;
  path: string;
  children: RegisteredDemoChild[];
}

export interface RegisteredDemoChild {
  data: any;
  path: string;
  hidden?: boolean;
}
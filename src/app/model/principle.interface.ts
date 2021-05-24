import { Guideline } from './guideline.interface';

export interface Principle {
  id: string;
  num?: string;
  handle?: string;
  text?: string;
  guidelines?: Guideline[];
}

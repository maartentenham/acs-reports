import { SuccessCriterium } from './succescriterium.interface';

export interface Guideline {
  id: string;
  alt_id?: string[];
  num?: string;
  handle?: string;
  text?: string;
  successcriteria?: SuccessCriterium[];
}

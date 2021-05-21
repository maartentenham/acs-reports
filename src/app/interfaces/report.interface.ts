import { Principle } from './principle.interface';
import {Total} from './total.interface';

export interface Report {
  principles: Principle[];
  evaluator?: string;
  website?: string;
  summary?: string;
  publicationDate?: string;
  totals?: Total[];
}

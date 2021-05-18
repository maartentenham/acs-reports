import { Principle } from './principle.interface';

export interface Report {
  principles: Principle[];
  evaluator?: string;
  website?: string;
  summary?: string;
  publicationDate?: string;
}

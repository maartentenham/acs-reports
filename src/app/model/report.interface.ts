import { Principle } from './principle.interface';
import {Total} from './total';

export interface Report {
  principles: Principle[];
  onlyIssues?: boolean;
  evaluator?: string;
  website?: string;
  summary?: string;
  publicationDate?: string;
  initiator?: string;
  researchPeriod?: string;
  scope?: string;
  totals?: Total[];
  samples?: [];
  reliedUponTechnology?: [];
  specifics?: [];
}

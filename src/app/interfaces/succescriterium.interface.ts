import { Criteriumdetail } from './criteriumdetail.interface';

export interface SuccessCriterium {
  id: string;
  alt_id?: string[];
  num?: string;
  level?: string;
  handle?: string;
  text?: string;
  details?: Criteriumdetail[];
}

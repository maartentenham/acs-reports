import { Testresult } from "./testresult.interface";

export interface AuditResult {
  type: string;
  test: string;
  result: Testresult;
  mode: string;
}

import { Candidate } from './candidate';
import { Company } from './company';

export type User = {
  id: string;
  email: string;
  roles: string[];
  candidate?: Candidate;
  company?: Company;
};

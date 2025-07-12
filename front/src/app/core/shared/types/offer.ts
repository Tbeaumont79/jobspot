import { Company } from './company';

export interface OfferType {
  id: number;
  title: string;
  description: string;
  salary: string;
  status: 'pending' | 'published' | 'closed';
  contractType: 'CDI' | 'CDD' | 'STAGE' | 'FREELANCE';
  createdAt: string;
  created_at: string;
  company: string | Company;
  applies: string[] | Apply[];
  tags: string[] | Tag[];
}

export interface OfferCollection {
  '@context': string;
  '@id': string;
  '@type': 'Collection';
  totalItems: number;
  member: OfferType[];
}

export interface Apply {
  id: number;
}

export interface Tag {
  id: number;
  name: string;
}

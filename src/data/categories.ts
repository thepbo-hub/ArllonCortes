import { CategoryId } from './services';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  serviceIds: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cabelo',
    name: 'Cabelo',
    tagline: 'Cortes & Estilização',
    description: 'Técnicas clássicas e contemporâneas para valorizar sua fisionomia.',
    serviceIds: [
      'corte-simples',
      'corte-disfarcado',
      'acabamento',
      'desenho',
      'platinado',
      'reflexo',
      'camuflagem-cabelo',
      'pigmentacao-cabelo',
      'alinhamento-capilar',
    ],
  },
  {
    id: 'barba',
    name: 'Barba',
    tagline: 'Design & Cuidado Facial',
    description: 'Tradição do barbear com navalha, toalha quente e finalização artesanal.',
    serviceIds: [
      'barba',
      'alinhamento-barba',
      'barboterapia',
      'camuflagem-barba',
      'pigmentacao-barba',
      'hidratacao-cabelo-barba',
    ],
  },
  {
    id: 'sobrancelha-acabamento',
    name: 'Sobrancelha & Acabamento',
    tagline: 'Detalhes & Precisão',
    description: 'Linhas milimétricas e harmonia para o olhar e contorno.',
    serviceIds: ['sobrancelha', 'linha', 'acabamento', 'desenho'],
  },
  {
    id: 'limpeza-cuidados',
    name: 'Limpeza & Cuidados',
    tagline: 'Revitalização da Pele',
    description: 'Tratamentos dermatológicos masculinos para desobstrução e frescor.',
    serviceIds: ['limpeza-facial', 'barboterapia-limpeza', 'depilacao-nariz-orelha'],
  },
  {
    id: 'coloracao-transformacao',
    name: 'Coloração & Transformação',
    tagline: 'Tom, Realce & Pigmento',
    description: 'Colorimetria especializada para efeitos discretos ou platinados marcantes.',
    serviceIds: [
      'platinado',
      'reflexo',
      'camuflagem-cabelo',
      'camuflagem-barba',
      'pigmentacao-cabelo',
      'pigmentacao-barba',
    ],
  },
  {
    id: 'tratamentos-especiais',
    name: 'Tratamentos Especiais',
    tagline: 'Rituais & Terapia Capilar',
    description: 'Protocolos de hidratação, alinhamento e relaxamento com produtos nobres.',
    serviceIds: [
      'alinhamento-capilar',
      'alinhamento-barba',
      'barboterapia',
      'hidratacao-cabelo-barba',
      'depilacao-nariz-orelha',
    ],
  },
];

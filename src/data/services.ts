export type PriceType = 'fixed' | 'quote';

export type CategoryId =
  | 'cabelo'
  | 'barba'
  | 'sobrancelha-acabamento'
  | 'limpeza-cuidados'
  | 'coloracao-transformacao'
  | 'tratamentos-especiais';

export interface ServiceItem {
  id: string;
  name: string;
  image: string;
  priceCents: number | null;
  priceType: PriceType;
  categories: CategoryId[];
  description?: string;
  durationApprox?: string;
}

export const SERVICES: ServiceItem[] = [
  // Cabelo
  {
    id: 'corte-simples',
    name: 'Corte simples (1 pente)',
    image: 'https://i.postimg.cc/ZngCnxLD/Corte-simples-1-PENTE.png',
    priceCents: 3000,
    priceType: 'fixed',
    categories: ['cabelo'],
    description: 'Praticidade e precisão com máquina em altura única padronizada.',
    durationApprox: '15 min',
  },
  {
    id: 'corte-disfarcado',
    name: 'Corte disfarçado',
    image: 'https://i.postimg.cc/B6m890P1/Corte-disfarcado.png',
    priceCents: 4000,
    priceType: 'fixed',
    categories: ['cabelo'],
    description: 'Degradê refinado (fade) com transição milimétrica e acabamento impecável.',
    durationApprox: '45 min',
  },
  {
    id: 'acabamento',
    name: 'Acabamento',
    image: 'https://i.postimg.cc/fyFJyfv6/Acabamento.jpg',
    priceCents: 1500,
    priceType: 'fixed',
    categories: ['cabelo', 'sobrancelha-acabamento'],
    description: 'Alinhamento dos contornos da nuca, costeletas e frontal com navalha.',
    durationApprox: '15 min',
  },
  {
    id: 'desenho',
    name: 'Desenho',
    image: 'https://i.postimg.cc/Xqhpqkg1/Desenho.jpg',
    priceCents: 1000,
    priceType: 'fixed',
    categories: ['cabelo', 'sobrancelha-acabamento'],
    description: 'Riscos geométricos, listras ou freestyle personalizado na navalha.',
    durationApprox: '15 min',
  },
  {
    id: 'platinado',
    name: 'Platinado',
    image: 'https://i.postimg.cc/5yjXfR8v/Platinado.jpg',
    priceCents: 14000,
    priceType: 'fixed',
    categories: ['cabelo', 'coloracao-transformacao'],
    description: 'Descoloração global profissional e matização para tom branco/gelo uniforme.',
    durationApprox: '120 min',
  },
  {
    id: 'reflexo',
    name: 'Reflexo',
    image: 'https://i.postimg.cc/brdZqB1G/Reflexo.jpg',
    priceCents: 8000,
    priceType: 'fixed',
    categories: ['cabelo', 'coloracao-transformacao'],
    description: 'Mechas alinhadas na touca com clareamento luminoso e acabamento brilhante.',
    durationApprox: '60 min',
  },
  {
    id: 'camuflagem-cabelo',
    name: 'Camuflagem dos fios brancos (cabelo)',
    image: 'https://i.postimg.cc/8c3jcmb0/Camuflagem-dos-fios-brancos-(cabelo).jpg',
    priceCents: 3500,
    priceType: 'fixed',
    categories: ['cabelo', 'coloracao-transformacao'],
    description: 'Tonalização sutil e discreta para atenuar fios grisalhos com efeito natural.',
    durationApprox: '15 min',
  },
  {
    id: 'pigmentacao-cabelo',
    name: 'Pigmentação para cabelo',
    image: 'https://i.postimg.cc/BbtjJV2H/Pigmentacao-para-cabelo.jpg',
    priceCents: 2500,
    priceType: 'fixed',
    categories: ['cabelo', 'coloracao-transformacao'],
    description: 'Realce de densidade e preenchimento de falhas no contorno capilar.',
    durationApprox: '15 min',
  },
  {
    id: 'alinhamento-capilar',
    name: 'Alinhamento capilar',
    image: 'https://i.postimg.cc/nr5CrG1g/Alinhamento-capilar.jpg',
    priceCents: null,
    priceType: 'quote',
    categories: ['cabelo', 'tratamentos-especiais'],
    description: 'Redução de volume e controle de frizz com produtos de alta tecnologia.',
    durationApprox: '30 min',
  },

  // Barba
  {
    id: 'barba',
    name: 'Barba',
    image: 'https://i.postimg.cc/GtNHtxjN/Barba.jpg',
    priceCents: 3000,
    priceType: 'fixed',
    categories: ['barba'],
    description: 'Design e desenho da barba com toalha quente, navalha e pós-barba balsâmico.',
    durationApprox: '15 min',
  },
  {
    id: 'alinhamento-barba',
    name: 'Alinhamento de barba',
    image: 'https://i.postimg.cc/yx5kxyT2/Alinhamento-de-barba.jpg',
    priceCents: null,
    priceType: 'quote',
    categories: ['barba', 'tratamentos-especiais'],
    description: 'Alinhamento térmico e modelagem dos fios rebeldes da barba.',
    durationApprox: '15 min',
  },
  {
    id: 'barboterapia',
    name: 'Barboterapia',
    image: 'https://i.postimg.cc/FRTf54kg/Barboterapia.jpg',
    priceCents: null,
    priceType: 'quote',
    categories: ['barba', 'tratamentos-especiais'],
    description: 'Experiência sensorial completa com óleos essenciais, massagem facial e toalhas quentes.',
    durationApprox: '30 min',
  },
  {
    id: 'camuflagem-barba',
    name: 'Camuflagem dos fios brancos (barba)',
    image: 'https://i.postimg.cc/T1Sp1Jcs/Camuflagem-dos-fios-brancos-(barba).jpg',
    priceCents: 2500,
    priceType: 'fixed',
    categories: ['barba', 'coloracao-transformacao'],
    description: 'Tonalização personalizada para harmonizar o tom dos pelos da barba sem artificiais.',
    durationApprox: '15 min',
  },
  {
    id: 'pigmentacao-barba',
    name: 'Pigmentação para barba',
    image: 'https://i.postimg.cc/sx30Kk7Q/Para-que-serve-Modelagem-capilar-com-alta-fixacao-e-brilho-de-facil-remocao-com-agua-corrente.png',
    priceCents: 2000,
    priceType: 'fixed',
    categories: ['barba', 'coloracao-transformacao'],
    description: 'Preenchimento e definição das linhas para uma barba cheia e marcante.',
    durationApprox: '15 min',
  },
  {
    id: 'hidratacao-cabelo-barba',
    name: 'Hidratação de cabelo ou barba',
    image: 'https://i.postimg.cc/ZR8M8bBN/Para-que-serve-Modelagem-capilar-com-alta-fixacao-e-brilho-de-facil-remocao-com-agua-corrente-(1).png',
    priceCents: 2000,
    priceType: 'fixed',
    categories: ['barba', 'tratamentos-especiais'],
    description: 'Nutrição profunda com máscara restauradora, devolvendo maciez e brilho.',
    durationApprox: '15 min',
  },

  // Sobrancelha e acabamento
  {
    id: 'sobrancelha',
    name: 'Sobrancelha',
    image: 'https://i.postimg.cc/NMdyqc2R/Sobrancelha.jpg',
    priceCents: 1000,
    priceType: 'fixed',
    categories: ['sobrancelha-acabamento'],
    description: 'Limpeza e alinhamento do desenho na navalha ou pinça com máxima naturalidade.',
    durationApprox: '15 min',
  },
  {
    id: 'linha',
    name: 'Linha',
    image: 'https://i.postimg.cc/3NWk3c2q/Linha.jpg',
    priceCents: 500,
    priceType: 'fixed',
    categories: ['sobrancelha-acabamento'],
    description: 'Depilação egípcia com fio de linha para precisão absoluta e menor irritação.',
    durationApprox: '15 min',
  },

  // Limpeza e cuidados
  {
    id: 'limpeza-facial',
    name: 'Limpeza de pele facial',
    image: 'https://i.postimg.cc/rszDqP53/Limpeza-de-pele-facial.jpg',
    priceCents: 3000,
    priceType: 'fixed',
    categories: ['limpeza-cuidados'],
    description: 'Higienização profunda, esfoliação facial e remoção de impurezas da pele.',
    durationApprox: '15 min',
  },
  {
    id: 'barboterapia-limpeza',
    name: 'Barboterapia + limpeza facial',
    image: 'https://i.postimg.cc/prymP6KK/Barboterapia-Limpeza-facial.png',
    priceCents: 5000,
    priceType: 'fixed',
    categories: ['limpeza-cuidados'],
    description: 'Combo premium: barbear relaxante com toalha quente associado a protocolo facial completo.',
    durationApprox: '30 min',
  },
  {
    id: 'depilacao-nariz-orelha',
    name: 'Depilação de nariz ou orelha',
    image: 'https://i.postimg.cc/1XTfXrKJ/Depilacao-nariz-ou-orelha.jpg',
    priceCents: null,
    priceType: 'quote',
    categories: ['limpeza-cuidados', 'tratamentos-especiais'],
    description: 'Remoção segura e higiênica de pelos indesejados nas narinas ou orelhas com cera suave.',
    durationApprox: '15 min',
  },
];

// Helper to look up service by ID
export const SERVICES_BY_ID = new Map<string, ServiceItem>(
  SERVICES.map((s) => [s.id, s])
);

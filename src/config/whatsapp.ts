import { ServiceItem } from '../data/services';
import { formatCurrency } from '../lib/currency';

/**
 * Configuração independente de WhatsApp da Arllon Fernandes Barbearia.
 * Modifique o número ou o link aqui para atualizar todo o sistema.
 */
export const WHATSAPP_CONFIG = {
  // Número oficial com DDI e DDD (extraído do link https://wa.link/pqxb6a -> 55 21 96513-5344)
  phoneNumber: '5521965135344',

  // Link curto de referência
  linkUrl: 'https://wa.link/pqxb6a',
  
  // Nome oficial do estabelecimento
  establishmentName: 'Arllon Fernandes Barbearia',
};

/**
 * Gera a mensagem dinâmica e estruturada para fechamento de orçamento via WhatsApp.
 * Segue todas as diretrizes de etiqueta, cálculo e clareza informativa.
 */
export function generateBudgetMessage(params: {
  fixedPriceServices: ServiceItem[];
  quoteServices: ServiceItem[];
  subtotalCents: number;
}): string {
  const { fixedPriceServices, quoteServices, subtotalCents } = params;

  const lines: string[] = [
    `Olá, ${WHATSAPP_CONFIG.establishmentName}! Montei meu orçamento de procedimentos através do catálogo digital:`,
    '',
  ];

  // 1. Procedimentos com valor definido
  if (fixedPriceServices.length > 0) {
    lines.push('*Procedimentos Selecionados:*');
    fixedPriceServices.forEach((service) => {
      lines.push(`• ${service.name} — ${formatCurrency(service.priceCents)}`);
    });
    lines.push('');
    lines.push(`*Subtotal estimado:* ${formatCurrency(subtotalCents)}`);
  }

  // 2. Procedimentos sob consulta (se existirem)
  if (quoteServices.length > 0) {
    lines.push('');
    lines.push('*Procedimentos sob consulta (avaliação presencial):*');
    quoteServices.forEach((service) => {
      lines.push(`• ${service.name} (Sob consulta)`);
    });
    lines.push('');
    if (fixedPriceServices.length > 0) {
      lines.push(
        '⚠️ *Aviso:* O subtotal não inclui os serviços com valor sob consulta. Gostaria de confirmar os valores destes procedimentos.'
      );
    } else {
      lines.push(
        '⚠️ *Aviso:* Os procedimentos selecionados estão sob avaliação presencial. Gostaria de confirmar os valores destes serviços.'
      );
    }
  }

  // 3. Solicitação de disponibilidade de horários
  lines.push('');
  lines.push('Gostaria de verificar a disponibilidade de horários para a realização destes procedimentos.');
  lines.push('Aguardo o retorno para confirmarmos. Obrigado!');

  return lines.join('\n');
}

/**
 * Cria a URL oficial do WhatsApp com o número e o texto codificado.
 * Utiliza o endpoint oficial 'api.whatsapp.com/send?phone=...&text=...' para garantir
 * que a mensagem seja pré-preenchida no campo de texto do WhatsApp sem perdas por redirecionamento.
 */
export function buildWhatsAppQuoteUrl(params: {
  fixedPriceServices: ServiceItem[];
  quoteServices: ServiceItem[];
  subtotalCents: number;
}): string {
  const message = generateBudgetMessage(params);
  const encoded = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIG.phoneNumber}&text=${encoded}`;
}

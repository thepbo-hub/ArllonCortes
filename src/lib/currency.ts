/**
 * Formats a value in cents into Brazilian Real currency string.
 * Example: 3000 -> "R$ 30,00"
 */
export function formatCurrency(cents: number | null): string {
  if (cents === null || cents === undefined) {
    return 'CONSULTAR';
  }
  const reais = cents / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(reais);
}

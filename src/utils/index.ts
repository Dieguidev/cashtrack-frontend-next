export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// export function formatCurrency(amount: number) {
//   return new Intl.NumberFormat('es-PE', {
//     style: 'currency',
//     currency: 'PEN',
//   }).format(amount);
// }

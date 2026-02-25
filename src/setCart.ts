import type { CartItem } from './types';

export async function setCart(cartItems: CartItem[]): Promise<void> {
  const tbody = document.getElementById('cartItemsList');
  if (!tbody) return;

  tbody.innerHTML = cartItems.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.count}</td>
    </tr>
  `).join('');

  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);
  const counterElement = document.getElementById('cartCounter');
  if (counterElement) {
    counterElement.textContent = totalCount.toString();
  }
}

export async function getCart(): Promise<CartItem[]> {
  const response = await fetch('/cart');
  return await response.json();
}

export async function clearCart(): Promise<void> {
  await axios.post('/reset');
}

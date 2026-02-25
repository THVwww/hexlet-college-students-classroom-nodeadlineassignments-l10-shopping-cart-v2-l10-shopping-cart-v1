import axios from 'axios';
import productCard from './productCard';
import type { Product, CartItem } from './types';

declare global {
  interface Window {
    bootstrap: any;
  }
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/products');
  return await response.json();
}

async function fetchCart(): Promise<CartItem[]> {
  const response = await fetch('/cart');
  return await response.json();
}

function renderProducts(products: Product[]): void {
  const container = document.querySelector('.product-container');
  if (container) {
    container.innerHTML = products.map(product => productCard(product)).join('');
    
  
    container.querySelectorAll('.addToCart').forEach(button => {
      button.addEventListener('click', async (event: Event) => {
        const target = event.target as HTMLElement;
        const productId = target.getAttribute('data-id');
        
        if (productId) {
          try {
            await axios.post('/cart', { id: Number(productId) });
            await updateCartCounter();
          } catch (error) {
            console.error('Error adding to cart:', error);
          }
        }
      });
    });
  }
}

async function updateCartCounter(): Promise<void> {
  try {
    const cartItems = await fetchCart();
    const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);
    
    const counterElement = document.getElementById('cartCounter');
    if (counterElement) {
      counterElement.textContent = totalCount.toString();
    }
  } catch (error) {
    console.error('Error updating cart counter:', error);
  }
}

function initModal(): void {
  const cartButton = document.getElementById('cartButton');
  const cartButtonClose = document.getElementById('cartButtonClose');
  
  if (cartButton && cartButtonClose) {
    const modalElement = document.querySelector('#cartModal');
    if (modalElement && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalElement);
      
      cartButton.addEventListener('click', () => {
        modal.show();
        loadCartItems();
      });
      
      cartButtonClose.addEventListener('click', () => {
        modal.hide();
      });
    }
  }
}

async function loadCartItems(): Promise<void> {
  try {
    const cartItems = await fetchCart();
    const tbody = document.getElementById('cartItemsList');
    
    if (tbody) {
      tbody.innerHTML = cartItems.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.count}</td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error('Error loading cart items:', error);
  }
}

function initResetButton(): void {

  const resetButton = document.querySelector('.resetBtn');
  
  if (resetButton) {
    resetButton.addEventListener('click', async () => {
      try {
        const response = await axios.post('/reset');
        console.log('Cart reset response:', response.data);
        
     
        await updateCartCounter();
        
      
        const modalElement = document.querySelector('#cartModal');
        if (modalElement && window.bootstrap) {
          const modal = window.bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
        
       
        const tbody = document.getElementById('cartItemsList');
        if (tbody) {
          tbody.innerHTML = '';
        }
        
      } catch (error) {
        console.error('Error resetting cart:', error);
      }
    });
  } else {
    console.warn('Кнопка сброса корзины не найдена! Проверьте класс .resetBtn');
  }
}


async function app(): Promise<void> {
  try {
    const products = await fetchProducts();
    renderProducts(products);
    await updateCartCounter();
    initModal();
    initResetButton();
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}


export default app;
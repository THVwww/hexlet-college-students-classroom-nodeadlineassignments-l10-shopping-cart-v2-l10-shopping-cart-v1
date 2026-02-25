/**
 * @param {import('./types').Product} product
 * @returns {string}
 */
export default function productCard(product) {
  const discountBadge = product.discount 
    ? `<span class="badge bg-danger position-absolute mt-2 ms-2">-${product.discount}%</span>`
    : '';
  
  const oldPriceHtml = product.oldPrice 
    ? `<span class="text-decoration-line-through text-muted small">${product.oldPrice} ₽</span>`
    : '';
  
  const disabledAttr = product.inStock === 0 ? 'disabled=""' : '';
  
  return `
<div class="col">
    <div class="card h-100 shadow-sm">
    ${discountBadge}
    <img class="card-img" src="${product.image || 'cube-outline-svgrepo-com.svg'}">
    <div class="card-body d-flex flex-column">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text text-muted small">${product.description}</p>
        <div class="mt-auto">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fs-5 fw-bold">${product.price} ₽</span>
                ${oldPriceHtml}
            </div>
        <div class="d-flex justify-content-between align-items-center">
                <button ${disabledAttr} data-id="${product.id}" class="addToCart btn btn-primary btn-sm">В корзину</button>
                <span class="text-muted small">Осталось: ${product.inStock} шт.</span>
        </div>
        </div>
    </div>
    </div>
</div>`;
}
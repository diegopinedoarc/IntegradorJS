//Renderizado de elementos
const renderProductCard = (product) => {
  const { img, id, name, price, category } = product;
  return `         <div class="productCard">
  <img
    class="productCard__img borders"
    src="${img}"
    alt="${img}"
  />
  <div class="productCard__info">
    <h3 class="productCard__name">${name}</h3>
    <span class="productCard__price">$${price}</span>
    <div class="productCard__rating">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
    </div>
    <button class="productCard__button product"
    data-img='${img}'
    data-id='${id}'
    data-name='${name}'
    data-category='${category}'
    data-price='${price}'
    >Comprar</button>
  </div>
</div>`;
};
const renderCardCart = (product) => {
  const { img, id, name, category, price, cant } = product;
  return `<div class = "cartBox">
  <img class="imgCart" src ="${img}">
  <div class="cartBox_info">
    <p class="productName"> ${name} </p>
    <span class="price"> $${price * cant}</span>
  </div>
  <div class="moreLess">
    <span class= "less" data-id=${id}>-</span>
    <span class="cant">${cant}</span>
    <span class="more" data-id=${id}>+</span>
  </div>
  </div>`;
};

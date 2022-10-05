//Elementos HTML-------------------------------------

const catalogContainer = document.querySelector(".catalog__products");
const categoriesList = document.querySelectorAll(".categories__card");
const categoryfilter = document.querySelectorAll(".filterCat");
const cartBTN = document.getElementById("CartBTN");
const closeCart = document.querySelector(".close");
const cartSection = document.querySelector(".cart");
const cantCart = document.querySelector(".cantCart");
const cartContainer = document.querySelector(".cart__Container");
const total = document.querySelector(".total");
const userlog = document.querySelector(".userLog");
const displaylog = document.querySelector("#logdisplay");
const header = document.querySelector(".header");
const menu = document.querySelector(".hamburger");

//Usuario
let baseDeDatos = [];
let usuarioLogueado = [];
let user = getCookie(`usuario`);
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
descargarDatos();

let ultimoScrollTop;
window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > ultimoScrollTop) {
    header.style.top = "-110px";
  } else {
    header.style.top = "0";
  }

  ultimoScrollTop = scrollTop;
});
//Funciona para descargar los datos del local storage a traves de la cookie traida del login
function descargarDatos() {
  if (localStorage.getItem(`baseDeDatos`)) {
    baseDeDatos = JSON.parse(localStorage.getItem(`baseDeDatos`));
  }
  if (localStorage.getItem(user)) {
    usuarioLogueado = JSON.parse(localStorage.getItem(user));
  }
  pintarDatos();
}

//Funcion que elimina la cookie
function eliminarCookie(cname) {
  return (document.cookie =
    cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/index.html");
}
//Funcion que redirecciona al login
function alLogin() {
  location.assign("./login.html");
}
function desloguear() {
  eliminarCookie(`usuario`);
  pintarDatos();
  alLogin();
}

function pintarDatos() {
  if (usuarioLogueado.length === 0) {
    userlog.innerHTML = "";
  } else {
    userlog.innerHTML = `<p class="saludo">¡Bienevenido ${usuarioLogueado.nombre}!</p>
    <button class="deslog">Salir</button>`;
    displaylog.classList.add("displayONOFF");
    header.classList.remove("header");
    header.classList.add("header2");
    const deslogBTN = document.querySelector(".deslog");
    deslogBTN.addEventListener("click", desloguear);
  }
}
//--------------------------------------------------
//Seteo del local storage para el carro
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};
//Mostrar y ocultar cart section
cartBTN.addEventListener("click", (e) => {
  e.preventDefault();
  cartSection.classList.toggle("display");
});
closeCart.addEventListener("click", (e) => {
  e.preventDefault();
  cartSection.classList.toggle("display");
});

//Filtro por categorias

const filterCategory = (e) => {
  const selectedCategory = e.target.dataset.category;
  const categories = [...categoriesList];
  const categoriesFilt = [...categoryfilter];
  categories.forEach((category) => {
    if (category.dataset.category !== selectedCategory) {
      category.classList.remove("active");
    } else {
      category.classList.add("active");
    }
  });
  categoriesFilt.forEach((category) => {
    if (category.dataset.category !== selectedCategory) {
      category.classList.remove("active");
    } else {
      category.classList.add("active");
    }
  });
};
const filterProducts = (e) => {
  if (!e.target.classList.contains("filterCat")) return;
  const target = e.target;
  if (target.classList.contains("active")) {
    target.classList.remove("active");
    return renderingHtml(stockProducts);
  } else {
    filterCategory(e);
  }
  const filterProductCategory = stockProducts.filter(
    (product) => product.category === target.dataset.category.toLowerCase()
  );
  renderingHtml(filterProductCategory);
  window.location.href = "#catalog";
};
//Renderizado del catalogo
const renderingHtml = (stock) => {
  return (catalogContainer.innerHTML = stock
    .map((product) => renderProductCard(product))
    .join(""));
};
//Renderizado del carro de compras
const renderCart = (cartList) => {
  if (!cartList.length) {
    cartContainer.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
    return;
  }
  cartContainer.innerHTML = cart.map(renderCardCart).join("");
  showTotal(cart);
  showCant(cart);
};

const showCant = (cart) => {
  if (cart.length === 0) {
    cantCart.innerHTML = "";
    cantCart.classList.remove("cantActive");
    return;
  }
  cantCart.classList.add("cantActive");
  cantCart.innerHTML = `${cart.length}`;
};
const showTotal = (cartList) => {
  return (total.innerHTML = `$${cartList
    .reduce((acc, cur) => Number(acc) + Number(cur.price) * Number(cur.cant), 0)
    .toFixed(2)}`);
};
const addToCart = (e) => {
  if (!e.target.classList.contains("product")) return;
  const products = [...stockProducts];
  products.forEach((product) => {
    if (product.id == Number(e.target.dataset.id)) {
      const AddedProduct = {
        id: e.target.dataset.id,
        name: e.target.dataset.name,
        img: e.target.dataset.img,
        price: e.target.dataset.price,
      };
      const existingCartItem = cart.find((item) => item.id === AddedProduct.id);
      if (existingCartItem) {
        cart = cart.map((item) => {
          return item.id === AddedProduct.id
            ? { ...item, cant: Number(item.cant) + 1 }
            : item;
        });
      } else {
        cart = [...cart, { ...AddedProduct, cant: 1 }];
      }
      saveLocalStorage(cart);
      renderCart(cart);
      showTotal(cart);
      showCant(cart);
    }
  });
};
//Manejo de las cantidades
const handleQuantity = (e) => {
  if (e.target.classList.contains("less")) {
    const existingCartItem = cart.find(
      (item) => item.id === e.target.dataset.id
    );
    if (existingCartItem.cant === 1) {
      if (window.confirm("¿Desea Eliminar el producto del carrito?")) {
        cart = cart.filter((prod) => prod.id !== existingCartItem.id);
        saveLocalStorage(cart);
        renderCart(cart);
        showTotal(cart);
        disableBuyBtn();
        showCant(cart);

        return;
      }
    }
    cart = cart.map((item) => {
      return item.id === existingCartItem.id
        ? item.cant > 1
          ? { ...item, cant: Number(item.cant) - 1 }
          : { ...item, cant: 1 }
        : item;
    });
  } else if (e.target.classList.contains("more")) {
    const existingCartItem = cart.find(
      (item) => item.id === e.target.dataset.id
    );
    cart = cart.map((item) => {
      return item.id === existingCartItem.id
        ? { ...item, cant: Number(item.cant) + 1 }
        : item;
    });
  }
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
  disableBuyBtn();
};
//slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//Inicializacion
const init = () => {
  renderingHtml(stockProducts);
  catalogContainer.addEventListener("click", addToCart);
  cartContainer.addEventListener("click", handleQuantity);
  document.addEventListener("DOMContentLoaded", renderCart(cart));
};

init();

categoriesList.forEach((btn) => {
  btn.addEventListener("click", filterProducts);
});
function toggleMenu(event) {
  this.classList.toggle("is-active");
  document.querySelector(".menuppal").classList.toggle("is_active");
  event.preventDefault();
}
menu.addEventListener("click", toggleMenu, false);

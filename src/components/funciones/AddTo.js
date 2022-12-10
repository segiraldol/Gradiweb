function addToCart(producto, id, fimg, price, color, size, cantidad) {
  producto = {
    id: id,
    Featured_image: fimg,
    Price: price,
    color: color,
    size: size,
    Cantidad: cantidad,
    Total: cantidad * price,
  };
  return producto;
};

function addToFav(producto, id, fimg, price, color, size, cantidad) {
  producto = {
    id: id,
    Featured_image: fimg,
    Price: price,
    color: color,
    size: size,
    Cantidad: cantidad,
  };
  return producto;
};
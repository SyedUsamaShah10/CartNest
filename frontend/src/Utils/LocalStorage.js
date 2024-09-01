//Add a product to localstorage
export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((pd) => pd._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

//Remove a product from localStorage
export const removeFavoriteFromLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  const updateFavorites = favorites.filter((pd) => pd._d !== product._id);

  localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};

//Retrieve favorites from localStorage
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};

function iniciarApp() {
  obtenerCategorias();

  function obtenerCategorias() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    fetch(url)
      .then(res => res.json())
      .then(res => {

      });
  };
};
document.addEventListener('DOMContentLoaded', iniciarApp);

function iniciarApp() {
  const categoriasSelect = document.querySelector('#categorias')
  obtenerCategorias();

  function obtenerCategorias() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    fetch(url)
      .then(res => res.json())
      .then(res => mostrarCategorias(res.categories));
  };

  function mostrarCategorias(categorias = []) {
    categorias.forEach(categoria => {
      const option = document.createElement('OPTION');
      const {strCategory} = categoria;
      option.value = strCategory;
      option.textContent = strCategory;
      categoriasSelect.appendChild(option)
    });
  };
};
document.addEventListener('DOMContentLoaded', iniciarApp);

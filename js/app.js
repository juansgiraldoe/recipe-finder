function iniciarApp() {
  const categoriasSelect = document.querySelector('#categorias');
  categoriasSelect.addEventListener('change', seleccionarCategoria)
  
  const resultado = document.querySelector('#resultado');

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

  function seleccionarCategoria(e) {
    const categoria = e.target.value;
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
    fetch(url)
      .then(res => res.json())
      .then(res => mostrarPlatos(res.meals));
  };

  function mostrarPlatos(res = []) {
    res.forEach(plato => {
      const { idMeal, strMeal, strMealThumb } = plato;

      const contenedor = document.createElement('DIV');
      contenedor.classList.add('col-md-4');
      
      const card = document.createElement('DIV');
      card.classList.add('card', 'mb-4');
      
      const image = document.createElement('IMG');
      image.classList.add('card-img-top');
      image.alt = `Imagen de la receta ${strMeal}`;
      image.src = strMealThumb;

      const recetaBody = document.createElement('DIV');
      recetaBody.classList.add('card-body');

      const headingReceta = document.createElement('H3');
      headingReceta.classList.add('card-title', 'mb-3');
      headingReceta.textContent = strMeal;

      const recetaBtn = document.createElement('BUTTON');
      recetaBtn.classList.add('btn', 'btn-danger', 'w-100');
      recetaBtn.textContent = 'Ver receta.'

      //Inyectar en el DOM.
      recetaBody.appendChild(headingReceta);
      recetaBody.appendChild(recetaBtn);

      card.appendChild(image);
      card.appendChild(recetaBody);

      contenedor.appendChild(card);

      resultado.appendChild(contenedor);


    });
  };
};
document.addEventListener('DOMContentLoaded', iniciarApp);

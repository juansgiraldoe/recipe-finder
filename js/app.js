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
    limpiarHtml(resultado);

    const headingResultados = document.createElement('H2');
    headingResultados.classList.add('text-center', 'my-5', 'text-black');
    headingResultados.textContent = res.length ? 'Resultados.' : 'No hay resutados.';
    resultado.appendChild(headingResultados);

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
      recetaBtn.textContent = 'Ver receta.';
      // recetaBtn.dataset.bsTarget = '#modal';
      // recetaBtn.dataset.bsToggle = 'modal';
      recetaBtn.onclick = function () {
        seleccionarReceta(idMeal);
      };

      //Inyectar en el DOM.
      recetaBody.appendChild(headingReceta);
      recetaBody.appendChild(recetaBtn);

      card.appendChild(image);
      card.appendChild(recetaBody);

      contenedor.appendChild(card);

      resultado.appendChild(contenedor);
    });
  };

  function seleccionarReceta(id) {
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    
  };

  function limpiarHtml(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  }
};
document.addEventListener('DOMContentLoaded', iniciarApp);

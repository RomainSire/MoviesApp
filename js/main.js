'use strict';

/* ----------------------------------------------------------- *|
  CODE PRINCIPAL (exécuté lorsque l'arbre html est chargé)
|* ----------------------------------------------------------- */
$(function() {

  // Gestionnaires d'évennements
  $('#search-form').on('submit', onSearchMovie); // On écoute l'envoi du formulaire de recherche d'un film
  $('main').on('click', 'figure', onMovieClicked);  // on écoute le click sur un film pour afficher les détails
  $('nav a').on('click', onNavClicked); // on écoute le click sur les liens de navigation

  // On affiche ces films Tendance
  var theMovieDbPath = 'https://api.themoviedb.org/3/trending/movie/week?api_key=f3a7347fd19c436dc3e9858efb1769c5&include_adult=false&language=fr'; // requete The Movie DB pour afficher les films tendance
  var title = 'Films tendance'  // Le titre de ce qui sera affiché
  displayMovieList(theMovieDbPath, title); // On lance la fonction de requête et d'affichage de la liste de films
});

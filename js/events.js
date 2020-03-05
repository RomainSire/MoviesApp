/* ----------------------------------------------------------- *|
  Fonction exécuté lors d'une recherche d'un film
|* ----------------------------------------------------------- */
function onSearchMovie(event) {
  event.preventDefault() // Bloquer l'envoi du formulaire

  var userSearch = $('#search').val();  // la recherche de l'utilisateur est enregistrée dans une variable
  var userSearchModified = userSearch.toLowerCase().replace(' ', '+'); // modifications de la réponse de l'utilisateur

  // On crée le chemin d'accès pour la requête The Movie DB
  theMovieDbPath = 'https://api.themoviedb.org/3/search/movie?api_key=f3a7347fd19c436dc3e9858efb1769c5&language=fr&include_adult=false&page=1&query=' + userSearchModified;
  // titre de ce qui sera affiché :
  var title = 'Recherche : ' + userSearch;
  console.log(theMovieDbPath);
  console.log(title);

  // On envoie la requête et on affiche la liste grâce à la fonction qui va bien
  displayMovieList(theMovieDbPath, title);
}

/* ----------------------------------------------------------- *|
  Fonction exécutée lors d'un click sur un film pour afficher les détails
|* ----------------------------------------------------------- */
function onMovieClicked() {
  // enlever la classe "clicked" à tous les éléments
  $('.movie-list figure').removeClass('clicked');
  // mettre la classe 'clicked' sur l'élément clické
  $(this).addClass('clicked');

  var movieIndex = $(this).data('id');  // récupération de l'ID du film
  displayMovieDetails(movieIndex);  // Exécuter la fonction qui permet d'afficher les détails d'un film

  $('html, body').animate({ scrollTop: 0 }, 'slow'); // scroll doucement (le temps que les datails se chargent) jusqu'en haut de la page
}

/* ----------------------------------------------------------- *|
  Fonction exécutée lors d'un click sur un lien de navigation
|* ----------------------------------------------------------- */
function onNavClicked(event) {
  event.preventDefault() // Ne pas suivre le lien

  // enlever la classe "clicked" à tous les éléments
  $('nav a').removeClass('clicked');
  // mettre la classe 'clicked' sur l'élément clické
  $(this).addClass('clicked');

  var type = $(this).data('type'); // on récupère Movie ou TV
  var genre = $(this).data('genre-id'); // on récupère l'id du genre
  var genreName = $(this).data('genre-name'); // on récupère le nom du genre
  var path = 'https://api.themoviedb.org/3/discover/' + type + '?api_key=f3a7347fd19c436dc3e9858efb1769c5&language=fr&sort_by=popularity.desc&include_adult=false&page=1&with_genres=' + genre;
  var name = 'Genre : ' + genreName;

  displayMovieList(path, name);

}
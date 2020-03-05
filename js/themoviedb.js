/* ----------------------------------------------------------- *|
  Fonction permettant d'avoir le chemin de l'image du film
|* ----------------------------------------------------------- */
function posterPath(movie, dimension) {
  if (movie.poster_path == null) {
    return "img/no-poster.jpg"   // si l'image n'est pas disponible, l'image "no-poster.jpg" est affichée
  }
  return 'http://image.tmdb.org/t/p/'+ dimension + movie.poster_path; // sinon le chemin the movie db est créé
}
/* ----------------------------------------------------------- *|
  Fonction permettant d'avoir le chemin de l'image du film
|* ----------------------------------------------------------- */
function backdropPath(movie, dimension) {
  if (movie.backdrop_path == null) {
    return "img/no-image.jpg"   // si l'image n'est pas disponible, l'image "no-poster.jpg" est affichée
  }
  return 'http://image.tmdb.org/t/p/'+ dimension + movie.backdrop_path; // sinon le chemin the movie db est créé
}


/* ----------------------------------------------------------- *|
  Fonction permettant d'afficher une liste de films
|* ----------------------------------------------------------- */
function displayMovieList(theMovieDbPath, searchTitle) {
  // requete jQuery à la base de données the movie database. enregistré dans "request"
  $.getJSON(theMovieDbPath, function(request) {
    var trendingMovies = request.results; // request est un objet, avec la catégorie qui nous intéresse : "results". c'est un tableau qui contient les objets relatifs aux films
    
    var section = $('<section class="movie-list">');  // on crée un élément section
    var title = $('<h2>' + searchTitle + '</h2>')
    section.append(title);
    $.each(trendingMovies, function(index, movie) {  // pour chaque élément du tableau contenant les objets movie :
      console.log(movie.release_date);
      if (movie.release_date === undefined) {
        movie.release_date = "Date inconnue"
      } else {
        movie.release_date = movie.release_date.substring(0,4)
      }
      var figure = $('<figure data-id="' + movie.id + '"><img src="' + posterPath(movie, 'w154') + '" alt="Affiche du film ' + movie.title + '"><figcaption>' + movie.title + ' - ' + movie.release_date + '</figcaption></figure>'); // création des éléments figure, img, et figcaption

      section.append(figure); // et mettre la figure dans ma section
    });
    $('main').empty().append(section); // on affiche le ul, càd la liste des films tendance
  });
}

/* ----------------------------------------------------------- *|
  Fonction permettant d'afficher les détails d'un film
|* ----------------------------------------------------------- */
function displayMovieDetails(id) {
  // Création du chemin d'accès de la requête :
  var path = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=f3a7347fd19c436dc3e9858efb1769c5&language=fr'
  // requete jQuery à la base de données the movie database. enregistré dans "request"
  $.getJSON(path, function(movie) {
    // movie est un objet qui contient toutes les infos du film
    var section = $('<section class="movie-detail">');  // on crée un élément section
    section.append($('<img src="' + backdropPath(movie, 'w500') + '" alt="Affiche du film ' + movie.title + '">'))
    section.append($('<h2>' + movie.title + '</h2>'));
    section.append($('<p><em>Durée :</em> ' + movie.runtime + ' min</p>'));
    section.append($('<p><em>Date de sortie :</em> '
                    + movie.release_date.substring(8,10) + '/'
                    + movie.release_date.substring(5,7) + '/'
                    + movie.release_date.substring(0,4) + '</p>'));

    var genresList = movie.genres[0].name
    for (var i = 1; i < movie.genres.length; i++) {
      genresList = genresList + ', ' + movie.genres[i].name;
    }
    section.append($('<p><em>Genres :</em> ' + genresList + '</p>'));

    section.append($('<p><em>Titre original :</em> ' + movie.original_title + ' (' + movie.original_language + ')</p>'));
    section.append($('<p><em>Synopsis :</em></p>'));
    section.append($('<p>' + movie.overview + '</p>'));
    section.append($('<div class="clear"></div>'));

    $('.movie-detail').remove(); // s'il y a un film déjà affiché, le supprimer !
    $('main').append(section); // on affiche le ul, càd la liste des films tendance
  });
}

$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=16b54dfa&s=" + $(".input-keyword").val(),
    success: (results) => {
      const film = results.Search;
      let cards = "";
      film.forEach((f) => {
        cards += showCards(f);
      });
      $(".movie-container").html(cards);
      // when tombol detail di click
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=16b54dfa&i=" +
            $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = showMovieDetail(m);
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showCards(f) {
  return `<div class="col-md-4 my-3">
    <div class="card">
      <img src="${f.Poster}" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">${f.Title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${f.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal"
        data-bs-target="#detailFilmModal" data-imdbid="${f.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${m.Poster}" class="img-fluid" />
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4>${m.Title} ${m.Year}</h4>
                  </li>
                  <li class="list-group-item">
                    <strong>Director : </strong>${m.Director}
                  </li>
                  <li class="list-group-item">
                    <strong>Actor : </strong>${m.Actors}
                  </li>
                  <li class="list-group-item">
                    <strong>IMDB Rating : </strong> ${m.imdbRating}
                  </li>
                  <li class="list-group-item">
                    <strong>Plot : </strong>${m.Plot}
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
}

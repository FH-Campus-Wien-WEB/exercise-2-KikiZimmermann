window.onload = function () {
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const bodyElement = document.querySelector("body");

    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);

      for (const movie of movies) {
        /* Task 1.3. Add your code from exercise 1 here 
           and include a non-functional 'Edit' button
           to pass this test */

        const movieElement = document.createElement("article");
        movieElement.id = movie.imdbID;

        const titleElement = document.createElement("h1");
        const infoElement = document.createElement("p");
        const genresElement = document.createElement("div");
        const directorsTitle = document.createElement("h2");
        const directorsList = document.createElement("ul");
        const writersTitle = document.createElement("h2");
        const writersList = document.createElement("ul");
        const actorsTitle = document.createElement("h2");
        const actorsList = document.createElement("ul");
        const plotElement = document.createElement("p");

        const ratingElement = document.createElement("p");
        ratingElement.className = "rating";

        const metascoreText = document.createElement("span");
        metascoreText.textContent = "Metascore: " + movie.Metascore + " ";

        const imdbStars = document.createElement("span");
        imdbStars.className = "stars";

        const posterElement = document.createElement("img");
        const buttonElement = document.createElement("button");


        titleElement.textContent = movie.Title;

        const hours = Math.floor(movie.Runtime / 60);
        const minutes = movie.Runtime % 60;
        const date = new Date(movie.Released)
        const formattedDate = date.toLocaleDateString("en-GB")
        infoElement.textContent =
          "Runtime " + hours + "h " + minutes + "m | Released on " + formattedDate;

        for (const genre of movie.Genres) {
          const genreElement = document.createElement("span");
          genreElement.className = "genre " + genre.toLowerCase().replace(" ", "-");
          genreElement.textContent = genre;
          genresElement.append(genreElement);
        }

        directorsTitle.textContent = "Directors";
        for (const director of movie.Directors) {
          const li = document.createElement("li");
          li.textContent = director;
          directorsList.append(li);
        }

        writersTitle.textContent = "Writers";
        for (const writer of movie.Writers) {
          const li = document.createElement("li");
          li.textContent = writer;
          writersList.append(li);
        }

        actorsTitle.textContent = "Actors";
        for (const actor of movie.Actors) {
          const li = document.createElement("li");
          li.textContent = actor;
          actorsList.append(li);
        }

        plotElement.textContent = movie.Plot;


        // rating stars
        const rating = movie.imdbRating / 2;

        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        imdbStars.innerHTML = "";

        // half star
        for (let i = 0; i < fullStars; i++) {
          imdbStars.innerHTML += '<span class="star full">★</span>';
        }

        // full star
        if (hasHalfStar) {
          imdbStars.innerHTML += '<span class="star half">★</span>';
        }

        // empty star
        for (let i = 0; i < emptyStars; i++) {
          imdbStars.innerHTML += '<span class="star empty">★</span>';
        }

        imdbStars.title = "IMDb Rating: " + movie.imdbRating + " / 10";

        //rating element
        ratingElement.append(metascoreText);
        ratingElement.append(" | ");
        ratingElement.append(imdbStars);

        posterElement.src = movie.Poster;
        posterElement.alt = movie.Title + " poster";

        buttonElement.textContent = "Edit";
        buttonElement.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };

        movieElement.append(posterElement);
        movieElement.append(titleElement);
        movieElement.append(infoElement);
        movieElement.append(ratingElement);
        movieElement.append(genresElement);
        movieElement.append(plotElement);
        movieElement.append(directorsTitle);
        movieElement.append(directorsList);
        movieElement.append(writersTitle);
        movieElement.append(writersList);
        movieElement.append(actorsTitle);
        movieElement.append(actorsList);
        movieElement.append(buttonElement);

        bodyElement.append(movieElement);

      }

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
        xhr.status +
        " - " +
        xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};

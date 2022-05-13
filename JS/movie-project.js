"use strict";

const URL = "https://flint-capable-earthquake.glitch.me/movies";

const displayMovies = () => {
    return fetch(URL)
        .then(res => res.json())
        .then(movies => {
            console.log(movies);
            // $('#loading').replaceWith('');
            let html = '';
            movies.forEach(movie => {
                html += `<div class="movie">
                        <img class="poster" src="${movie.poster}" alt="a movie poster">
                        <h5 contenteditable="true" id="edit">${movie.title}</h5>
                        <h6 contenteditable="true" id="edit">Rating: ${movie.rating}</h6>
                        <button type="button" class="delete" id="${movie.id}">Delete</button>
                    </div>
                    <br>`
            });
            $('#movies').replaceWith(html)
        })
        .catch(error => {
            console.log(error);
        });
}
displayMovies();

function deleteMovie(id) {
    fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(() => {
            console.log(`Deleted: ${id}`)
        })
        .catch(console.error)
}

// *** DELETE BUTTON FUNCTIONALITY ***

let timeoutForDelete = setTimeout(function() {
    $('.delete').click(function(e) {
        e.preventDefault();
        var id = $(e.target).attr('id');
        deleteMovie(id);
        // location.reload(true);
    });
}, 1000);
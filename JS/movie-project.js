"use strict";

const URL = "https://beryl-chalk-crown.glitch.me/movies";

// *** RENDER MOVIES ***
let html = '';
const displayMovies = () => {
    fetch(`${URL}/`)
        .then(res => res.json())
        .then(movies => {
            // console.log(movies);
            $('#page-loading').replaceWith('');
            movies.forEach(movie => {
                html += ` <tbody class="movie">
    <tr>
        <th scope="row"><img class="poster" src="${movie.poster}" alt="a movie poster"</th>
        <td><h5 contenteditable="true" id="edit">${movie.title}</h5></td>
        <td><h6 contenteditable="true" id="edit">⭐️ ${movie.rating}</h6></td>
        <td><input class="btn btn-dark my-2 my-sm-0" type="submit" id="update" value="Save Edits"></td>
        <td><button type="button" class="delete" id="${movie.id}">Delete</button></td>
    </tr>
    </tbody>
    <br>`
            });
            $('#movies-list').replaceWith(html)
        })
        .catch(error => {
            console.log(error);
        });
}
displayMovies();

// *** POST FUNCTION ***
$('#add-new-movie').click(function(e) {
    e.preventDefault();
    const moviePost = {id: '', title: $('#title').val(), rating: $('#rating').val()};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(moviePost),
    };
    fetch(URL, options)
        .then(res => res.json())
        .then(newMovie => {
            console.log(newMovie);
            html = `<div class="movie">
                        <h5 contenteditable="true" id="edit-title">${newMovie.title}</h5>
                        <h6 contenteditable="true" id="edit-rating">Rating: ${newMovie.rating}</h6>
                    </div>
                    <br>`
            $('#movie').append(html);
        });
    setTimeout(function (){
        location.reload();
    },1000);

});

// *** DELETE FUNCTIONALITY ***
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
        console.log(id)
        deleteMovie(id);
        setTimeout(function (){
            location.reload();
        },1000);
    });
}, 1000);
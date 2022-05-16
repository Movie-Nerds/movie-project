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
        <td><button class="edit-btn btn btn-dark my-2 my-sm-0" id="${movie.id}">Edit</button></td>
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

// *** EDIT FUNCTIONALITY ***
$('#movies-list').html(html);
$(document).on('click', '.edit-btn', function(e) {
    e.preventDefault();
    console.log("test");
    var id = $(e.target).attr('id');
    console.log(populateEdit(id));

});

$('#edit-tab').click(() => {
    $('#edit-form').toggleClass('hide');
    $('#edit-right').toggleClass('hide');
    $('#edit-left').toggleClass('hide');
});

const populateEdit = (movieID) => {
    fetch(`${URL}/${movieID}`)
        .then(resp => resp.json())
        .then(movie => {
            $('#edit-title').val(movie.title);
            $('#edit-rating').val(movie.rating);
            $('#movie-id').val(movieID);
        })
        .catch(err => console.error(err));
}
// APPLY EDIT'S FUNCTION
$('#edit-apply').click(function (e) {
    e.preventDefault();
    let title = $('#edit-title').val();
    let rating = $('#edit-rating').val();
    let id = $('#movie-id').val();
    let editedMovie = {id, title, rating};
    console.log(editedMovie);
    editMovie(editedMovie);
    setTimeout(function (){
        location.reload();
    },1500);
});

// PATCH REQUEST
const editMovie = (movie) => {
    let options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(movie)
    }
    return fetch(`${URL}/${movie.id}`, options).then(resp => resp.json()).then(displayMovies()).catch(err => console.error(err));
}

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



"use strict";

const URL = "https://boiling-hissing-moonflower.glitch.me/movies";

// *** RENDER MOVIES ***
let html = '';
const displayMovies = () => {
    return fetch(URL)
        .then(res => res.json())
        .then(movies => {
            console.log(movies);
            $('#loading').replaceWith('');
            movies.forEach(movie => {
                html += `<tbody class="movie">
                        <tr>
           <th scope="row"><img class="poster" src="${movie.poster}" alt="a movie poster"</th>
            <td><h5 contenteditable="true" id="edit">${movie.title}</h5></td>
            <td><h6 contenteditable="true" id="edit">⭐️ ${movie.rating}</h6></td>
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
                        <h5>${newMovie.title}</h5>
                        <h6>Rating: ${newMovie.rating}</h6>
                    </div>
                    <br>`
            $('#movie').append(html);
        });
    setTimeout(function (){
        location.reload();
    },1000);

});

// *** DELETE BUTTON FUNCTIONALITY ***
// const deleteMovie = (movieID) => {
//     let options = {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//     }
//     return fetch(`${URL}/${movieID}`, options).then(displayMovies).catch(err => console.error(err));
// }
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
let timeoutForDelete = setTimeout(function() {
    $('.delete').click(function(e) {
        e.preventDefault();
        var id = $(e.target).attr('id');
        deleteMovie(id);
        setTimeout(function (){
            location.reload();
        },1000);
    });
}, 1000);

//Edit button function


const editMovie = (movie) => fetch(`${URL}/${movie.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie)
})
    .then(res => res.json())
    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
    });

fetch(URL, editMovie)
    .then(response => response.json())
    .then(editPost => {
        console.log(editPost);
        html += `<div class="movies" id="${editPost.id}">
                        <h5 contenteditable="true">${editPost.title}</h5>
                        <h6 contenteditable="true">Rating: ${editPost.rating}</h6>
                    </div>
                    <br>`
        $('').replaceWith(html);
    });

$("#update").click(function(e) {
    e.preventDefault();
    // let id = $(e.target).attr('id')
    // alert("clicked!");
    // editMovie(id)
});















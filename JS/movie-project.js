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
                html += `<table class="table-striped">
           <tr>
           <th scope="row"><img class="poster" src="${movie.poster}" alt="a movie poster" width="45" height="67"</th>
            <td><h5 contenteditable="true" id="edit">${movie.title}</h5></td>
            <td>${movie.rating}</td>
            <td><button type="button" class="delete" id="${movie.id}">Delete</button></td>
            </tr>
           </table>
                    <br>`
            });


            $('#movies').replaceWith(html)







            // let html = '';
            // movies.forEach(movie => {
            //     html += `<div class="movie">
            //             <img class="poster" src="${movie.poster}" alt="a movie poster">
            //             <h5 contenteditable="true" id="edit">${movie.title}</h5>
            //             <h6 contenteditable="true" id="edit">Rating: ${movie.rating}</h6>
            //             <button type="button" class="delete" id="${movie.id}">Delete</button>
            //         </div>
            //         <br>`
            // });
            //
            // // var table = $("#movies tbody");
            // // $.each(data, function(idx, movie){
            // //     table.append("<tr><td>"+movie.poster+"</td><td>"+movie.title+"</td><td>"+movie.rating+"</td><td>"+movie.id+"</td></tr>");
            // // });
            // $('#movies').replaceWith(html)
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
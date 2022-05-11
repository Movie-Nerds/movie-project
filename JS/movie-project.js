"use strict";

const URL = "https://codeup-json-server.glitch.me/movies";

var movieList = () => {
    return fetch(URL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            displayMovies(data);
            // data.forEach(post => {
            // console.log(post.id);
            // $('div').append(
            //     `<p data-id="${post.id}">${post.title} + <img class="poster" src="${post.poster}"> + ${post.director} + ${post.actors}</p>`)

        })
        .catch(err => console.error(err));
    // });
}
console.log(movieList());

const displayMovies = (movies) => {
    var html = "";
    movies.forEach(movie => {
        html += $('div').append(
            `<p data-id="${movie.id}">${movie.title} + <img class="poster" src="${movie.poster}"> + ${movie.director} + ${movie.actors}</p>`)

    })
}
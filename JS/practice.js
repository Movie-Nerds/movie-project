// var table = $("#table tbody");
// $.each(data, function(idx, elem){
//     table.append("<tr><td>"+elem.poster+"</td><td>"+elem.title+"</td><td>"+elem.rating+"</td><td>"+elem.button+"</td></tr>");
// });
//
//
//
//
// let html = '';
// movies.forEach(movie => {
//     html += `<table class="movie">
//             table.append(
//             "<tr>
//             <td><img class="poster" src="${movie.poster}" alt="a movie poster"></td>
//             <td>${movie.title}</td>
//             <td>${movie.rating}</td>
//             <td><button type="button" class="delete" id="${movie.id}">Delete</button></td>
//             </tr>");
//            </table>
//                     <br>`
// });
//
//
// $('#movies').replaceWith(html)



// var table = $("#movies tbody");
// $.each(data, function(idx, movie){
//     table.append("<tr><td>"+movie.poster+"</td><td>"+movie.title+"</td><td>"+movie.rating+"</td><td>"+movie.id+"</td></tr>");
// });


const displayMovies = () => {
    return fetch(URL)
        .then(res => res.json())
        .then(movies => {
            console.log(movies);
            // $('#loading').replaceWith('');
            let html = '';
            movies.forEach(movie => {
                html += `<table class="table table-striped">
            <thead>
<!--    <tr>-->
<!--        <th scope="col"></th>-->
<!--        <th scope="col">Title</th>-->
<!--        <th scope="col">Rating</th>-->
<!--        <th scope="col">Delete</th>-->
<!--    </tr>-->
    </thead>
    <tbody>
           <tr>
           <th scope="row"><img class="poster" src="${movie.poster}" alt="a movie poster"</th>
            <td><h5 contenteditable="true" id="edit">${movie.title}</h5></td>
            <td><h6 contenteditable="true" id="edit">Rating: ${movie.rating}</h6></td>
            <td><button type="button" class="delete" id="${movie.id}">Delete</button></td>
            </tr>
            </tbody>
           </table>
                    <br>`
            });


            $('#movies').replaceWith(html)
        }



    <tbody class="movie">
    <tr>
        <th scope="row"><img class="poster" src="${movie.poster}" alt="a movie poster"</th>
        <td><h5 contenteditable="true" id="edit">${movie.title}</h5></td>
        <td><h6 contenteditable="true" id="edit">⭐️ ${movie.rating}</h6></td>
        <td><input class="btn btn-dark my-2 my-sm-0" type="submit" id="update" value="Save Edits"></td>
        <td><button type="button" class="delete" id="${movie.id}">Delete</button></td>
    </tr>
    </tbody>
    <br>`
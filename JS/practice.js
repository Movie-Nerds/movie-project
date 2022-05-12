var table = $("#table tbody");
$.each(data, function(idx, elem){
    table.append("<tr><td>"+elem.poster+"</td><td>"+elem.title+"</td><td>"+elem.rating+"</td><td>"+elem.button+"</td></tr>");
});




let html = '';
movies.forEach(movie => {
    html += `<table class="movie">
            table.append(
            "<tr>
            <td><img class="poster" src="${movie.poster}" alt="a movie poster"></td>
            <td>${movie.title}</td>
            <td>${movie.rating}</td>
            <td><button type="button" class="delete" id="${movie.id}">Delete</button></td>
            </tr>");
           </table>
                    <br>`
});


$('#movies').replaceWith(html)



// var table = $("#movies tbody");
// $.each(data, function(idx, movie){
//     table.append("<tr><td>"+movie.poster+"</td><td>"+movie.title+"</td><td>"+movie.rating+"</td><td>"+movie.id+"</td></tr>");
// });
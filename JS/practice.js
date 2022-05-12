var table = $("#table tbody");
$.each(data, function(idx, elem){
    table.append("<tr><td>"+elem.poster+"</td><td>"+elem.title+"</td><td>"+elem.rating+"</td><td>"+elem.button+"</td></tr>");
});
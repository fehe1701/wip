window.onload = loadPosts();

// Läs in bilar med AJAX
function loadPosts() {
    $.getJSON("http://localhost:3000/api/posts", function(data) {

        // Rensa listan
        $("#postlist").html("");

        for(var i=0; i<data.length; i++) {
            $("#postlist").append("<li>" + data[i]._id + ": " + data[i].name + " " + data[i].text + "  - <span onclick='deletePost(\"" + data[i]._id + "\")'>Radera</span></li>");
        }
    }); 
}

// Lägg till bil
function addPost(event) {
    // Läs in värden
    var nameValue = document.getElementById("name").value;
    var textValue = document.getElementById("text").value;

    // AJAX-anrop
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/posts/add",
        data: { name: nameValue, text: textValue }
    }).done(function(response) {
        console.log(response);

        // Rensa fält
        document.getElementById("name").value = "";
        document.getElementById("text").value = "";
        
        // Ladda om listan
        loadPosts();
    });
}

// Radera bil
function deletePost(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/api/posts/delete/" + id
    }).done(function(response) {
        console.log(response);

        // Ladda om listan
        loadPosts();
    });
}
$(document).ready(function(){
 $.getJSON("/displayInfo", function(response) {
console.log(response);
    response.forEach(function(article) {
      console.log(article);
      var newDiv = "<div class='col m8 offset-m2'>";
      newDiv += "<div class='article-box'>";
      newDiv += "<div class='article-title'>";
      newDiv += "<h3>"+article.title+"</h3>";
      newDiv += "</div>"; //close article-title
      newDiv += "<div class='article-link'>";
      newDiv += "<a href=" + article.link + ">" + 'View Article' + "</a>";
      newDiv += "</div>"; //close article-link
      newDiv += "<div class='article-addNote'>";
      newDiv += "<p>"+'Your Notes'+"</p>";
      newDiv += "<form action='/submit' method='post'>"
        + "<textarea class='form-control' rows='3' name='body'>"
        + "Write Note Here</textarea></br>"
        + "<input type='submit' class='btn btn-default'></form>";
      // newDiv += "<div class='article-showNote'>";
      // newDiv += "<div class='showNote'>"+addedNote+"</div>";
      // newDiv += "<button class='deleteNote btn'>"+'Delete'+"</button>";
      // newDiv += "</div>"; // close-article-showNote
      newDiv += "</div>"; // close-article-addNote
      newDiv += "</div>"; //close-article-box
      newDiv += "</div>"; //col m4



      $(".row").append(newDiv);

    });
  });
});

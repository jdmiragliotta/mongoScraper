$(document).ready(function(){
 $.getJSON("/displayInfo", function(response) {

    response.forEach(function(article) {
      var newDiv = "<div class='col m4'>";
      newDiv += "<div class='article-title'>";
      newDiv += "<h3>"+article.articleTitle+"</h3>";
      newDiv += "</div>"; //close article-title
      newDiv += "<div class='article-link'>";
      newDiv += "<a href=" + article.articleLink + ">" + View Article + "</a>";
      newDiv += "</div>"; //close article-link
      newDiv += "<div class='article-body'>";
      newDiv += "<p>"+Your Notes+"</p>";
      newDiv += "<form action='/submit' method='post'>"
        + "<textarea class='form-control' rows='3' name='body'>"
        + "Write Note Here</textarea></br>"
        + "<input type='submit' class='btn btn-default'></form>";
      newDiv += "</div>"; // close-article body
      newDiv += "</div>"; //col m4



      $(".row").append(newDiv);

    });
  });
});

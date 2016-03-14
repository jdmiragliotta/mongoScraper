$(document).ready(function(){
  $.getJSON("/displayInfo", function(response) {
    response.forEach(function(article) {
      var newDiv = "<div class='col m8 offset-m2'>";
      newDiv += "<div class='article-box'>";
      newDiv += "<div class='article-title'>";
      newDiv += "<h3>"+article.title+"</h3>";
      newDiv += "</div>"; //close article-title
      newDiv += "<div class='article-link'>";
      newDiv += "<a href=" + article.link + ">" + "View Article" + "</a>";
      newDiv += "</div>"; //close article-link
      newDiv += "<div class='article-addNote'>";
      newDiv += "<p>"+'Your Notes'+"</p>";
      newDiv += "<form action='/submit' method='post'>"
        + "<input type='hidden' name='articleId' id='articleInput' value=" + article._id + ">"
        + "<textarea class='form-control' rows='3' name='noteBody'>"
        + "Write Note Here</textarea></br>"
        + "<input type='submit' name='button' class='btn btn-default'></form>";
      newDiv += "</div>"; // close-article-addNote
      newDiv += "</div>"; //close-article-box
      newDiv += "</div>"; //col m8addNote

    $(".row").append(newDiv);

    });
  });

  $.getJSON("/displayNotes", function(response) {
    response.forEach(function(note) {
      var noteDiv = "<div class='article-showNote'>";
      noteDiv += "<div class='showNote'>"+note.noteBody+"</div>";
      noteDiv += "<button class='deleteNote btn'>"+"Delete"+"</button>";
      noteDiv += "</div>"; // close-article-showNote
    $(".article-box").append(noteDiv);

    });
  });
});






 //     var count = article.notes.length;
  //     console.log(count);
  //     if(count === 0 || count === undefined){
  //       newDiv += "<form action='/submit' method='post'>"
  //         + "<input type='hidden' name='articleId' id='articleInput' value=" +article._id + ">"
  //         + "<textarea class='form-control' rows='3' name='noteBody'>"
  //         + "Notes...</textarea></br>"
  //         + "<button type='submit' class='btn btn-default'>Submit</button></form>";
  //       newDiv += "</div>";
  //       newDiv += "</div>";
  //       newDiv += "</div>";

  //       $(".row").append(newDiv);
  //     }
  //     else{
  //       article.notes.forEach(function(note){
  //         console.log(note.notes);
  //         --count;
  //         if(count=== 0){
  //           newDiv += "<form action='/submit' method='post'>"
  //             + "<input type='hidden' name='articleId' id='articleInput' value=" + article._id + ">"
  //             + "<textarea class='form-control' rows='3' name='noteBody'>"
  //             + "Notes...</textarea></br>"
  //             + "<button type='submit' name='button' class='btn btn-default'>Submit</button></form>";
  //           newDiv += "</div>";
  //           newDiv += "</div>";
  //           newDiv += "</div>";

  //           $(".row").append(newDiv);
  //         }
  //         else{
  //           newDiv += "<form action='/delete' method='post'>"
  //             +"<p>"+note.noteBody+"</p>"
  //             +"<input type='hidden' name='articleId' id='articleInput' value=" + article._id + ">"
  //             +"<input type='hidden' name='noteId' id='noteInput' value=" + note._id + ">"
  //             +"<button type='submit' name='button' class='btn btn-default'>Remove</button></form></br>";
  //         }
  //       });
  //     }
  //   });
  // });

$('.add-movies').on('click',function()
{
    $('.formdiv').append('<form></form>');
    $('.formdiv form').append('<input type="text" class="moviename" id="userid" name="moviename" placeholder="Movie Name" required>');
    $('.formdiv form').append('<input type="date" class="moviedate" id="fname" name="moviedate" required>');
    $('.formdiv form').append('<input type="text" class="moviedate" id="fname" name="producer" placeholder="Producer" required>');
    $('.formdiv form').append('<input type="text" class="moviedate" id="fname" name="director" placeholder="Director" required>');
    $('.formdiv form').append('<textarea id="lname" class="actor" placeholder="Actors" name="actor" required></textarea>');
    $('.formdiv form').append('<textarea id="retype-password" class="plot" placeholder="Plot" name="plot" required></textarea>');    
    $('.formdiv form').append('<input type="file" class="poster" id="password" name="poster" required>')
    $('.formdiv form').append('<input type="submit" class="submit" value="Add movie" id="submit">');
    $('.formdiv').css('height','100%');
    $('.formdiv form').attr('action','/addmovie');
    $('.formdiv form').attr('enctype','multipart/form-data');
    $('.formdiv').slideDown();
});
$('#close').on('click',function()
{
    var y=document.querySelectorAll('.formdiv');
      y[0].removeAttribute('style');
    $('.formdiv form').remove();
    $('.formdiv').slideUp();
});
$('.formdiv').on('click','#user',function(e)
{
   if(e.target.id=="forgotanc")
   { 
    $('#searchdiv').css('display','none');
      $('#navbar').css('display','none');  
      $('body').addClass('landing-blur');       
    $(".formdiv form").remove();
    $(".formdiv #user").remove();
    $('.formdiv a i').remove();
    $('.formdiv').append('<a href="#"><i class="fas fa-times" id="close"></i></a>');
    $('.formdiv').append('<form></form>');
    $('.formdiv form').attr('action','/resetpass');
    $('.formdiv form').attr('method','POST');
    $('.formdiv form').append('<input type="email" name="userid" id="userid" placeholder="Enter email" required><br>');
    $('.formdiv form').append('<input type="submit" value="Reset password" id="submit">');
    $('.formdiv').slideDown();
   }
});
$('.formdiv').on("click","a","i",function()
{
    var search=document.querySelector('#searchdiv');
    search.removeAttribute('style');
    var nav=document.querySelector('#navbar');
    nav.removeAttribute('style');   
   $('.formdiv a i').remove(); 
   $('.formdiv #user').remove();
   $('.formdiv form').remove();
   var y=document.querySelectorAll('.formdiv');
   y[0].removeAttribute('style');
   $('.formdiv').slideUp();
   flag=false;
});
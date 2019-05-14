var flag=false;
$('#sign').on("click",function()
{
    if(!flag)
    {
      $('#searchdiv').css('display','none');
      $('#navbar').css('display','none');  
      $('body').addClass('landing-blur');    
      $('.formdiv').append('<a href="#"><i class="fas fa-times" id="close"></i></a>');  
      $('.formdiv').append('<form></form>');
      $('.formdiv form').attr('action','/signin');
      $(".formdiv form").attr('method','POST');
      $('.formdiv form').append("<input type=\"email\" name=\"userid\" id=\"userid\" placeholder=\"Username\" required><br>");
      $('.formdiv form').append("<input type=\"password\" name=\"password\" id=\"signpassword\" placeholder=\"Password\" required><br>");
     $('.formdiv form').append("<input type=\"submit\" value=\"Sign In\" id=\"submit\">");
     $('.formdiv').append('<div id="user"><div id="forgot"><a href="#" id="forgotanc">Forgot password?</a></div><div id="signup"><a href="#" id="signanc">Sign Up</a></div></div>');   
     $('.formdiv').slideDown();
     flag=true;
    }
    else
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
        $('body').removeClass('landing-blur');
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
   $('body').removeClass('landing-blur');
});
$('.formdiv').on('click','#user',function(e)
{   
    if(e.target.id=="signanc")
    {
        $('#searchdiv').css('display','none');
        $('#navbar').css('display','none');  
        $('body').addClass('landing-blur');        
      $(".formdiv form").remove();
      $(".formdiv #user").remove();
      $('.formdiv a i').remove();
      $('.formdiv').append('<a href="#"><i class="fas fa-times" id="close"></i></a>');
      $('.formdiv').append('<form></form>');
      $('.formdiv form').attr('action','/signup');
      $(".formdiv form").attr('method','POST');
     $('.formdiv form').append("<input type=\"text\" name=\"fname\" id=\"fname\" placeholder=\"Fname\" required><br>");
     $('.formdiv form').append("<input type=\"text\" name=\"lname\" id=\"lname\" placeholder=\"Lname\" required><br>");
     $('.formdiv form').append("<input type=\"email\" name=\"userid\" id=\"userid\" placeholder=\"Username\" required><br>");
     $('.formdiv form').append("<input type=\"password\" name=\"password\" id=\"password\" placeholder=\"Password\" required><br>");
     $('.formdiv form').append("<input type=\"password\"  id=\"retype-password\" placeholder=\"Retype Password\" required><br>");
     $('.formdiv form').append("<input type=\"submit\" value=\"Sign Up\" id=\"submit\">");
     $('.formdiv').css('height','85%'); 
     $('.formdiv form').attr('onsubmit','return check()');
     $('.formdiv').slideDown();
     $('body').append('<script src=\"'+'check.js'+'\" id=\"temp\">'+'</script>');
    }
});
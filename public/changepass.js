$('#changepass').on('click',function()
{
    $('#searchdiv').css('display','none');
    $('#navbar').css('display','none');  
    $('body').addClass('landing-blur');    
    $('.formdiv').append('<a href="#"><i class="fas fa-times" id="close"></i></a>');
    $('.formdiv').append('<form></form>');
    $('.formdiv form').attr('action','/changepass?_method=PUT');
    $('.formdiv form').attr('method','POST');
    $('.formdiv form').attr('onsubmit','return check()');
    $('.formdiv form').append('<input type="password" name="password" id="password" placeholder="New password" required><br>');
    $('.formdiv form').append('<input type="password"  id="retype-password" placeholder="Retype password" required><br>');
    $('.formdiv form').append('<input type="submit" value="Change password" id="submit">');
    $('.formdiv').slideDown();
});
$('.formdiv').on('click','a','i',function()
{
    var search=document.querySelector('#searchdiv');
    search.removeAttribute('style');
    var nav=document.querySelector('#navbar');
    nav.removeAttribute('style'); 
    $('body').removeClass('landing-blur'); 
   $('.formdiv a i').remove(); 
   $('.formdiv form').remove();
   var x=document.querySelectorAll('.formdiv');
   x[0].removeAttribute('style');
   $('.formdiv').slideUp();
});
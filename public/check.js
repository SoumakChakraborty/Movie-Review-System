  var x=document.querySelector('.formdiv form #password');
  var y=document.querySelector('.formdiv form #retype-password');
  var flag=false;
  $('.formdiv form #retype-password').on('input',function()
  {
       if(x.value==y.value)
         flag=true;
       else
         flag=false;
  });
function check()
{
    if(flag==true)
      return true;
    else
    {
        $('.formdiv form #password').css('border','1px red solid');
        $('.formdiv form #retype-password').css('border','1px red solid');
        return false;
    }   
}

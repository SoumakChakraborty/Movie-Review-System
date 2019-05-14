$('#editreview').on('click',function()
{
    var http=new XMLHttpRequest();
    http.open('GET','http://localhost:3000/edit/review/'+$('#editreview').attr('name'),true);
    http.onreadystatechange=function()
    {
         if(http.readyState==4&&http.status==200)
         {
             var result=JSON.parse(http.response);
             $('#review form').attr('action','/edit/review/'+$('#editreview').attr('name')+"?_method=PUT");
             var x=document.querySelectorAll('#review form textarea');
             x[0].removeAttribute('placeholder');
             $('#review form textarea').text(result[0].review);
             $('#reviewsubmit').val('Edit review');
         } 
    };
    http.send();
});
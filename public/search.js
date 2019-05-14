var x=document.getElementById('search');
x.addEventListener('input',function()
{
   if(x.value=="")
   {
       $('.formdiv li').remove();
       $('.formdiv').removeClass('formdiv-res');
       $('.formdiv').slideUp();
       var z=document.querySelector('#search');
      z.removeAttribute('style');
   }
     var http=new XMLHttpRequest();
     http.open('GET',"http://www.omdbapi.com/?apikey=194e21d7&s="+x.value+"",true);
     http.send();
     http.onreadystatechange=function()
     {
        if(http.readyState==4&&http.status==200)
        {
            $('.formdiv li').remove();
            var movie=JSON.parse(http.response);
            if(movie.Search!=undefined)
            {
             $('.formdiv').addClass('formdiv-res');  
            $('#search').css('border-top','1px gray solid');
            $('#search').css('border-left','1px gray solid');
            $('#search').css('border-right','1px gray solid');
            $('#search').css('border-bottom','0');
            $('#search').css('border-bottom-left-radius',"0");
            $('#search').css('border-bottom-right-radius',"0");
            $('#search').css('border-top-left-radius',"10px");
            $('#search').css('border-top-right-radius',"10px");
            $('.formdiv').css('height','auto');
              for(var i=0;i<movie.Search.length;i++)
              {
                  $('.formdiv').append('<li id="search-res"><a href="/search/'+movie.Search[i].Title+'"><img id=\"showimg\" src='+movie.Search[i].Poster+'> '+ movie.Search[i].Title+'</a></li>');
              }
              $('.formdiv').slideDown();
            }   
        }
     };
});
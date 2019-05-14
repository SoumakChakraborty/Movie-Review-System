var express=require("express");
var app=express();
var session=require("express-session");
var conn=require("./models/connection");
var body=require("body-parser");
var enc=require("./models/Encrypt");
var cookie=require('cookie-parser');
var upload=require('express-fileupload');
var request=require("request");  
var method=require("method-override");
app.use(cookie('This is secret to me an myself only'));
var flash=require("connect-flash");
var emailjs=require("emailjs");
app.use(method("_method"));
app.use(flash());
app.use(upload());
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(body.urlencoded({extended:true}));
app.use(session({
    secret:"This is secret to me",
    resave:false,
    saveUninitialized:false
}));
app.get("/",function(req,res)
{
    var state=isLoggedIn(req);
    res.render("landing",{msg:req.flash("msg"),state:state});
});
app.post("/signup",function(req,res)
{
   var fname=req.body.fname;
   var lname=req.body.lname;
   var userid=req.body.userid;
   var pass=req.body.password;
   var encrypted=enc(pass);
   encrypted=enc("P"+encrypted+"D");
   var query="insert into user values('"+userid+"','"+fname+"','"+lname+"','"+encrypted+"')";
   conn.query("select * from user where username='"+userid+"'",function(err,result,fields)
   {
          if(result.length!=0)
          {
             req.flash("msg","Username exists");
             res.redirect("/");
          }
          else
          {
            conn.query(query,function(err,result,fields)
            {
                if(!err)
                  res.redirect("/");
            });
         }
   });
});
app.post("/signin",function(req,res)
{
     var userid=req.body.userid;
     var pass=req.body.password;
     var encrypted=enc(pass);
     encrypted=enc("P"+encrypted+"D");
     conn.query("select * from user where username='"+userid+"'",function(err,result,fields)
     {
         if(result.length==0)
         {
            req.flash("msg","Username does not exist");
            res.redirect("/");
         }
         else if(result[0].password==encrypted)
         {
               res.cookie("user",userid,{maxAge:94608000000,signed:true});
               req.flash("msg","Signed In as "+result[0].fname+" "+result[0].lname);
               res.redirect("/");
         }
         else
         {
            req.flash("msg","Wrong password"+result[0].fname+" "+result[0].lname);
            res.redirect("/");
         }
     });
});
app.get("/signout",function(req,res)
{
    res.clearCookie('user');
    res.redirect("/");
});
app.get("/search/:name",function(req,res)
{
   var uname=req.signedCookies['user'];
   request('http://www.omdbapi.com/?apikey=194e21d7&t='+req.params.name,function(err,response,body)
   {
      if(!err&&response.statusCode==200)
      {
         var ob=JSON.parse(body);
         if(uname!=undefined)
         {
          conn.query("select * from review where movname='"+req.params.name+"'",function(error,result,field)
          {
             conn.query("select * from rating where username='"+uname+"' and movname='"+req.params.name+"'",function(e,r,f)
             {
                conn.query("select * from rating R1 where movname='"+req.params.name+"'"+" and not exists(select * from rating R2 where R1.username=R2.username and R1.username='"+uname+"'"+"and movname='"+req.params.name+"'"+")",function(e1,r1,f1)
                {
                      if(r.length==0)
                        res.render("results",{result:ob,user:uname,userrating:undefined,reviews:result,rating:r1});
                      else
                        res.render("results",{result:ob,user:uname,userrating:r[0].rating,reviews:result,rating:r1});   
                });
             });
          });
       }
       else
       {
         conn.query("select * from review where movname='"+req.params.name+"'",function(error,result,field)
         {
            conn.query("select * from rating where movname='"+req.params.name+"'",function(e,r,f)
            {              
                       res.render("results",{result:ob,user:uname,reviews:result,rating:r});   
            });
         });
       }
     }
   });
});
app.post("/addrating/:name",function(req,res)
{
   var user=req.signedCookies['user'];
   var rating=req.body.rating;
   if(user==undefined)
     res.redirect("/");
   else
   {  
      conn.query("insert into rating values('"+user+"','"+req.params.name+"','"+rating+"')",function(err,result,field)
      {
      });
     res.redirect("/search/"+req.params.name);
   }  
});
app.post("/addreview/:name",function(req,res)
{
     var review=req.body.review;
     var user=req.signedCookies['user'];
     if(user==undefined) 
       res.redirect("/");
     else
     {
        conn.query("insert into review(username,movname,review) values('"+user+"','"+req.params.name+"','"+review+"')",function(err,result,fields)
        {
            
        });
        res.redirect("/search/"+req.params.name);
     }
});
app.get("/edit/review/:id",function(req,res)
{
   var user=req.signedCookies['user'];
   if(user==undefined)
     res.redirect("/");
   else
   {  
    conn.query("select * from review where revID='"+req.params.id+"'",function(err,result,fields)
    {
        res.json(result);
    });
   }
});
app.put("/edit/review/:id",function(req,res)
{
   var review=req.body.review;
   var user=req.signedCookies['user'];
   if(user==undefined) 
     res.redirect("/");
   else
   {
      conn.query("update review set review='"+review+"' where revID='"+req.params.id+"'",function(err,result,fields)
      {
      });
     conn.query("select * from review where revID='"+req.params.id+"'",function(e,r,f)
     {
       res.redirect("/search/"+r[0].movname);
     }); 
   } 
});
app.delete("/delete/review/:id",function(req,res)
{
   var user=req.signedCookies['user'];
   if(user==undefined) 
     res.redirect("/");
   else
   {
     conn.query("select * from review where revID='"+req.params.id+"'",function(err,result,fields)
     {
        var movname=result[0].movname;
      conn.query("delete from review where revID='"+req.params.id+"'",function(e,r,f)
      { 
      });
      res.redirect("/search/"+movname);
   }); 
   }
});
app.put("/changepass",function(req,res)
{
   var user=req.signedCookies['user'];
   if(user==undefined)
    res.redirect("/");
   else
   {
      var password=req.body.password;
      var encrypted=enc(password);
      encrypted=enc("P"+encrypted+"D");
      conn.query("update user set password='"+encrypted+"' where username='"+user+"'",function(err,result,fields)
      {
      });
     res.redirect("/"); 
   } 
});
app.post("/resetpass",function(req,res)
{
     var userid=req.body.userid;
     var server=emailjs.server.connect({
        user:"yelpcamp500@gmail.com",
        password:"Windows90#",
        host:"smtp.gmail.com",
        ssl:true
     });
    server.send({
       from:"yelpcamp500@gmail.com",
       to:userid,
       text:"Dear user,\nPlease click on the link: http://localhost:3000/resetpass/"+userid+" to reset password.\n\nYours faithfully,\nMovie review team"
    },function(err,msg)
    {
        console.log(err||msg);
    });
    res.redirect("/"); 
});
app.get("/resetpass/:id",function(req,res)
{
     res.render("resetpass",{user:req.params.id});
});
app.put('/resetpass/:id',function(req,res)
{
   var user=req.signedCookies['user'];
   if(user==undefined)
    res.redirect("/");
   else
   {
      var password=req.body.password;
      var encrypted=enc(password);
      encrypted=enc("P"+encrypted+"D");
      conn.query("update user set password='"+encrypted+"' where username='"+user+"'",function(err,result,fields)
      {
      });
     res.redirect("/"); 
   }
});
app.listen(3000,"127.0.0.1",function()
{
   console.log("Server started");
});
function isLoggedIn(req)
{
   var user=req.signedCookies['user'];
   if(user==undefined)
    return false;
  return true;  
}
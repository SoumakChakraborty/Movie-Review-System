this.onload=function()
{
    $('#resetdiv').append('<form></form>');
    $('#resetdiv form').attr('action','/resetpass/'+$('#resetdiv').attr('name')+'?_method=PUT');
    $('#resetdiv form').attr('method','POST');
    $('#resetdiv form').attr('onsubmit','return check()');
    $('#resetdiv form').append('<input type="password" name="password" id="password" placeholder="New password" required><br>');
    $('#resetdiv form').append('<input type="password"  id="retype-password" placeholder="Retype password" required><br>');
    $('#resetdiv form').append('<input type="submit" value="Reset password" id="submit">');
};
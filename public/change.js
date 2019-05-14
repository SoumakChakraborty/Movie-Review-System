window.onload=function()
{
    $('#rateshow').text($('#rating').val());
}
$('#rating').on('change',function()
{
   $('#rateshow').text($('#rating').val());
});
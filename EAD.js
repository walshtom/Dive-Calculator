$(document).on("pagecreate", "#page1", function () {
    $(".add").on("change", function () {
        addAll();
    });

    addAll();
});

function addAll() {
    var sum = 0
    $('.add').each(function (){        
        sum += isNaN(this.value) || $.trim(this.value) === '' ? 0 : parseFloat(this.value);        
    });
    $('#total').html(sum);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("pagecreate", "#page1", function () {
    $(".EADslider").on("change", function () {
        calcEAD();
    });
    calcEAD();
});


function calcEAD() {
   var EAD = 0;
   
   var percentageO2 = $('slider1').value;
   alert(percentageO2);
   //var depth = $('slider2').value;
   
   

   //EAD = ((((1 - percentageO2) * (depth + 33))/ 0.79) - 33);
   //console.log(EAD);

}

////////////////////////////////////////////////////////////////////////////////////

$(document).on("pagecreate", "#page1", function () {
    $("#slider1").on("change", function () {
        calcEAD();
    });
    calcEAD();
});


function calcEAD() {
   //var EAD = 0;

   var depth = 0;
   //var percentageO2 = 0;  
   
   var depth = $('#slider1').val();
   //var percentageO2 = $('#slider2').val();
   console.log(depth);
   //console.log(percentageO2);

   
   

   //EAD = ((((1 - percentageO2) * (depth + 33))/ 0.79) - 33);
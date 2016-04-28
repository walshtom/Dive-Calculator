	
	var checkVar = function() {
		var target = $('#warning');		
		if (ppO2 <= 1.4) {
		console.log('');
		} 
		if (ppO2 > 1.4 && ppO2 <= 1.6) {
		console.log('Caution!');	
		}
		if (ppO2 > 1.6) {
		console.log('Danger!');
		}
		checkVar();
		}
	
//var checkVar = function(v) {
   //var target = $('#answer');
   //if (parseInt(v) > 20) {
      //target.hide();
   //} else {
      //target.show();
   //}
//}	
	
	
	  //if (ppO2 > 1.4 && ppO2 <= 1.6) {
	  //$("#warning").html("Caution! Do not exceed 1.4 (ATA)/Bar during<br> the working part of the dive.<br>Use for decompression only.");
	  //} else if (ppO2 > 1.6) {
	  //$("#warning").html("Danger! Partial pressures of oxygen<br>greater than 1.6 (ATA)/Bar<br>pose serious risk of siezure.");
	  //}
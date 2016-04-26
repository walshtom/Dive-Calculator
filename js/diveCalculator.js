$(document).on("pageinit", "#main", function(event) {
	$("span#BM_value").text(70);	     			//On document ready default is Imperial units
	$("span#MOD_value").text(187);	     			//This sets default values of output in the four tabs 
	$("span#EAD_value").text(33);	
	$("span#ppO2_value").text(0.42);
	var ppO2Max = ($("#flip-1").val());				//Get ppO2Max value
	$("#maxO2_value").html(ppO2Max);				//and display it on settings popup
	var selection = $("#flip-2").val();				//Get units selection
	$('#units').html(selection);					//and display it on settings popup
});

function chgToImperial() {
	var DepthConst = 33;	
	$(".sliderLabel").text("Depth in Feet");
	$(".pressureUnits").text("Atmospheres Absolute (ATA)");
	$(".depthUnits").text("Feet");}
	//$(".sliderValue").prop({min: 33, max: 148}).slider("refresh");}

function chgToMetric() {
	var DepthConst = 10;	
	$(".sliderLabel").text("Depth in Meters");
	$(".pressureUnits").text("Bar");
	$(".depthUnits").text("Meters");}	
	//$(".sliderValue").prop({min: 10, max: 45}).slider("refresh");}	
	
//Best Nitrox Mix//////////////////////////////////////////////////////////////////////////////   
$(document).on('change', '#BMdepth_slider', function() {
	var ppO2Max = ($("#flip-1").val());				//Get the ppO2Max value from switch 1
	var BMdepth  = ($(this).val());					//Get the Depth from the slider
	var DepthConst = "";							//Detect Metric or Imperial units
	var selection = $("#flip-2").val();				//and set the DepthConst appropriately
	  if (selection == "Metric") {			
	    DepthConst = 10;}		
	  if (selection == "Imperial") {		
	    DepthConst = 33;}
	calcBM(ppO2Max, BMdepth, DepthConst);			//Send variables off for Best Mix calculation
	});

function calcBM(ppO2Max, BMdepth, DepthConst) {
	BM = Math.round(100 * ((ppO2Max)/((BMdepth/DepthConst) + 1)));	
	$('#BM_value').html(BM);
	} // End Best Nitrox Mix

//Maximum Operating Depth  ADD IN PPO2////////////////////////////////////////////////////
$(document).on('change', '#MODpercentO2slider', function() {
	var ppO2Max = ($("#flip-1").val());				//Get the ppO2Max value from switch 1
	var MODfO2  = ($(this).val())/100;					//Get the MODfO2 from the slider
	var DepthConst = "";							//Detect Metric or Imperial units
	var selection = $("#flip-2").val();				//and set the DepthConst appropriately
	  if (selection == "Metric") {
	  	DepthConst = 10;}		
	  if (selection == "Imperial") {
	  	DepthConst = 33;}	
	calcMOD(ppO2Max, MODfO2, DepthConst);				//Send variables off for Maximum Operating Depth calculation
	});

function calcMOD(ppO2Max, MODfO2, DepthConst) {
	//MOD = Math.round((46.2/MODfO2) - DepthConst);
	MOD = Math.round(DepthConst * ((ppO2Max/MODfO2) - 1));	
	$("#MOD_value").html(MOD);	
	} // End Maximum Operating Depth

//Equivalent Air Depth///////////////////////////////////////////////////////////////////////	
	
$(document).on('change', '#EADdepth_slider', function() {
	EADdepth = ($(this).val());						//Get the EADdepth from the slider
	var DepthConst = "";							//Detect Metric or Imperial units
	var selection = $("#flip-2").val();				//and set the DepthConst appropriately
	  if (selection == "Metric") {
	  	DepthConst = 10;}		
	  if (selection == "Imperial") {
	  	DepthConst = 33;}		
	EADfO2 = ($("#EADpercentO2slider").val())/100;		//Read the slider and convert to EADfO2
	calcEAD(EADdepth, EADfO2, DepthConst);				//Send variables off for Equivalent Air Depth calculation
	});
	
$(document).on('change', '#EADpercentO2slider', function() {
	EADfO2 = ($(this).val())/100;						//Read the slider and convert to EADfO2
	var DepthConst = "";							//Detect Metric or Imperial units
	var selection = $("#flip-2").val();				//and set the DepthConst appropriately
	  if (selection == "Metric") {
	  	DepthConst = 10;}		
	  if (selection == "Imperial") {
	  	DepthConst = 33;}		
	EADdepth = $("#EADdepth_slider").val();			//Get the EADdepth from the slider
	calcEAD(EADdepth, EADfO2, DepthConst);				//Send variables off for Equivalent Air Depth calculation
	});
	
function calcEAD(EADdepth, EADfO2, DepthConst) {
	var fN2 = (1 - EADfO2);	
	var new_depth = (parseInt(EADdepth) + DepthConst);
	EAD = Math.round((((fN2) * (new_depth))/.79) - DepthConst);
	$('#EAD_value').html(EAD);
	} // End Equivalent Air Depth
	
//Partial Pressure of Oxygen///////////////////////////////////////////////////////////////////
$(document).on('change', '#ppO2depth_slider', function() {	
	ppO2depth = ($(this).val());					//Get the ppO2depth from the slider
	var DepthConst = "";							//Detect Metric or Imperial units
	var selection = $("#flip-2").val();				//and set the DepthConst appropriately
	  if (selection == "Metric") {
	  	DepthConst = 10;}		
	  if (selection == "Imperial") {
	  	DepthConst = 33;}	
	ppO2fO2 = ($("#ppO2percentO2slider").val())/100;	//Read the slider and convert to ppO2fO2
	calcppO2(ppO2depth, ppO2fO2, DepthConst);			//Send variables off for partial pressure of oxygen calculation
	});

$(document).on('change', '#ppO2percentO2slider', function() {
	ppO2fO2 = ($(this).val())/100;						//Get the ppO2fO2 from the slider
	var DepthConst = "";							//Detect Metric or Imperial units
	var selection = $("#flip-2").val();				//and set the DepthConst appropriately
	  if (selection == "Metric") {
	  	DepthConst = 10;}		
	  if (selection == "Imperial") {
	  	DepthConst = 33;}
    ppO2depth = $("#ppO2depth_slider").val();		//Read the ppO2 depth slider
	calcppO2(ppO2depth, ppO2fO2, DepthConst);			//Send variables off for partial pressure of oxygen calculation
	});

function calcppO2(ppO2depth, ppO2fO2, DepthConst) {
	ppO2 = (ppO2fO2 * ((ppO2depth/DepthConst) + 1)).toFixed(2);
	$("#ppO2_value").html(ppO2);
	
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
	  
	  
	} // End Partial Pressure of Oxygen

	
	
	
//////////////////////////////////////////  Switch 1  ////////////////////////////////////////////////	
$(document).on('change', '#flip-1', function() {
	var ppO2Max = ($("#flip-1").val());
	$("#maxO2_value").html(ppO2Max);
////////////////////////////////////////////////////////////////////////////////////////////////////////
	var BMdepth = $("#BMdepth_slider").val();
	var DepthConst = ""; 
	var selection = $("#flip-2").val();
	  if (selection == "Metric")  {
		  DepthConst = 10;
		  $(".sliderLabel").text("Depth in Meters");
		  $(".pressureUnits").text("Bar");
		  $(".depthUnits").text("Meters");}			  		  		
	  if (selection == "Imperial") {
		  DepthConst = 33
		  $(".sliderLabel").text("Depth in Feet");
		  $(".pressureUnits").text("Atmospheres Absolute (ATA)");
		  $(".depthUnits").text("Feet");}		  
	calcBM(ppO2Max, BMdepth, DepthConst);
////////////////////////////////////////////////////////////////////////////////////////////////////////	
	var MODfO2 = $("#MODpercentO2slider").val()/100;
	var DepthConst = ""; 
	var selection = $("#flip-2").val();
	  if (selection == "Metric")  {
		  DepthConst = 10}		
	  if (selection == "Imperial") {
		  DepthConst = 33}			
	calcMOD(ppO2Max, MODfO2, DepthConst);	
	});	
///////////////////////////////////////////////////////////////////////////////////////////////////////////	





/////////////////////////////////////////  Switch 2  //////////////////////////////////////////////////////	
$(document).on('change', '#flip-2', function() {
	var selection = $("#flip-2").val();
	$("#units").html(selection);		
	if (selection == "Metric")  {
		chgToMetric();}		
	if (selection == "Imperial") {
		chgToImperial();}	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	  if (selection == "Metric")  {
		  DepthConst = 10;
		  BMdepth = Math.round(BMdepthSetting * 0.3048);
		  $(".sliderValue").prop({min: 10, max: 45}).slider("refresh");
		  $("#BMdepth_slider").val(BMdepth).slider("refresh")}
		  
	  if (selection == "Imperial") {
		  DepthConst = 33;
		  BMdepth = Math.round(BMdepthSetting / 0.3048);
		  console.log(BMdepth + ' in Feet');
		  $(".sliderValue").prop({min: 33, max: 148}).slider("refresh");		  
		  $("#BMdepth_slider").val(BMdepth).slider("refresh")}	 

	var ppO2Max = $("#flip-1").val();
	var BMdepthSetting = $("#BMdepth_slider").val(); 
	var	BMdepth = "";
	var DepthConst = ""; 
	var selection = $("#flip-2").val();		  
	calcBM(ppO2Max, BMdepth, DepthConst);				
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//	var ppO2Max = $("#flip-1").val();
//	var MODfO2 = $("#MODpercentO2slider").val()/100;
//	var DepthConst = ""; 
//	var selection = $("#flip-2").val();
//	  if (selection == "Metric")  {
//		  DepthConst = 10}
//	  if (selection == "Imperial") {
//		  DepthConst = 33}		  		  
//	calcMOD(ppO2Max, MODfO2, DepthConst);				
////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	  if (selection == "Metric")  {
		  DepthConst = 10;
		  EADdepth = Math.round(EADdepthSetting * 0.3048);
		  $(".sliderValue").prop({min: 10, max: 45}).slider("refresh");
		  $("#EADdepth_slider").val(EADdepth).slider("refresh")}	
		  
	  if (selection == "Imperial") {
		  DepthConst = 33;
		  EADdepth = Math.round(EADdepthSetting / 0.3048);
		  $(".sliderValue").prop({min: 33, max: 148}).slider("refresh");
		  $("#EADdepth_slider").val(EADdepth).slider("refresh")}
		  
	var	EADdepthSetting = $("#EADdepth_slider").val(); 
	console.log(EADdepthSetting);
	var EADfO2 = ($("#EADpercentO2slider").val())/100; 		
	var	EADdepth = "";	
	var DepthConst = ""; 
	var selection = $("#flip-2").val();		  
	console.log(EADdepth);	
	console.log(EADfO2);	
	console.log(DepthConst);		
	calcEAD(EADdepth, EADfO2, DepthConst);	
});	
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
		
		
		
		
		
		
		
		
		

		
		


	

	
	
//   
//                            _
//    _._ _..._ .-',     _.._(`))
//   '-. `     '  /-._.-'    ',/
//      )         \            '.
//     / _    _    |             \
//    |  a    a    /              |
//    \   .-.                     ;  
//     '-('' ).-'       ,'       ;
//        '-;           |      .'
//    BYE!   \           \    /
//           | 7  .__  _.-\   \
//           | |  |  ``/  /`  /
//          /,_|  |   /,_/   /
//             /,_/      '`-'
//   
//   



















	
	
	
	
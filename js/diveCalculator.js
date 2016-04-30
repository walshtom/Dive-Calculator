$(document).on("pageinit", "#main", function(event) {
	$("span#BM_value").text(70);	     											//On document ready default is Imperial units
	$("span#MOD_value").text(187);	     											//These sets default values of output in the four tabs 
	$("span#EAD_value").text(33);	
	$("span#ppO2_value").text(0.42);
	ppO2Max = 1.4;																	//Sets default value of global variable ppO2Max
	DepthConst = 33;																//Sets default value of DepthConst (Depth in feet or Meters = 1 atmosphere)
	});

$(document).on('change', '#flip-1', function() {									//Monitor changes to maximum partial pressure of oxygen
	ppO2Max = $("#flip-1").val();													//and recalculate Best Mix and Maximum Operating Depth
	$("#maxO2_value").html(ppO2Max);	
	calcBM();								
	calcMOD();	
	});	

$(document).on('change', '#flip-2', function() {									//Monitor selection of Imperial or Metric units
	var selection = $("#flip-2").val();												//and call appropriate function to handle the display
	$("#units").html(selection);		
	if (selection == "Metric")  {
		chgToMetric();}		
	if (selection == "Imperial") {
		chgToImperial();}	
	});	

function calcBM() {																	//Calculates Best Mix for a dive to a given depth
	var BMdepth = $("#BMdepth_slider").val();
	BM = Math.round(100 * ((ppO2Max)/((BMdepth/DepthConst) + 1)));	
	$('#BM_value').html(BM);}

function calcMOD() {																//Calculates Maximum Operating Depth of an EANx blend
	var MODfO2 = $("#MODpercentO2slider").val()/100;	
	MOD = Math.round(DepthConst * ((ppO2Max/MODfO2) - 1));	
	$("#MOD_value").html(MOD);}
		
function calcEAD() {																//Calculates the Equivalent Air Depth for an EANx blend at a selected depth
	var EADfO2 = ($("#EADpercentO2slider").val())/100;
	var EADdepth = $("#EADdepth_slider").val();
	var fN2 = (1 - EADfO2);	
	var new_depth = (parseInt(EADdepth) + DepthConst);
	EAD = Math.round((((fN2) * (new_depth))/.79) - DepthConst);
	$('#EAD_value').html(EAD);
	var ppO2 = (EADfO2 * ((EADdepth/DepthConst) + 1)).toFixed(2);
	PPO2warning(ppO2);}																//Warns user if ppO2 values exceed safe limits

function calcPPO2() {																//Calculates the Partial Pressure of Oxygen for a given EANx blend and a selected depth
	ppO2fO2 = ($("#ppO2percentO2slider").val())/100;
	ppO2depth = $("#ppO2depth_slider").val();		
	ppO2 = (ppO2fO2 * ((ppO2depth/DepthConst) + 1)).toFixed(2);
	$("#ppO2_value").html(ppO2);
	PPO2warning(ppO2);}																//Warns user if ppO2 values exceed safe limits 	
		
function PPO2warning(ppO2) {														//Tests for ppO2 values and issues the warnings
	if (ppO2 <= 1.4) {
	$(".msg").css("display","none");}	
	if (ppO2 > 1.4 && ppO2 <= 1.6) {	
	$(".msg").css("display","block");	
	$(".msg").css("color","green");
	$(".msg").html("Caution! Do not exceed 1.4 (ATA)/Bar during<br>the working part of the dive.<br>Use for decompression only.");}
	if (ppO2 >= 1.6) {
	$(".msg").css("display","block");	
	$(".msg").css("color","red");
	$(".msg").html("Danger! Partial pressures of oxygen<br>greater than 1.6 ATA/Bar<br>pose serious risk of siezure.");}}		

function chgToMetric() {									
	DepthConst = 10;																//Set DepthConst to Metric value
	$(".sliderLabel").text("Depth in Meters");										//Change labels to Metric
	$(".pressureUnits").text("Bar");
	$(".depthUnits").text("Meters");
	var sld1 = Math.round($("#BMdepth_slider").val()*0.3048);						//Get the values of the sliders 
	$("#BMdepth_slider").prop({min: 10, max: 45, value: sld1}).slider("refresh");	//convert them to Metric and display them
	var sld2 = Math.round($("#EADdepth_slider").val()*0.3048);
	$("#EADdepth_slider").prop({min: 10, max: 45, value: sld2}).slider("refresh");
	var sld3 = Math.round($("#ppO2depth_slider").val()*0.3048);	
	$("#ppO2depth_slider").prop({min: 10, max: 45, value: sld3}).slider("refresh");
	var mod = Math.round($("#MOD_value").html()*0.3048);							//Get the MOD value
	$("#MOD_value").text(mod);														//Convert it to Metric and display it
	var ead = Math.round($("#EAD_value").html()*0.3048);							//Get the EAD value
	$("#EAD_value").text(ead);}														//Convert it to Metric and display it
	
function chgToImperial() {									
	DepthConst = 33;																//set DepthConst to Imperial value
	$(".sliderLabel").text("Depth in Feet");										//change labels to Imperial
	$(".pressureUnits").text("Atmospheres Absolute (ATA)");
	$(".depthUnits").text("Feet");	
	var sld1 = Math.round(($("#BMdepth_slider").val())/0.3048);						//Get the values of the sliders	
	$("#BMdepth_slider").prop({min: 33, max: 148, value: sld1}).slider("refresh");	//convert them to Imperial and display it
	var sld2 = Math.round(($("#EADdepth_slider").val())/0.3048);
	$("#EADdepth_slider").prop({min: 33, max: 148, value: sld2}).slider("refresh");
	var sld3 = Math.round(($("#ppO2depth_slider").val())/0.3048);	
	$("#ppO2depth_slider").prop({min: 33, max: 148, value: sld3}).slider("refresh");
	var mod = Math.round($("#MOD_value").html()/0.3048);							//Get the MOD value
	$("#MOD_value").text(ead);														//Convert it to Imperial and display it
	var mod = Math.round($("#EAD_value").html()/0.3048);							//Get the EAD value
	$("#EAD_value").text(ead);}														//Convert it to Imperial and display it
	
				
$(document).on('change', '#BMdepth_slider', function() {							// Best Nitrox Mix event handler
	calcBM();							
	});
	
$(document).on('change', '#MODpercentO2slider', function() {						// Maximum Operating Depth event handler
	calcMOD();							
	});
				
$(document).on('change', '#EADdepth_slider', function() {							// Equivalent Air Depth event handler
	calcEAD();							
	});
	
$(document).on('change', '#EADpercentO2slider', function() {						// Equivalent Air Depth event handler
	calcEAD();							
	});	

$(document).on('change', '#ppO2depth_slider', function() {							// Partial Pressure of Oxygen event handler
	calcPPO2();						
	});

$(document).on('change', '#ppO2percentO2slider', function() {						// Partial Pressure of Oxygen event handler
	calcPPO2();						
	});
	
	

//                            _
//    _._ _..._ .-',     _.._(`))
//   '-. `     '  /-._.-'    ',/
//      )         \            '.
//     / _    _    |             \
//    |  a    a    /              |
//    \   .-.                     ;  
//     '-('' ).-'       ,'       ;
//        '-;           |      .'
//  BYE!     \           \    /
//           | 7  .__  _.-\   \
//           | |  |  ``/  /`  /
//          /,_|  |   /,_/   /
//             /,_/      '`-'
//






	
	
	
	
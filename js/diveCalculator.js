$(document).on("pageinit", "#main", function(event) {
	$("span#BM_value").text(70);	     					//On document ready default is Imperial units
	$("span#MOD_value").text(187);	     					//This sets default values of output in the four tabs 
	$("span#EAD_value").text(33);	
	$("span#ppO2_value").text(0.42);
	ppO2Max = 1.4;											//and sets default value of global variable ppO2Max
	DepthConst = 33;										//and set default value of DepthConst (Depth in feet or Meters = 1 atmosphere)
	$("#EADmsg").hide();
	$("#PPO2msg").hide();
	});

$(document).on('change', '#flip-1', function() {			//Monitor changes to maximum partial pressure of oxygen
	ppO2Max = $("#flip-1").val();							//and recalculate Best Mix and Maximum Operating Depth
	calcBM();								
	calcMOD();	
	});	

$(document).on('change', '#flip-2', function() {			//Monitor selection of Imperial or Metric units
	var selection = $("#flip-2").val();						//and call appropriate function to handle the display
	$("#units").html(selection);		
	if (selection == "Metric")  {
		chgToMetric();}		
	if (selection == "Imperial") {
		chgToImperial();}	
	});	

function calcBM() {
	var BMdepth = $("#BMdepth_slider").val();
	BM = Math.round(100 * ((ppO2Max)/((BMdepth/DepthConst) + 1)));	
	$('#BM_value').html(BM);}

function calcMOD() {
	var MODfO2 = $("#MODpercentO2slider").val()/100;	
	MOD = Math.round(DepthConst * ((ppO2Max/MODfO2) - 1));	
	$("#MOD_value").html(MOD);}
		
function calcEAD() {
	var EADfO2 = ($("#EADpercentO2slider").val())/100;
	var EADdepth = $("#EADdepth_slider").val();
	var fN2 = (1 - EADfO2);	
	var new_depth = (parseInt(EADdepth) + DepthConst);
	EAD = Math.round((((fN2) * (new_depth))/.79) - DepthConst);
	$('#EAD_value').html(EAD);
	var ppO2 = (EADfO2 * ((EADdepth/DepthConst) + 1)).toFixed(2);
	EADwarning(ppO2);}	

function calcPPO2() {
	ppO2fO2 = ($("#ppO2percentO2slider").val())/100;
	ppO2depth = $("#ppO2depth_slider").val();		
	ppO2 = (ppO2fO2 * ((ppO2depth/DepthConst) + 1)).toFixed(2);
	$("#ppO2_value").html(ppO2);
	PPO2warning(ppO2);}	  	
		
function EADwarning(ppO2) {
console.log('in EADwarning');	
	if (ppO2 <= 1.4) {	
	$("#EADmsg").innerText("");
	console.log('< 1.4')}
	if (ppO2 > 1.4 && ppO2 <= 1.6) {	
	$("#EADmsg").innerText("1.4 to 1.6");}
	if (ppO2 >= 1.6) {
	$("#EADmsg").innerText("over 1.6");}
}		

	
function chgToMetric() {									
	DepthConst = 10;										//set DepthConst to Metric value
	$(".sliderLabel").text("Depth in Meters");				//change labels to Metric
	$(".pressureUnits").text("Bar");
	$(".depthUnits").text("Meters");
	$(".sliderValue").prop({min: 10, max: 45}).slider("refresh");	
	//calcBM();												//Recalculate the four functions							
	//calcMOD();
	//calcEAD();
	//calcPPO2();
	}	

function chgToImperial() {									
	DepthConst = 33;										//set DepthConst to Imperial value
	$(".sliderLabel").text("Depth in Feet");				//change labels to Imperial
	$(".pressureUnits").text("Atmospheres Absolute (ATA)");
	$(".depthUnits").text("Feet");
	$(".sliderValue").prop({min: 33, max: 148}).slider("refresh");	
	//calcBM();												//Recalculate the four functions								
	//calcMOD();
	//calcEAD();
	//calcPPO2();	
	}	

//	DEPTH and PERCENTAGE OXYGEN SLIDER EVENT HANDLERS	

	// Best Nitrox Mix
$(document).on('change', '#BMdepth_slider', function() {
	calcBM();							
	});
	
	// Maximum Operating Depth
$(document).on('change', '#MODpercentO2slider', function() {
	calcMOD();							
	});
			
	// Equivalent Air Depth
$(document).on('change', '#EADdepth_slider', function() {
	calcEAD();							
	});
	
$(document).on('change', '#EADpercentO2slider', function() {
	calcEAD();							
	});	

	// Partial Pressure of Oxygen
$(document).on('change', '#ppO2depth_slider', function() {	
	calcPPO2();						
	});

$(document).on('change', '#ppO2percentO2slider', function() {
	calcPPO2();						
	});
	












	









	
	
	
	
	var DepthConst = "",
		BMdepth = 33,
		PPO2depth = 33, //Globals used by
	    EADdepth = 33,  //calcEAD	
		fO2 = .21;      //and calcppO2

$(document).ready(function() {
	var selection = $("#flip-2").val();
	if (selection == "Metric") {
		chgToMetric();}		
	if (selection == "Imperial") {
		chgToImperial();}
	});

function chgToMetric() {
	var ppO2Max = $("#flip-1").val();	
	var DepthConst = 10;
	$(".sliderLabel").text("Depth in Meters");
	$(".pressureUnits").text("Bar");
	$(".depthUnits").text("Meters");	
	$(".sliderValue").prop({min: 10, max: 45, value: 10}).slider("refresh");
	calcBM(ppO2Max, BMdepth, DepthConst);
	calcMOD(fO2);
	calcEAD(fO2);
	calcppO2(fO2);
	return DepthConst;}
	
function chgToImperial() {
	var DepthConst = 33;
	var ppO2Max = $("#flip-1").val();		
	$(".sliderLabel").text("Depth in Feet");
	$(".pressureUnits").text("Atmospheres Absolute (ATA)");
	$(".depthUnits").text("Feet");
	$(".sliderValue").prop({min: 33, max: 148, value: 33}).slider("refresh");
	calcBM(ppO2Max, BMdepth);
	calcMOD(fO2);
	calcEAD(fO2);
	calcppO2(fO2);
	return DepthConst;}

//Best Nitrox Mix   
$(document).on('taphold', '#BMdepth_slider', function() {
	var ppO2Max = ($("#flip-1").val());	
	var BMdepth  = ($(this).val());
	calcBM(ppO2Max, BMdepth);
	});

function calcBM(ppO2Max, BMdepth) {
	BM = Math.round(100 * ((ppO2Max)/((BMdepth/DepthConst) + 1)));	
	$('#BM_value').html(BM);
	} //End Best Nitrox Mix 

// Maximum Operating Depth  ADD IN PPO2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
$(document).on('change', '#MODpercentO2slider', function() {
	var fO2  = ($(this).val())/100;
	calcMOD(fO2);
	});

function calcMOD(fO2) {
	MOD = Math.round((46.2/fO2)-33);
	$("#MOD_value").html(MOD);	
	} // End Maximum Operating Depth

$(document).on('change', '#EADdepth_slider', function() {	
	EADdepth = ($(this).val());
	calcEAD(EADdepth);
	});
	
$(document).on('change', '#EADpercentO2slider', function() {
	fO2 = ($(this).val())/100;
	calcEAD(fO2);
	});

function calcEAD() {
	var fN2 = (1 - fO2);	
	var new_depth = (parseInt(EADdepth) + 33);
	EAD = Math.round((((fN2) * (new_depth))/.79) - 33);
	$('#EAD_value').html(EAD);
	} // End Equivalent Air Depth

// Partial Pressure of Oxygen
$(document).on('change', '#PPO2depth_slider', function() {	
	PPO2depth = ($(this).val());
	calcppO2(PPO2depth);
	});

$(document).on('change', '#PPO2percentO2slider', function() {
	fO2 = ($(this).val())/100;
	calcppO2(fO2);
	});

function calcppO2() {
	var pressure = ((PPO2depth/33) + 1);
	ppO2 = (fO2 * pressure).toFixed(2);
	$("#ppO2_value").html(ppO2);
	if (ppO2 > 1.4 && ppO2 <= 1.6) {
	$("#warning").html("Caution! Do not exceed 1.4 (ATA)/Bar during<br> the working part of the dive.<br>Use for decompression only.");
	} else if (ppO2 > 1.6) {
	$("#warning").html("Danger! Partial pressures of oxygen<br>greater than 1.6 (ATA)/Bar<br>pose serious risk of siezure.");
	}  
	} // End Partial Pressure of Oxygen

$("#flip-1").change(displayMaxPPO2);	//This statement autoexecutes on page load NOT ANYMORE
	displayMaxPPO2();	
	
function displayMaxPPO2() {
	var ppO2Max = ($("#flip-1").val());
	$("#maxO2_value").html(ppO2Max);
	var BMdepth = $('#BMdepth_slider').val();
	$("#flip-1").change(calcBM(ppO2Max, BMdepth));
	}

function displayUnits() {
	var selection = $("#flip-2").val();
	$('#units').html(selection);	
	}

//$("select#flip-2").change(function() {
	//var selection = $("#flip-2").val();
	//if (selection == "Metric") {
		//chgToMetric();}		
	//if (selection == "Imperial") {
		//chgToImperial();}					
	//});	
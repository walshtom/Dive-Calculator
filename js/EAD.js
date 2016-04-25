$(document).on('change', '#EADdepth_slider', function() {
	EADdepth = ($(this).val());					//Get the EADdepth from the slider
	var DepthConst = "";						//Detect Metric or Imperial units
	var selection = $("#flip-2").val();			//and set the DepthConst appropriately
	if (selection == "Metric") {
		DepthConst = 10;}		
	if (selection == "Imperial") {
		DepthConst = 33;}		
	fO2 = $("#EADpercentO2slider").val();		//Read the fO2 slider
	calcEAD(EADdepth, fO2, DepthConst);			//Send variables off for Equivalent Air Depth calculation
	console.log(EADdepth, DepthConst);
	});
	
$(document).on('change', '#EADpercentO2slider', function() {
	fO2 = ($(this).val())/100;					//Get the fO2 from the slider
	var DepthConst = "";						//Detect Metric or Imperial units
	var selection = $("#flip-2").val();			//and set the DepthConst appropriately
	if (selection == "Metric") {
		DepthConst = 10;}		
	if (selection == "Imperial") {
		DepthConst = 33;}		
	EADdepth = $("#EADdepth_slider").val();		//Read the EAD slider
	calcEAD(EADdepth, fO2, DepthConst);			//Send variables off for Equivalent Air Depth calculation
	console.log(fO2, DepthConst);
	});
	
function calcEAD(EADdepth, fO2, DepthConst) {
	var fN2 = (1 - fO2);	
	var new_depth = (parseInt(EADdepth) + DepthConst);
	EAD = Math.round((((fN2) * (new_depth))/.79) - DepthConst);
	$('#EAD_value').html(EAD);
	} // End Equivalent Air Depth
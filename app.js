//##################################################
//reassign the "data" dictionary in the data.js to a more descriptive variable
var UFOSightings = data

//method for finding unique values borrowed from https://codeburst.io/javascript-array-distinct-5edc93501dc4
const unique = (value, index, self) => {
	return self.indexOf(value) === index;
}

//map the values that are in the dataset so that the user can only filter by unique options that exist in the data
var dateswithreports = UFOSightings.map(x => x.datetime).filter(unique);
var citieswithreports = UFOSightings.map(x => x.city).filter(unique);
var stateswithreports = UFOSightings.map(x => x.state).filter(unique);
var countrieswithreports = UFOSightings.map(x => x.country).filter(unique);
var shapeswithreports = UFOSightings.map(x => x.shape).filter(unique);

//filter the list of dates based on dates in the dataset
	var foo = d3.select("#date-input li")
	foo.html("")
	for (var i = 0; i < dateswithreports.length; i++){
		var temp = foo.append("li")
		temp.text(dateswithreports[i])
	};

//filter the list of cities based on cities in the dataset
	var foo = d3.select("#city-input li")
	foo.html("")
	for (var i = 0; i < citieswithreports.length; i++){
		var temp = foo.append("li")
		temp.text(citieswithreports[i])
	};

//filter the list of states based on states in the dataset
	var foo = d3.select("#state-input li")
	foo.html("")
	for (var i = 0; i < stateswithreports.length; i++){
		var temp = foo.append("li")
		temp.text(stateswithreports[i])
	};

//filter the list of countries based on countries in the dataset
	var foo = d3.select("#country-input li")
	foo.html("")
	for (var i = 0; i < countrieswithreports.length; i++){
		var temp = foo.append("li")
		temp.text(countrieswithreports[i])
	};

//filter the list of shapes based on appearances in the dataset
	var foo = d3.select("#shape-input li")
	foo.html("")
	for (var i = 0; i < shapeswithreports.length; i++){
		var temp = foo.append("li")
		temp.text(shapeswithreports[i])
	};
	
//initialize filter parameters. by default they do nothing until assigned a value via the dropdowns
var datetimefilter = "";
var cityfilter = "";
var statefilter = "";
var countryfilter = "";
var shapefilter = "";
var filtersapplied = false 
//##################################################



//##################################################
//event handling for filters code block

//event handling for date input dropdown
var filter_date = d3.select("#date-input li");	
function getdate() {
	datetimefilter = d3.event.target.innerHTML
	console.log(`Date filter applied: ${datetimefilter}`)
	d3.select("h4.anyfiltersapplied").text("Filters Selected:")
	var setval = d3.select("h4.datefilterapplied").text(datetimefilter)
	}
filter_date.on("click", getdate)

//event handling for city input dropdown
var filter_city = d3.select("#city-input li");	
function getcity() {
	cityfilter = d3.event.target.innerHTML;
	console.log(`City filter applied: ${cityfilter}`);
	d3.select("h4.anyfiltersapplied").text("Filters Selected:")
	var setval = d3.select("h4.cityfilterapplied").text(cityfilter);
	};
filter_city.on("click", getcity);

//event handling for state input dropdown
var filter_state = d3.select("#state-input li");	
function getstate() {
	statefilter = d3.event.target.innerHTML;
	console.log(`State filter applied: ${statefilter}`);
	d3.select("h4.anyfiltersapplied").text("Filters Selected:")
	var setval = d3.select("h4.statefilterapplied").text(statefilter);
	};
filter_state.on("click", getstate);

//event handling for country input dropdown
var filter_country = d3.select("#country-input li");	
function getcountry() {
	countryfilter = d3.event.target.innerHTML;
	console.log(`Country filter applied: ${countryfilter}`);
	d3.select("h4.anyfiltersapplied").text("Filters Selected:")
	var setval = d3.select("h4.countryfilterapplied").text(countryfilter);
	};
filter_country.on("click", getcountry);

//event handling for country input dropdown
var filter_shape = d3.select("#shape-input li");	
function getshape() {
	shapefilter = d3.event.target.innerHTML;
	console.log(`Shape filter applied: ${shapefilter}`);
	d3.select("h4.anyfiltersapplied").text("Filters Selected:")
	var setval = d3.select("h4.shapefilterapplied").text(shapefilter);
	};
filter_shape.on("click", getshape);
//##################################################


//##################################################
//event handling for clicking the enter button
var enterbutton = d3.select("#enterbutton");

//log, filter, display data in summary table
function dostuff() {
	
	//log info to the console for debugging
	console.log("The enter button was clicked");
	console.log(this);

	//filter the UFOSightings data using our filter parameters. 
	//error handling for null values since filters are chained
	filteredData = UFOSightings;
	
	if (datetimefilter != "") {
		var filteredData = filteredData.filter(x => x.datetime == datetimefilter);
		var filtersapplied = true;
	}
	if (cityfilter != "") {
		var filteredData = filteredData.filter(x=> x.city == cityfilter);
		var filtersapplied = true;
	}
	if (statefilter != "") {
		var filteredData = filteredData.filter(x=> x.state == statefilter);
		var filtersapplied = true;
	}
	if (countryfilter != "") {
		var filteredData = filteredData.filter(x=> x.country == countryfilter);
		var filtersapplied = true;
	}
	if (shapefilter != "") {
		var filteredData = filteredData.filter(x=> x.shape == shapefilter);
		var filtersapplied = true;
	}
	console.log(`Results length: ${filteredData.length}`);
	//error handling in case the filters turn up zero results
	if (filteredData.length != 0) {
		
		if (filtersapplied == true) {
			d3.select("h4.anyfiltersapplied").text("Filters Applied:");
		};
		//add a big header above the results
		var message = d3.select("h1.resultbanner");
		message.text("UFO Sightings Matching Your Search Criteria");
		
		//add a header to the table
		var thead = d3.select("thead");
		var colheader = thead.append("td").text("Date");
		var colheader = thead.append("td").text("City");
		var colheader = thead.append("td").text("State");
		var colheader = thead.append("td").text("Country");
		var colheader = thead.append("td").text("Shape");
		var colheader = thead.append("td").text("Duration");
		var colheader = thead.append("td").text("Description");
		
		//Populate summary data
		var tbody = d3.select("tbody");
		
		//there shouldn't be anything here, but removing any child attributes just in case
		tbody.html("");
		
		//loop through filteredData and print each to the page as a separate li
		filteredData.forEach((filteredData) => {
			var row = tbody.append("tr");
			Object.entries(filteredData).forEach(([key,value]) => {
				//console.log(key,value);
				var cell = tbody.append("td");
				cell.text(value);
			});
		});
	}	else {
			var message = d3.select("h1.resultbanner");
			message.text("No reports matching your criteria");
	};
};
enterbutton.on("click", dostuff);
//##################################################

//##################################################
//event handling for reset button
var resetbutton = d3.select("#resetbutton");

//do these things
function resetfilters() {
	console.log("The reset button was clicked");
	console.log(d3.event.target);
	
	//reinitialize the filter parameters
	datetimefilter = "";
	cityfilter = "";
	statefilter = "";
	countryfilter = "";
	shapefilter = "";
	
	//remove the header message
	var message = d3.select("h1.resultbanner").text("");
	
	//remove filter labels
	d3.select("h4.anyfiltersapplied").text("")
	d3.select("h4.datefilterapplied").text("")
	d3.select("h4.cityfilterapplied").text("")
	d3.select("h4.statefilterapplied").text("")
	d3.select("h4.countryfilterapplied").text("")
	d3.select("h4.shapefilterapplied").text("")
	
	
	//remove the results table
	var thead = d3.select("thead");
	thead.html("");
	
	var tbody = d3.select("tbody");
	tbody.html("");	
};
resetbutton.on("click", resetfilters);
//##################################################



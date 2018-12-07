document.addEventListener("wheel",scrollChange, {passive:true});
//document.getElementById("genderSelect").addEventListener("click", genderSelect, {passive:true});

var jobTitleArray = ["Supportive workers", "Professionals", "Managers", "Executives"]; //list of jobs titles that are option
var raceArray = ["White", "Asian", "Hispanic_or_Latino", "Black_or_African_American", "Minorities"]; //list of possible races
var genderArray = ["Male", "Female"];// list of possible genders

var dotCount = []; //a count of every combination of people
var dotArray = [];
//an array of arrays [job type, ethnicity, gender, count]

var  managerPercent = 0;
var  executivePercent = 0;
var  professionalPercent = 0;
var  otherWorkerPercent = 0;
//just sum up everything from Stella’s dataset

var  managerNum = 0;
var  executiveNum = 0;
var  professionalNum = 0;
var  otherNum = 0;
//just sum up everything from Stella’s dataset

var companyTotals = []; //total company population organized by company name
var totalPopulationNum = 0; //sum of the above


/*
dot class attributes
work type
text
race
text
color (pulled from color array)
gender
text
physics
whatever this ends up being? Maybe? Probably?
*/


//Part2
var dataset;
var Adobe = {name:'Adobe',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
	femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
	maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Airbnb = {name:'Airbnb',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Apple = {name:'Apple',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Cisco = {name:'Cisco',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var eBay = {name:'eBay',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Facebook = {name:'Facebook',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Google = {name:'Google',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var HP = {name:'HP Inc.',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var HPE = {name:'HPE', totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Intel = {name:'Intel',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Intuit = {name:'Intuit',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Linkedin = {name:'Linkedin',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Lyft = {name:'Lyft',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var MobileIron = {name:'MobileIron',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var NetApp = {name:'NetApp',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Nvidia = {name:'Nvidia',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var PayPal = {name:'PayPal',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Pinterest = {name:'Pinterest',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Salesforce = {name:'Salesforce',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Sanmina = {name:'Sanmina',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Square = {name:'Square',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Twitter = {name:'Twitter',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var Uber = {name:'Uber',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var View = {name:'View',totalPopulation: 0, femalePopulation: 0, malePopulation: 0,
    femaleWhite:0, femaleAsian:0, femaleAfrican:0, femaleHispanic :0, femaleMinority:0,
    maleWhite:0, maleAsian:0, maleAfrican:0, maleHispanic :0, maleMinority:0};
var companyObjectList= [];
var companySortFemale = [];
var companySortFemaleWhite = [];
var companySortFemaleAsian = [];
var companySortFemaleAfrican = [];
var companySortFemaleHispanic = [];
var companySortFemaleMinority = [];
var companySortMaleWhite = [];
var companySortMaleAsian = [];
var companySortMaleAfrican = [];
var companySortMaleHispanic = [];
var companySortMaleMinority = [];


var colorForRace;
var colorForGender;

var malePercentage;
var femalePercentage;
var companyName_totalNumOfEmployee;

var whiteMangerExecutivePercentage;
var asianMangerExecutivePercentage;
var africanMangerExecutivePercentage;
var hispanicMangerExecutivePercentage;
var minorityMangerExecutivePercentage;

var whiteProfessionalPercentage;
var asianProfessionalPercentage;
var africanProfessionalPercentage;
var hispanicProfessionalPercentage;
var minorityProfessionalPercentage;

var whiteOtherPercentage;
var asianOtherPercentage;
var africanOtherPercentage;
var hispanicOtherPercentage;
var minorityOtherPercentage;


//state controlling vars
var lastState = -1;
var thisState = 0;
var loaded = 0;
var drawn = -1;





//drawing boxes stuff
var boxLength = 70;
var spacing = 20;
var boxOutline = 1;
var boxTextOffset = boxLength + 14;

//drawing dots stuff
var dotCols = 45;
var dotRadius;
var defaultColor = d3.rgb(255,255,255);
var defDotStroke = d3.rgb(75,194,195);

var ethnicityColor = {"Hispanic_or_Latino": d3.rgb(255,82,21), "White": d3.rgb(252,200,112), "Black_or_African_American":d3.rgb(147,14,25), "Asian": d3.rgb(249,148,70), "Minorities": d3.rgb(78,46,55)};


//colors stuff
var boxOutlineColor = d3.rgb(0,0,0);
var boxFillColor1 = d3.rgb(0,0,0);
var boxFillColor2 = d3.rgb(30,76, 97);
var boxFillColor3 = d3.rgb(0,0,0);

var strokeColorDark = d3.rgb(0,0,0);
var strokeColorLight = d3.rgb(255,255,255);




//creating the different SVGs vars that are used in the top half
var dots = d3.select('svg#theDOTS');
// var boxes = d3.select('svg#svgCanvas');

//svg dimension stuff
var tempBox = document.getElementById('theDOTS').getBoundingClientRect();
var dotsHeight = tempBox.height - 70;
var dotsWidth = tempBox.width;
//var dotsHeight = Math.trunc(+document.getElementById('theDOTS').clientHeight) -70;
//var dotsWidth = Math.trunc(+document.getElementById('theDOTS').clientWidth);
// var boxesHeight = Math.trunc(+document.getElementById('svgCanvas').clientHeight);
// var boxesWidth = Math.trunc(+document.getElementById('svgCanvas').clientWidth);

dotRadius = Math.trunc(dotsHeight/70);

//var allScaled = d3.select('svg#allScaled');
//var scaledCombined = d3.select('svg#scaledCombined');

//the datum values that will hold all the d3 pulled data
var companyDetailed;
//cols -> company	year	race	gender	job_category	count
var companyList;
//cols -> company

//mega-function for loading all the d3 stuff
d3.csv('./dataset_split.csv', function(error, datum){
    if(error) {
        console.error('Error loading companyDetailed.csv dataset.');
        console.error(error);
        return;
    }
d3.csv('./Silicon-Valley-Diversity-Data-master/companyList.csv', function(error, datum2){
	if(error) {
		console.error('Error loading companyDetailed.csv dataset.');
		console.error(error);
		return;
	}
		
	//the datum values that will hold all the d3 pulled data
	companyDetailed = datum;
	//cols -> company	percentage	count	gender	race	job_category
	companyList = datum2;
	//cols -> company
	

	//create an array of companies and their totals, because that doesn't exist...
	//should turn this into the same format as the csv arrays at some point.
	companyList.forEach(d =>{
		var tempTotal = 0;
		companyDetailed.forEach(d2 => {
			if(d2['Company'] == d['company'])
			{	
				tempTotal += +d2['Count'];
			}
		});
		var temp = d['company'];
		companyTotals.push({"company" : temp , "total" : tempTotal});
		totalPopulationNum += tempTotal;
	});

	//scary array I'm praying works
	var addFlag = 0;
	jobTitleArray.forEach(d =>{
		raceArray.forEach(d2 =>{
			var tempSum = 0;
			genderArray.forEach(d5 =>{
				companyDetailed.forEach(d4 =>{
					if(addFlag == 0)//gonna create my total counts while we're here
					{		
						if(d4['job_category'] == "Manager")
							managerNum += +d4['Count'];
						if(d4['job_category'] == "Executive")
							executiveNum += +d4['Count'];
						if(d4['job_category'] == "Professionals")
							professionalNum += +d4['Count'];
						if(d4['job_category'] == "Supportive Workers")
							otherNum += +d4['Count'];
					}
					addFlag = 1;
					if(d4['Gender'] == d5 && d4['Race'] == d2 && d4['job_category'] == d)
					{
						tempSum+= +d4['Count'];
					}
				});
				dotCount.push([d, d2, d5, tempSum]);
				//console.log(tempSum);
			});
		});
	});
	//should be called in the format: dotCount[‘executive’[‘white’[‘male’]]] = 32;
		
	//go ahead and finish instatiating the rest of the variables I need
	managerPercent = managerNum/totalPopulationNum;
	executivePercent = executiveNum/totalPopulationNum;
	professionalPercent = professionalNum/totalPopulationNum;
	otherWorkerPercent = otherNum/totalPopulationNum;
	
	//creating the array of all the dots now that we have the counts
	dotCount.forEach(d =>{
		//this should create at least one dot per demographic and then account for rounding
		for(var i = 0; i < d[3]; i+=1000){
			if(i + 1000 > d[3]) 
			{
				dotArray.push(new dot(d[0], d[1], d[2], 0, 0, defaultColor, "halp", i%1000));
			}
			else	
				dotArray.push(new dot(d[0], d[1], d[2], 0, 0, defaultColor, "halp", 1000));			
		}
	});
	
	//initialize companyObjectList
	companyObjectList.push(Adobe);
	companyObjectList.push(Airbnb);
	companyObjectList.push(Apple);
	companyObjectList.push(Cisco);
	companyObjectList.push(eBay);
	companyObjectList.push(Facebook);
	companyObjectList.push(Google);
	companyObjectList.push(HP);
	companyObjectList.push(HPE);
	companyObjectList.push(Intel);
	companyObjectList.push(Intuit);
	companyObjectList.push(Linkedin);
	companyObjectList.push(Lyft);
	companyObjectList.push(MobileIron);
	companyObjectList.push(NetApp);
	companyObjectList.push(Nvidia);
	companyObjectList.push(PayPal);
	companyObjectList.push(Pinterest);
	companyObjectList.push(Salesforce);
	companyObjectList.push(Sanmina);
	companyObjectList.push(Square);
	companyObjectList.push(Twitter);
	companyObjectList.push(Uber);
	companyObjectList.push(View);

	//initialize companySortFemale
	companySortFemale.push(View);
	companySortFemale.push(Nvidia);
	companySortFemale.push(NetApp);
	companySortFemale.push(Intel);
	companySortFemale.push(Cisco);
	companySortFemale.push(Google);
	companySortFemale.push(Uber);
	companySortFemale.push(Apple);
	companySortFemale.push(HP);
	companySortFemale.push(MobileIron);
	companySortFemale.push(Facebook);
	companySortFemale.push(Salesforce);
	companySortFemale.push(Adobe);
	companySortFemale.push(HPE);
	companySortFemale.push(Square);
	companySortFemale.push(Twitter);
	companySortFemale.push(eBay);
	companySortFemale.push(Sanmina);
	companySortFemale.push(Linkedin);
	companySortFemale.push(Lyft);
	companySortFemale.push(Airbnb);
	companySortFemale.push(Intuit);
	companySortFemale.push(PayPal);
	companySortFemale.push(Pinterest);

	//initialize comapnySortFemaleWhite
	companySortFemaleWhite.push(Nvidia);
	companySortFemaleWhite.push(View);
	companySortFemaleWhite.push(MobileIron);
	companySortFemaleWhite.push(Intel);
	companySortFemaleWhite.push(Cisco);
	companySortFemaleWhite.push(NetApp);
	companySortFemaleWhite.push(Google);
	companySortFemaleWhite.push(Apple);
	companySortFemaleWhite.push(Facebook);
	companySortFemaleWhite.push(Uber);
	companySortFemaleWhite.push(Adobe);
	companySortFemaleWhite.push(Square);
	companySortFemaleWhite.push(eBay);
	companySortFemaleWhite.push(Salesforce);
	companySortFemaleWhite.push(Twitter);
	companySortFemaleWhite.push(HP);
	companySortFemaleWhite.push(Intuit);
	companySortFemaleWhite.push(Linkedin);
	companySortFemaleWhite.push(Sanmina);
	companySortFemaleWhite.push(HPE);
	companySortFemaleWhite.push(Airbnb);
	companySortFemaleWhite.push(PayPal);
	companySortFemaleWhite.push(Pinterest);
	companySortFemaleWhite.push(Lyft);
	//initialize companySortFemaleAsian
	companySortFemaleAsian.push(HPE);
	companySortFemaleAsian.push(HP);
	companySortFemaleAsian.push(Apple);
	companySortFemaleAsian.push(Lyft);
	companySortFemaleAsian.push(View);
	companySortFemaleAsian.push(NetApp);
	companySortFemaleAsian.push(Salesforce);
	companySortFemaleAsian.push(Uber);
	companySortFemaleAsian.push(PayPal);
	companySortFemaleAsian.push(Sanmina);
	companySortFemaleAsian.push(Square);
	companySortFemaleAsian.push(Adobe);
	companySortFemaleAsian.push(Cisco);
	companySortFemaleAsian.push(Google);
	companySortFemaleAsian.push(Intel);
	companySortFemaleAsian.push(Twitter);
	companySortFemaleAsian.push(Airbnb);
	companySortFemaleAsian.push(Nvidia);
	companySortFemaleAsian.push(eBay);
	companySortFemaleAsian.push(Facebook);
	companySortFemaleAsian.push(Intuit);
	companySortFemaleAsian.push(Linkedin);
	companySortFemaleAsian.push(Pinterest);
	companySortFemaleAsian.push(MobileIron);
	//initialize companySortFemaleAfrican
	companySortFemaleAfrican.push(Adobe);
	companySortFemaleAfrican.push(Facebook);
	companySortFemaleAfrican.push(Google);
	companySortFemaleAfrican.push(Intel);
	companySortFemaleAfrican.push(MobileIron);
	companySortFemaleAfrican.push(Nvidia);
	companySortFemaleAfrican.push(Pinterest);
	companySortFemaleAfrican.push(Salesforce);
	companySortFemaleAfrican.push(Twitter);
	companySortFemaleAfrican.push(Cisco);
	companySortFemaleAfrican.push(eBay);
	companySortFemaleAfrican.push(Airbnb);
	companySortFemaleAfrican.push(HP);
	companySortFemaleAfrican.push(Linkedin);
	companySortFemaleAfrican.push(NetApp);
	companySortFemaleAfrican.push(Square);
	companySortFemaleAfrican.push(View);
	companySortFemaleAfrican.push(HPE);
	companySortFemaleAfrican.push(Intuit);
	companySortFemaleAfrican.push(Sanmina);
	companySortFemaleAfrican.push(Uber);
	companySortFemaleAfrican.push(Apple);
	companySortFemaleAfrican.push(Lyft);
	companySortFemaleAfrican.push(PayPal);
	//initialize companySortFemaleHispanic
	companySortFemaleHispanic.push(Nvidia);
	companySortFemaleHispanic.push(View);
	companySortFemaleHispanic.push(Cisco);
	companySortFemaleHispanic.push(eBay);
	companySortFemaleHispanic.push(Facebook);
	companySortFemaleHispanic.push(Google);
	companySortFemaleHispanic.push(HPE);
	companySortFemaleHispanic.push(MobileIron);
	companySortFemaleHispanic.push(NetApp);
	companySortFemaleHispanic.push(Pinterest);
	companySortFemaleHispanic.push(Salesforce);
	companySortFemaleHispanic.push(Uber);
	companySortFemaleHispanic.push(Twitter);
	companySortFemaleHispanic.push(Adobe);
	companySortFemaleHispanic.push(HP);
	companySortFemaleHispanic.push(Intel);
	companySortFemaleHispanic.push(Linkedin);
	companySortFemaleHispanic.push(PayPal);
	companySortFemaleHispanic.push(Square);
	companySortFemaleHispanic.push(Airbnb);
	companySortFemaleHispanic.push(Intuit);
	companySortFemaleHispanic.push(Lyft);
	companySortFemaleHispanic.push(Sanmina);
	companySortFemaleHispanic.push(Apple);

	//initialize comapanySortFemaleMinority
	companySortFemaleMinority.push(Adobe);
	companySortFemaleMinority.push(Cisco);
	companySortFemaleMinority.push(eBay);
	companySortFemaleMinority.push(Google);
	companySortFemaleMinority.push(HP);
	companySortFemaleMinority.push(HPE);
	companySortFemaleMinority.push(Intel);
	companySortFemaleMinority.push(MobileIron);
	companySortFemaleMinority.push(NetApp);
	companySortFemaleMinority.push(Nvidia);
	companySortFemaleMinority.push(PayPal);
	companySortFemaleMinority.push(Sanmina);
	companySortFemaleMinority.push(View);
	companySortFemaleMinority.push(Airbnb);
	companySortFemaleMinority.push(Apple);
	companySortFemaleMinority.push(Facebook);
	companySortFemaleMinority.push(Intuit);
	companySortFemaleMinority.push(Linkedin);
	companySortFemaleMinority.push(Lyft);
	companySortFemaleMinority.push(Pinterest);
	companySortFemaleMinority.push(Salesforce);
	companySortFemaleMinority.push(Square);
	companySortFemaleMinority.push(Twitter);
	companySortFemaleMinority.push(Uber);

	//initialize comapanySortMaleWhite
	companySortMaleWhite.push(Pinterest);
	companySortMaleWhite.push(Linkedin);
	companySortMaleWhite.push(Airbnb);
	companySortMaleWhite.push(Intuit);
	companySortMaleWhite.push(PayPal);
	companySortMaleWhite.push(eBay);
	companySortMaleWhite.push(Sanmina);
	companySortMaleWhite.push(Facebook);
	companySortMaleWhite.push(Lyft);
	companySortMaleWhite.push(Intel);
	companySortMaleWhite.push(Nvidia);
	companySortMaleWhite.push(Twitter);
	companySortMaleWhite.push(Uber);
	companySortMaleWhite.push(Apple);
	companySortMaleWhite.push(Cisco);
	companySortMaleWhite.push(Google);
	companySortMaleWhite.push(MobileIron);
	companySortMaleWhite.push(Square);
	companySortMaleWhite.push(Salesforce);
	companySortMaleWhite.push(Adobe);
	companySortMaleWhite.push(View);
	companySortMaleWhite.push(HPE);
	companySortMaleWhite.push(NetApp);
	companySortMaleWhite.push(HP);

	//initialize comapanySortMaleAsian
	companySortMaleAsian.push(HP);
	companySortMaleAsian.push(HPE);
	companySortMaleAsian.push(Lyft);
	companySortMaleAsian.push(Apple);
	companySortMaleAsian.push(Sanmina);
	companySortMaleAsian.push(View);
	companySortMaleAsian.push(Adobe);
	companySortMaleAsian.push(Square);
	companySortMaleAsian.push(Salesforce);
	companySortMaleAsian.push(Intuit);
	companySortMaleAsian.push(PayPal);
	companySortMaleAsian.push(Airbnb);
	companySortMaleAsian.push(NetApp);
	companySortMaleAsian.push(Twitter);
	companySortMaleAsian.push(MobileIron);
	companySortMaleAsian.push(Google);
	companySortMaleAsian.push(Linkedin);
	companySortMaleAsian.push(Intel);
	companySortMaleAsian.push(Uber);
	companySortMaleAsian.push(Cisco);
	companySortMaleAsian.push(Facebook);
	companySortMaleAsian.push(Pinterest);
	companySortMaleAsian.push(eBay);
	companySortMaleAsian.push(Nvidia);

	//initialize companySortMaleAfrican
	companySortMaleAfrican.push(MobileIron);
	companySortMaleAfrican.push(Nvidia);
	companySortMaleAfrican.push(Adobe);
	companySortMaleAfrican.push(Airbnb);
	companySortMaleAfrican.push(eBay);
	companySortMaleAfrican.push(Facebook);
	companySortMaleAfrican.push(Google);
	companySortMaleAfrican.push(Intuit);
	companySortMaleAfrican.push(Linkedin);
	companySortMaleAfrican.push(Pinterest);
	companySortMaleAfrican.push(Salesforce);
	companySortMaleAfrican.push(Twitter);
	companySortMaleAfrican.push(Cisco);
	companySortMaleAfrican.push(HP);
	companySortMaleAfrican.push(Intel);
	companySortMaleAfrican.push(Lyft);
	companySortMaleAfrican.push(NetApp);
	companySortMaleAfrican.push(Square);
	companySortMaleAfrican.push(Uber);
	companySortMaleAfrican.push(HPE);
	companySortMaleAfrican.push(PayPal);
	companySortMaleAfrican.push(Sanmina);
	companySortMaleAfrican.push(Apple);
	companySortMaleAfrican.push(PayPal);

	//initialize companySortMaleHispanic
	companySortMaleHispanic.push(Adobe);
	companySortMaleHispanic.push(Airbnb);
	companySortMaleHispanic.push(eBay);
	companySortMaleHispanic.push(Facebook);
	companySortMaleHispanic.push(Linkedin);
	companySortMaleHispanic.push(NetApp);
	companySortMaleHispanic.push(Nvidia);
	companySortMaleHispanic.push(Pinterest);
	companySortMaleHispanic.push(Salesforce);
	companySortMaleHispanic.push(Twitter);
	companySortMaleHispanic.push(Uber);
	companySortMaleHispanic.push(Cisco);
	companySortMaleHispanic.push(Google);
	companySortMaleHispanic.push(HPE);
	companySortMaleHispanic.push(Lyft);
	companySortMaleHispanic.push(PayPal);
	companySortMaleHispanic.push(Square);
	companySortMaleHispanic.push(View);
	companySortMaleHispanic.push(Intuit);
	companySortMaleHispanic.push(MobileIron);
	companySortMaleHispanic.push(Intel);
	companySortMaleHispanic.push(HP);
	companySortMaleHispanic.push(Sanmina);
	companySortMaleHispanic.push(Apple);

	//initialize companySortMaleMinority
	companySortMaleMinority.push(Cisco);
	companySortMaleMinority.push(eBay);
	companySortMaleMinority.push(Nvidia);
	companySortMaleMinority.push(PayPal);
	companySortMaleMinority.push(Sanmina);
	companySortMaleMinority.push(Adobe);
	companySortMaleMinority.push(Apple);
	companySortMaleMinority.push(Facebook);
	companySortMaleMinority.push(Google);
	companySortMaleMinority.push(HP);
	companySortMaleMinority.push(HPE);
	companySortMaleMinority.push(Intel);
	companySortMaleMinority.push(Intuit);
	companySortMaleMinority.push(Linkedin);
	companySortMaleMinority.push(MobileIron);
	companySortMaleMinority.push(NetApp);
	companySortMaleMinority.push(Salesforce);
	companySortMaleMinority.push(Twitter);
	companySortMaleMinority.push(Lyft);
	companySortMaleMinority.push(Airbnb);
	companySortMaleMinority.push(Pinterest);
	companySortMaleMinority.push(Square);
	companySortMaleMinority.push(Uber);
	companySortMaleMinority.push(View);
	
	for (var i = 0; i < companyObjectList.length; i++) {
		calculateCompanyInfo(companyObjectList[i], companyDetailed);
	}	
	
	preLoad();
	loaded = 1;
	scrollChange();
});
});	
		
function dot(work, ethnicity, gender, x, y, color, label, extra){
	this.work = work;
	this.ethnicity = ethnicity;
	this.gender = gender;
	this.x = x;
	this.y = y;
	this.color = color;
	this.label = label;
	this.extra = extra;
}

//update function is mostly a state machine handler
function update(){
	var temp = document.getElementById("d3Stuff").className;
	if(temp =="part0") //preloading everything
		state0();
	if(temp =="part1") //whole population scrolls to p3 or clicks to p2
		state1();
	if(temp =="part2") //displays job title info
		state2();
	if(temp =="part3") //execs fly up
		state3();
	if(temp =="part4") //managers fly up
		state4();
	if(temp =="part5") //others split out
		state5();
	if(temp =="part6") //remove dots add percentile scale
		state6();
	if(temp =="part7") //add dots to scale
		state7();
	if(temp =="part8") //colors the dots. allows scrolling to the next phase. make sure to not despawn the graphics
		state8();
	if(temp =="part9") //locks to box view
		state9();
	if(temp =="part10") //displays gender drop down view
		state10();
	if(temp =="part11") //displays gender + ethnicity drop down view
		state11();
	if(temp =="part12") //DONE. allows scrolling to the Lee's phase. make sure to not get despawn the graphics
		state12();
		
}


function preLoad()
{
	var dotLegend = dots.append('g')
		.attr('class', 'dot-legend')
		.style('opacity', 0.0);
	
		dotLegend.append('circle')
		.attr('class', 'dots-style')
		.attr('r', dotRadius)
		.style('fill', defaultColor)
		.style('stroke', defDotStroke)
		.style('stroke-width', dotRadius/2)
		.attr('transform', function(d) {
			var tempX = dotsWidth*.4;
			var tempY = dotsHeight*.2;
			return 'translate('+ [tempX, tempY] +')';
		});
	
		dotLegend.append("text")
		.attr('class', 'h4')
		.attr('transform', function(d) {
			var tempX = dotsWidth*.42;
			var tempY = dotsHeight*.2 + dotRadius;
			return 'translate('+ [tempX, tempY] +')';
		})
		.text("= 1000 people");
		
	var totalPop = dots.append('g')
		.attr('class', 'popTotalText')
		.append("text")
		.attr('class', 'h2')
		.style('opacity', 1.0)
		.style('text-anchor', 'middle')
		.attr('transform', function(d) {
			var tempX = dotsWidth*.5;
			var tempY = dotsHeight+50;
			return 'translate('+ [tempX, tempY] +')';
		})
		.text("375,780 people");
		
		
	var execText = dots.append('g')
		.attr('class', 'execText')
		.style('opacity', 0.0)
		.attr('transform', function(d) {
			var tempX = dotsWidth*.5 + dotRadius * 4;
			var tempY = dotsHeight*.18;
			return 'translate('+ [tempX, tempY] +')';
		});

		execText.append("text")
		.attr('class', 'h3')
		.style('text-anchor', 'middle')
		.text("1%");
		
		execText.append("text")
		.attr('class', 'h4')
		.style('text-anchor', 'middle')
		.attr('transform', function(d) {
			var tempX = 0;
			var tempY = dotRadius*12;
			return 'translate('+ [tempX, tempY] +')';
		})
		.text("3785 Executives");
		
	var manageText = dots.append('g')
		.attr('class', 'manageText')
		.style('opacity', 0.0)
		.attr('transform', function(d) {
			var tempX = dotsWidth*.5 + dotRadius * 13;
			var tempY = dotsHeight*.3 - dotRadius * 16;
			return 'translate('+ [tempX, tempY] +')';
		});
		
		manageText.append("text")
		.attr('class', 'h3')
		.style('text-anchor', 'middle')
		.text("14.74%");
		
		manageText.append("text")
		.attr('class', 'h4')
		.style('text-anchor', 'middle')
		.attr('transform', function(d) {
			var tempX = 0;
			var tempY = dotRadius*21;
			return 'translate('+ [tempX, tempY] +')';
		})
		.text("53,380 Managers");
		
	var proText = dots.append('g')
		.attr('class', 'proText')
		.style('opacity', 0.0)
		.append("text")
		.attr('class', 'p')
		.style('text-anchor', 'middle')
		.attr('transform', function(d) {
			var tempX = dotsWidth*.1 + dotRadius*25;
			var tempY = dotsHeight*.97;
			return 'translate('+ [tempX, tempY] +')';
		})
		.text("213,287 Professionals");
		
	var supText = dots.append('g')
		.attr('class', 'supText')
		.style('opacity', 0.0)
		.append("text")
		.attr('class', 'p')
		.style('text-anchor', 'middle')
		.attr('transform', function(d) {
			var tempX = dotsWidth*.66 + dotRadius*15;
			var tempY = dotsHeight*.97;
			return 'translate('+ [tempX, tempY] +')';
		})
		.text("103,345 Other Workers");
		
	var axis = dots.append('g')
		.attr('class', 'axis')
		.attr('transform', function(d) {
			var tempX = dotsWidth*.5;
			var tempY = dotsHeight*.1;
			return 'translate('+ [tempX, tempY] +')';
		})
		.style('opacity', 0.0);
		//left lines
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", -dotsWidth*.05 + dotRadius*2)
			.attr("y1", 0)
			.attr("x2", -dotsWidth*.05 + dotRadius*2)
            .attr("y2", dotRadius*59);
			
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", -dotsWidth*.05 + dotRadius*2)
			.attr("y1", dotRadius*1)
			.attr("x2", -dotsWidth*.05 + dotRadius*4)
            .attr("y2", dotRadius*1);
			
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", -dotsWidth*.05 + dotRadius*2)
			.attr("y1", dotRadius*16)
			.attr("x2", -dotsWidth*.05 + dotRadius*4)
            .attr("y2", dotRadius*16);
			
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", -dotsWidth*.05 + dotRadius*2)
			.attr("y1", dotRadius*44)
			.attr("x2", -dotsWidth*.05 + dotRadius*4)
            .attr("y2", dotRadius*44);	
		
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", -dotsWidth*.05 + dotRadius*2)
			.attr("y1", dotRadius*59)
			.attr("x2", -dotsWidth*.05 + dotRadius*4)
            .attr("y2", dotRadius*59);	
		//right lines	
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", dotsWidth*.05 - dotRadius*2)
			.attr("y1", 0)
			.attr("x2", dotsWidth*.05 - dotRadius*2)
            .attr("y2", dotRadius*59);
			
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", dotsWidth*.05 - dotRadius*2)
			.attr("y1", dotRadius*1)
			.attr("x2", dotsWidth*.05 - dotRadius*4)
            .attr("y2", dotRadius*1);
			
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", dotsWidth*.05 - dotRadius*2)
			.attr("y1", dotRadius*16)
			.attr("x2", dotsWidth*.05 - dotRadius*4)
            .attr("y2", dotRadius*16);
			
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", dotsWidth*.05 - dotRadius*2)
			.attr("y1", dotRadius*44)
			.attr("x2", dotsWidth*.05 - dotRadius*4)
            .attr("y2", dotRadius*44);	
		
		axis.append("line")
			.attr('class', 'line')
			.attr("x1", dotsWidth*.05 - dotRadius*2)
			.attr("y1", dotRadius*59)
			.attr("x2", dotsWidth*.05 - dotRadius*4)
            .attr("y2", dotRadius*59);	
			
		//axis text
		axis.append("text")
			.attr('class', 'h4')
			.style('text-anchor', 'end')
			.attr('transform', function(d) {
					var tempX = -dotRadius*4;
					var tempY = -dotRadius*3;
					return 'translate('+ [tempX, tempY] +')';
			})
			.text("Female");
		axis.append("text")
			.attr('class', 'h4')
			.style('text-anchor', 'start')
			.attr('transform', function(d) {
					var tempX = dotRadius*4;
					var tempY = -dotRadius*3;
					return 'translate('+ [tempX, tempY] +')';
			})
			.text("Male");
		
		axis.append("text")
			.attr('class', 'p')
			.style('text-anchor', 'middle')
			.attr('transform', function(d) {
					var tempX = 0;
					var tempY = 0;
					return 'translate('+ [tempX, tempY] +')';
			})
			.text("1%");
		
		axis.append("text")
			.attr('class', 'p')
			.style('text-anchor', 'middle')
			.attr('transform', function(d) {
					var tempX = 0;
					var tempY = dotRadius*15;
					return 'translate('+ [tempX, tempY] +')';
			})
			.text("15.7%");
		
		axis.append("text")
			.attr('class', 'p')
			.style('text-anchor', 'middle')
			.attr('transform', function(d) {
					var tempX = 0;
					var tempY = dotRadius*43;
					return 'translate('+ [tempX, tempY] +')';
			})
			.text("72.5%");
			
		axis.append("text")
			.attr('class', 'p')
			.style('text-anchor', 'middle')
			.attr('transform', function(d) {
					var tempX = 0;
					var tempY = dotRadius*58;
					return 'translate('+ [tempX, tempY] +')';
			})
			.text("100%");
		
			
		
	var dotsPlaced = dots.selectAll('dots')
		.data(dotArray)
		.enter()
		.append('g')
		.style('fill', function(d) {
			return d.color;})
		.attr('class', 'dots');
	
	dotsPlaced.append('circle')
		.attr('class','dots-style')
		.style('stroke', defDotStroke)
		.style('stroke-width', dotRadius/2.5)
		.attr('r', dotRadius);	
}

//preload the first graphic
function state0() 
{
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
	graphic1(); //
}
//the overall first graphic
function state1() 
{		
	//first, the html stuff
	//document.getElementById("caption").style.position = "sticky";
	//document.getElementById("caption").style.top = "30%";
	//document.getElementById("caption").style.left = "33%";
	
	
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
	//document.getElementById("summaryText").innerHTML = "Hello, this is part 1 of the dataset summary";
	//graphic1();
}

function graphic1() //done
{
 	var dotsPlaced = dots.selectAll('.dots')
		.transition()
		.attr('transform', function(d, i){
			d.x = (dotRadius*2+1)*(i%dotCols)+20;
			if(Math.floor(i/dotCols)%2 == 1)
				d.x += dotRadius;			
			d.y = dotsHeight*.9-((dotRadius*2+0)*Math.floor(i/dotCols));
			return 'translate('+ [d.x, d.y] +')';
		})
		.duration(500);
		
	var dotLegend = dots.selectAll('.dot-legend')
		.transition()
		.style('opacity', 1.0);

	var execText = dots.selectAll('.execText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);

	
}

//text changes?
function state2(){
	//first, the html stuff
	//document.getElementById("caption").style.position = "fixed";
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
	//graphic1(); //same as graphic one, so no graphicc for this
}


//execs fly up
function state3(){
	//first, the html stuff
	//document.getElementById("caption").style.position = "fixed";
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
	graphic3();
}

function graphic3() //done
{
	
	var execCount = 0;
	var execCols = 4;
	var execLastY = 0;
			
	var dotsPlaced = dots.selectAll('.dots')
		.transition()
		.attr('transform', function(d, i){
			
			d.x = (dotRadius*2+1)*(i%dotCols)+20;
			if(Math.floor(i/dotCols)%2 == 1)
				d.x += dotRadius;			
			d.y = dotsHeight*.9-((dotRadius*2+0)*Math.floor(i/dotCols));
			
			if(d.work == "Executives")
			{
				d.y = dotsHeight*.25-((dotRadius*2+0)*Math.floor(execCount/execCols));
				execLastY = d.y - dotRadius*3;

				d.x = (dotRadius*2+1)*(i%execCols)+dotsWidth/2;
				if(Math.floor(execCount/execCols)%2 == 1)
					d.x += dotRadius;	
				
				execCount++;
			}
			return 'translate('+ [d.x, d.y] +')';
		})
		.duration(500);
		
	var dotLegend = dots.selectAll('.dot-legend')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
	var execText = dots.selectAll('.execText')
		.transition()
		.style('opacity', 1.0)
		.attr('transform', function(d) {
			var tempX = dotsWidth*.5 + dotRadius * 4;
			var tempY = execLastY;
			return 'translate('+ [tempX, tempY] +')';
		})
		.duration(500);
		
	var manageText = dots.selectAll('.manageText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
}

//managers fly up
function state4()
{		
	//first, the html stuff
	//document.getElementById("caption").style.position = "fixed";
	
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
	//document.getElementById("summaryText").innerHTML = "Hello, this is part 1 of the dataset summary";
	graphic4();
}

function graphic4()
{
	
	var execCount = 0;
	var execCols = 4;
	var execLastY = 0;
	
	var manCount = 0;
	var manCols = 12;
	
	var dotsPlaced = dots.selectAll('.dots')
		.transition()
		.attr('transform', function(d, i){
			
			d.x = (dotRadius*2+1)*(i%dotCols)+20;
			if(Math.floor(i/dotCols)%2 == 1)
				d.x += dotRadius;			
			d.y = dotsHeight*.9-((dotRadius*2+0)*Math.floor(i/dotCols));
			
			if(d.work == "Executives")
			{
				d.y = dotsHeight*.25-((dotRadius*2+0)*Math.floor(execCount/execCols));
				execLastY = d.y;

				d.x = (dotRadius*2+1)*(i%execCols)+dotsWidth/5;
				if(Math.floor(execCount/execCols)%2 == 1)
					d.x += dotRadius;	
				
				execCount++;
			}
			if(d.work == "Managers")
			{
				d.y = dotsHeight*.3-((dotRadius*2+0)*Math.floor(manCount/manCols));
				
				d.x = (dotRadius*2+1)*(i%manCols)+dotsWidth/2;
				if(Math.floor(manCount/manCols)%2 == 1)
					d.x += dotRadius;	
				
				manCount++;
			}
			return 'translate('+ [d.x, d.y] +')';
		})
		.duration(500);
	
	var execText = dots.selectAll('.execText')
		.transition()
		.style('opacity', 1.0)
		.attr('transform', function(d) {
			var tempX = dotsWidth*.2 + dotRadius * 4;
			var tempY = execLastY - dotRadius*3;
			return 'translate('+ [tempX, tempY] +')';
		})
		.duration(500);
	
	var manageText = dots.selectAll('.manageText')
		.transition()
		.style('opacity', 1.0)
		.duration(500);
		
	var proText = dots.selectAll('.proText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
	var supText = dots.selectAll('.supText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
	
}

//bottom half splits out
function state5(){
	//first, the html stuff
	//document.getElementById("caption").style.position = "fixed";
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
	graphic5();
}

function graphic5() //done
{

	var execCount = 0;
	var execCols = 4;
	var execLastY = 0;
	
	var manCount = 0;
	var manCols = 12;
	
	var supCount = 0;
	var supCols = 15;
	
	var proCount = 0;
	var proCols = 25;
	
	var dotsPlaced = dots.selectAll('.dots')
		.transition()
		.style("opacity", 1.0)
		.attr('transform', function(d, i){
			
			d.x = (dotRadius*2+1)*(i%dotCols)+20;
			if(Math.floor(i/dotCols)%2 == 1)
				d.x += dotRadius;			
			d.y = dotsHeight-((dotRadius*2+0)*Math.floor(i/dotCols));
			
			if(d.work == "Executives")
			{
				d.y = dotsHeight*.25-((dotRadius*2+0)*Math.floor(execCount/execCols));
				execLastY = d.y;

				d.x = (dotRadius*2+1)*(i%execCols)+dotsWidth/5;
				if(Math.floor(execCount/execCols)%2 == 1)
					d.x += dotRadius;	
				
				execCount++;
			}
			if(d.work == "Managers")
			{
				d.y = dotsHeight*.3-((dotRadius*2+0)*Math.floor(manCount/manCols));
				
				d.x = (dotRadius*2+1)*(i%manCols)+dotsWidth/2;
				if(Math.floor(manCount/manCols)%2 == 1)
					d.x += dotRadius;	
				
				manCount++;
			}
			if(d.work == "Supportive workers")
			{
				d.y = dotsHeight*.9-((dotRadius*2+0)*Math.floor(supCount/supCols));
						
				d.x = (dotRadius*2+1)*(i%supCols)+(dotsWidth*.66);
				if(Math.floor(supCount/supCols)%2 == 1)
					d.x += dotRadius;	
				
				supCount++;
			}
			if(d.work == "Professionals")
			{
				d.y = dotsHeight*.9-((dotRadius*2+0)*Math.floor(proCount/proCols));
			
				d.x = (dotRadius*2+1)*(i%proCols)+dotsWidth/10;
				if(Math.floor(proCount/proCols)%2 == 1)
					d.x += dotRadius;	
				
				proCount++;
			}
			
			return 'translate('+ [d.x, d.y] +')';
		})
		.duration(500);	
		
		var execText = dots.selectAll('.execText')
		.transition()
		.style('opacity', 1.0)
		.attr('transform', function(d) {
			var tempX = dotsWidth*.2 + dotRadius * 4;;
			var tempY = execLastY - dotRadius * 3;
			return 'translate('+ [tempX, tempY] +')';
		})
		.duration(500);
		
		var manageText = dots.selectAll('.manageText')
		.transition()
		.style('opacity', 1.0)
		.duration(500);
		
		var proText = dots.selectAll('.proText')
		.transition()
		.style('opacity', 1.0)
		.duration(500);
		
		var supText = dots.selectAll('.supText')
		.transition()
		.style('opacity', 1.0)
		.duration(500);
		
		var axis = dots.selectAll('.axis')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
		
}

//remove the dots, add the scale
function state6(){
	//first, the html stuff
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
	graphic6();
}

function graphic6()
{
	var dotsPlaced = dots.selectAll('.dots')
		.transition()
		.style("stroke", defDotStroke)
		.style("opacity", 0.0)
		.duration(500);
	
	var execText = dots.selectAll('.execText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
	var manageText = dots.selectAll('.manageText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
	var proText = dots.selectAll('.proText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
	var supText = dots.selectAll('.supText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
	var totalPop = dots.selectAll('popTotalText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
		
	//draw the axes
	var axis = dots.selectAll('.axis')
		.transition()
		.style('opacity', 1.0)
		.duration(500);

}

//add the dots back by gender
function state7()
{		
	//first, the html stuff
	
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
	graphic7();
}

function graphic7()
{
	var dotsPlaced = dots.selectAll('.dots')

	var execCols = [8,8];
	var execGen = [0,0];
	
	var manCols = [6,8];
	var manGen = [0,0];
	
	var proCols = [11,15];
	var proGen = [0,0];
	
	var supCols = [10,16];
	var supGen = [0,0];
	

	var circles = dots.selectAll('.dots-style')
		.transition()
		.style('stroke', defDotStroke)
		.style('stroke-width',  dotRadius/2.5)
		.duration(500);
		
	
	var dotsPlaced = dots.selectAll('.dots')
		.transition()
		.style('opacity', 1.0)
		.style('fill', defaultColor)
		.attr('transform', function(d, i){
			
			if(d.work == "Executives")
			{
				if(d.gender == "Male")
				{
					d.y = dotsHeight*.1-((dotRadius*2+0)*Math.floor(execGen[0]/execCols[0]));
					
					d.x = (dotsWidth*.45)-((dotRadius*2+1)*(execGen[0]%execCols[0]));
					if(Math.floor(execGen[0]/execCols[0])%2 == 1)
						d.x -= dotRadius;
					execGen[0]++;
				}
				if(d.gender == "Female")
				{
					d.y = dotsHeight*.1-((dotRadius*2+0)*Math.floor(execGen[1]/execCols[1]));
				
					d.x = (dotsWidth*.55)+((dotRadius*2+1)*(execGen[1]%execCols[1]));
					if(Math.floor(execGen[1]/execCols[1])%2 == 1)
						d.x += dotRadius;
					execGen[1]++;
				}
			}
			if(d.work == "Managers")
			{
				if(d.gender == "Male")
				{
					d.y = (dotsHeight*.1+((dotRadius*2+0)*Math.floor(manGen[0]/manCols[0])))+(dotRadius*2.5);
				
					d.x = (dotsWidth*.45)-((dotRadius*2+1)*(manGen[0]%manCols[0]));
					if(Math.floor(manGen[0]/manCols[0])%2 == 1)
						d.x -= dotRadius;
					manGen[0]++;
				}
				if(d.gender == "Female")
				{
					d.y = (dotsHeight*.1+((dotRadius*2+0)*Math.floor(manGen[1]/manCols[1])))+(dotRadius*2.5);
				
					d.x = (dotsWidth*.55)+((dotRadius*2+1)*(manGen[1]%manCols[1]));
					if(Math.floor(manGen[1]/manCols[1])%2 == 1)
						d.x += dotRadius;
					manGen[1]++;
				}
			}
			if(d.work == "Professionals")
			{
				if(d.gender == "Male")
				{
					d.y = (dotsHeight*.1+((dotRadius*2+0)*Math.floor(proGen[0]/proCols[0])))+(dotRadius*17);
				
					d.x = (dotsWidth*.45)-((dotRadius*2+1)*(proGen[0]%proCols[0]));
					if(Math.floor(proGen[0]/proCols[0])%2 == 1)
						d.x -= dotRadius;
					proGen[0]++;
				}
				if(d.gender == "Female")
				{
					d.y = (dotsHeight*.1+((dotRadius*2+0)*Math.floor(proGen[1]/proCols[1])))+(dotRadius*17);
				
					d.x = (dotsWidth*.55)+((dotRadius*2+1)*(proGen[1]%proCols[1]));
					if(Math.floor(proGen[1]/proCols[1])%2 == 1)
						d.x += dotRadius;
					proGen[1]++;
				}
			}
			if(d.work == "Supportive workers")
			{
				if(d.gender == "Male")
				{
					d.y = (dotsHeight*.1+((dotRadius*2+0)*Math.floor(supGen[0]/supCols[0])))+(dotRadius*45.5);
					
					d.x = (dotsWidth*.45)-((dotRadius*2+1)*(supGen[0]%supCols[0]));
					if(Math.floor(supGen[0]/supCols[0])%2 == 1)
						d.x -= dotRadius;
					supGen[0]++;
				}
				if(d.gender == "Female")
				{
					d.y = (dotsHeight*.1+((dotRadius*2+0)*Math.floor(supGen[1]/supCols[1])))+(dotRadius*45.5);
					
					d.x = (dotsWidth*.55)+((dotRadius*2+1)*(supGen[1]%supCols[1]));
					if(Math.floor(supGen[1]/supCols[1])%2 == 1)
						d.x += dotRadius;
					supGen[1]++;
				}
			}
			
			return 'translate('+ [d.x, d.y] +')';
		})
		.duration(500);
	
	var axis = dots.selectAll('.axis')
		.transition()
		.style('opacity', 1.0)
		.duration(500);	
		
	var totalPop = dots.selectAll('popTotalText')
		.transition()
		.style('opacity', 0.0)
		.duration(500);
	
}

//allow scrolling, move to the boxes, preload the boxes
//color gots by race
function state8(){
	//first, the html stuff
	document.getElementById("box_text_1").className = "active";
	document.getElementById("box_text_2").className = "inactive";
	document.getElementById("box_text_3").className = "inactive";
	document.getElementById("checkbox").className = "inactive";
//	graphic1();
	
/* 	document.getElementById("selection1").style.visibility = 'hidden';
    document.getElementById("selection2").style.visibility = 'hidden';
    document.getElementById('checkbox').style.visibility = 'hidden';
    document.getElementById("part1-2").style.top = "0";
    document.getElementById("part1-2").style.left = "0";
    var myNode = document.getElementById("svgCanvas");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var myNode2 = document.getElementById("header2");
    while (myNode2.firstChild) {
        myNode2.removeChild(myNode2.firstChild);
    }
    document.getElementById("header1").innerHTML = "Let's see if we can find your place in there companies.</br>" +
        "Below are the 24 tech companies who reported their diversity in EEO-1 report in 2016. Each </br>square represents " +
        "100% of their employees. The Total number of employees is written.";
 	 */
	graphic8();
	
}

function graphic8()
{
	graphic7();
	
	var dotsPlaced = dots.selectAll('.dots')
		.transition()
		.style('fill', function(d){
			return ethnicityColor[d.ethnicity];
		})
		.duration(500);
	
	var circsPlaced = dots.selectAll('.dots-style')
		.transition()
		.style('stroke', d3.rgb(150,150,150))
		.style('stroke-width', 2)
		.duration(500);

		graphic9();
}

//locks to the box view
function state9(){
	//first, the html stuff
	//document.getElementById("caption").style.position = "fixed";
 	document.getElementById("box_text_1").className = "active";
	document.getElementById("box_text_2").className = "inactive";
	document.getElementById("box_text_3").className = "inactive";
	document.getElementById("checkbox").className = "inactive";
 
	graphic9();
	
}

function graphic9()
{
	clean_rect();
	draw_num_employees();
}

//dsiplay gender drop down
function state10()
{		
	//first, the html stuff
 	document.getElementById("box_text_1").className = "inactive";
	document.getElementById("box_text_2").className = "active";
	document.getElementById("box_text_3").className = "inactive";
	document.getElementById("checkbox").className = "active";
 
	graphic10();
}

function graphic10()
{
	clean_rect();
	hightlight_change();
}

//display gender and ethnicity
function state11(){
	//first, the html stuff
	document.getElementById("box_text_1").className = "inactive";
	document.getElementById("box_text_2").className = "inactive";
	document.getElementById("box_text_3").className = "active";
	document.getElementById("checkbox").className = "active";
	
	graphic11();
}

function graphic11()
{
	clean_rect();
	hightlight_change();
}

//DONE. allow scrolling to Lee's stuff
function state12(){
	//first, the html stuff
	//document.getElementById("caption").style.position = "static";
	document.getElementById("svgText").innerHTML = "Hello, this is part 12 of the dataset";
	
}


function calculateCompanyInfo(company, dataset) {
    var totalPopulation = 0;
    var femalePopulation = 0;
    var malePopulation = 0;
    var whiteFemale = 0;
    var asianFemale = 0;
    var africanFemale = 0;
    var hispanicFemale = 0;
    var minorityFemale = 0;
    var whiteMale = 0;
    var asianMale = 0;
    var africanMale = 0;
    var hispanicMale = 0;
    var minorityMale = 0;
	dataset.filter(function(d) {
        if (d.Company === company.name){
            totalPopulation += parseInt(d.Count);
            if (d.Gender === 'Female') {
            	femalePopulation += parseInt(d.Count);
            	if (d.Race === 'White') {
            		whiteFemale += parseInt(d.Count);
				}
				if (d.Race === 'Asian') {
					asianFemale += parseInt(d.Count);
				}
                if (d.Race === 'Black_or_African_American') {
					africanFemale += parseInt(d.Count);
                }
                if (d.Race === 'Hispanic_or_Latino') {
					hispanicFemale += parseInt(d.Count);
                }
                if (d.Race === 'Minorities ') {
					minorityFemale += parseInt(d.Count);
                }
			}
			if (d.Gender === 'Male') {
				malePopulation += parseInt(d.Count);
                if (d.Race === 'White') {
                    whiteMale += parseInt(d.Count);
                }
                if (d.Race === 'Asian') {
                    asianMale += parseInt(d.Count);
                }
                if (d.Race === 'Black_or_African_American') {
                    africanMale += parseInt(d.Count);
                }
                if (d.Race === 'Hispanic_or_Latino') {
                    hispanicMale += parseInt(d.Count);
                }
                if (d.Race === 'Minorities ') {
                    minorityMale += parseInt(d.Count);
                }
			}
        }
    });
	company.totalPopulation = totalPopulation;
	company.femalePopulation = femalePopulation;
	company.malePopulation = malePopulation;
	company.femaleWhite = whiteFemale;
	company.femaleAsian = asianFemale;
	company.femaleAfrican = africanFemale;
	company.femaleHispanic = hispanicFemale;
	company.femaleMinority = minorityFemale;
	company.maleWhite = whiteMale;
	company.maleAsian = asianMale;
	company.maleAfrican = africanMale;
	company.maleHispanic = hispanicMale;
	company.maleMinority = minorityMale;
}

//function to trigger the new vis state
function scrollChange(){
	var docScroll = document.documentElement.scrollTop;
	var view = document.getElementById("d3Stuff");
	var divHeight = 1.5*view.clientHeight;
	var screenHeight = window.innerHeight;
	var triggerline = screenHeight*.5;


	view.className =  "part0"
	thisState = 0;
	
	if(document.getElementById("part_1_text").offsetTop - docScroll < triggerline)
	{
		view.className = "part1";
		thisState = 1;
	}
	if(document.getElementById("part_2_text").offsetTop - docScroll < triggerline)
	{
		view.className = "part2";
		thisState = 2;
	}
	if(document.getElementById("part_3_text").offsetTop - docScroll < triggerline)
	{
		view.className = "part3";
		thisState = 3;
	}
	if(document.getElementById("part_4_text").offsetTop - docScroll < triggerline*1.5)
	{
		view.className = "part4";
		thisState = 4;
	}
	if(document.getElementById("part_5_text").offsetTop - docScroll < triggerline)
	{
		view.className = "part5";
		thisState = 5;
	}
	if(document.getElementById("part_6_text").offsetTop - docScroll < triggerline)
	{
		view.className = "part6";
		thisState = 6;
	}
	if(document.getElementById("part_6_test").offsetTop - docScroll < triggerline*3 && thisState > 5)
	{
		view.className = "part7";
		thisState = 7;
	}
	if(document.getElementById("part_7_text").offsetTop - docScroll < triggerline*1.8)
	{
		view.className = "part8";
		thisState = 8;
	}
	if(document.getElementById("part1-2").offsetTop - docScroll < triggerline/2)
	{
		view.className = "part9";
		thisState = 9;
	}
	if(document.getElementById("part_7_text").offsetTop - docScroll < -4*triggerline)
	{
		view.className = "part10";
		thisState = 10;
	}
	if(document.getElementById("part_7_text").offsetTop - docScroll < -6*triggerline)
	{
		view.className = "part11";
		thisState = 11;
	}
	if(document.getElementById("part_7_text").offsetTop - docScroll < -8*triggerline)
	{
		view.className = "part12";
		thisState = 12;
	}
	
	//saving time by only triggering the event when the state changes
	if(lastState != thisState && loaded == 1){
		lastState = thisState;
		update();
		console.log(thisState);
	}
}





// -------------------------------------------------------------

// part 1-2 re-implement

// translate helper function
function t(x, y) {
	return 'translate(' + x + ', ' + y + ')';
};

// number of employees
function draw_num_employees() {
	if (rect_obj.svg.selectAll('.num_employees').empty()) {
		var g = rect_obj.g;
		num_employees_color = rect_obj.num_employees_color;
		rect_width = rect_obj.rect_width;

		g.append('text')
			.attr('class', function(d) {
				return 'num_employees ' + d.num_employees;
			})
			.attr('fill', num_employees_color)
			.attr('x', rect_width / 2)
			.attr('y', rect_width / 2)
			.style('text-anchor', 'middle')
			.attr('dy', '0.3em')
			.text(function(d) {
				return d.num_employees.toLocaleString();
			});
	} else {
		rect_obj.svg.selectAll('.num_employees')
			.transition()
			.duration(500)
			.style('opacity', 1);
	};
	
	change_pos(600);
};

// draw gender divider
function draw_gender_divider(gender) {
	var g = rect_obj.g,
		rect_width = rect_obj.rect_width,
		rect_border_color = rect_obj.rect_border_color,
		rect_border_width = rect_obj.rect_border_width,
		rect_highlight_color = rect_obj.rect_highlight_color;

	if (rect_obj.svg.selectAll('.gender_divider').empty()) {
		g.append('rect')
			.attr('class', function(d) {
				return 'gender_divider ' + d.company;
			})
			.attr('width', 0.)
			.attr('height', rect_width)
			.style('stroke', rect_border_color)
			.style('fill', rect_highlight_color)
			.style('stroke-width', rect_border_width);
	}

	g.selectAll('rect.gender_divider')
		.transition()
		.duration(500)
		.attr('width', function(d) {
			return d[gender] * rect_width / 100.;
		});
		
	change_pos(600);
}

// draw gender and race divider
function draw_gender_race_divider(gender, race) {
	var g = rect_obj.g,
		rect_width = rect_obj.rect_width,
		rect_border_color = rect_obj.rect_border_color,
		rect_border_width = rect_obj.rect_border_width,
		races_to_id = rect_obj.races_to_id,
		rect_highlight_color = rect_obj.rect_highlight_color

	var start_idx = races_to_id[race];

	// for setting psum
	g.style('fill', function(d) {
		d.psum = 0.;
	});

	if (rect_obj.svg.selectAll('.gender_race_divider').empty()) {
		for (var i = 0; i < 5; ++i) {
			var fill = 'none',
				height = 0;

			if (i == 0) {
				fill = rect_highlight_color;
			};
			if (i == 4) {
				height = rect_width;
			};

			g.append('rect')
				.attr('class', function(d) {
					return 'gender_race_divider ' + d.company + ' c' + i;
				})
				.attr('width', 0.)
				.attr('height', height)
				.style('stroke', rect_border_color)
				.style('fill', fill)
				.style('stroke-width', rect_border_width-1);
		}
	}

	for (var i = 0; i < 5; ++i) {
		var idx = start_idx + i;
		if (idx >= 5) {
			idx -= 5;
		};

		g.selectAll('rect.gender_race_divider.c' + i)
			.transition()
			.delay(800)
			.duration(300)
			.attr('width', function(d) {
				return d[gender] * rect_width / 100.;
			})
			.transition()
			.duration(300)
			.attr('height', function(d) {
				d.psum += d[gender + '_list'][idx];
				return (d.psum / d[gender]) * rect_width;
			});		
	};

	change_pos(1600);
}

function change_pos(delay) {
	if (sort_data()) {
		rect_obj.g.transition()
			.delay(delay)
			.duration(500)
			.attr('transform', function(d) {
				return t(d.x, d.y);
			})
	}
};

// remove all things inside the rectangle
function clean_rect() {
	rect_obj.svg.selectAll('.num_employees')
		.transition()
		.duration(500)
		.style('opacity', 0);

	
	rect_obj.svg.selectAll('rect.gender_divider')
		.transition()
		.duration(500)
		.attr('width', 0);

	for (var i = 0; i < 5; ++i) {
		var height = 0;
		if (i == 4) {
			height = rect_obj.rect_width;
		};
		rect_obj.g.selectAll('rect.gender_race_divider.c' + i)
			.transition()
			.duration(300)
			.attr('height', height)
			.transition()
			.duration(300)
			.attr('width', 0.);
	};
};

var rect_obj = {};

d3.csv('dataset_update.csv', function(csv_data) {
	// configurations (in px)
	var svg_width = 960;
	var svg_height = 800;
	var rect_width = 100;
	var left_pad = 20;
	var top_pad = 20;
	var horizontal_int = 20;
	var vectical_int = 50;
	var rect_border_width = 3;
	var rect_border_color = 'white';
	var company_name_color = 'white';
	var num_employees_color = 'white';
	var rect_highlight_color = 'white';
	var races = ['Minorities', 'Black_or_African_American', 'Hispanic_or_Latino', 'Asian', 'White'];
	var genders = ['Female', 'Male'];
	var races_to_id = {
        'Minorities': 0,
        'Black_or_African_American': 1,
        'Hispanic_or_Latino': 2,
        'Asian': 3,
        'White': 4
    };

	// cook data
	data = [];
	company_list = [];
	csv_data.forEach(function(d) {
		if (!company_list.includes(d.Company)) {
			company_list.push(d.Company);
			
			// compute rectangle position
			idx = data.length;
			row_idx = parseInt(idx / 8);
			col_idx = idx - 8*row_idx;
			x_pos = left_pad + col_idx * (rect_width + horizontal_int);
			y_pos = top_pad + row_idx * (rect_width + vectical_int);
			
			data.push({
				company: 		d.Company,
				num_employees: 	0,
				x:				x_pos,
				y:				y_pos,
				Male:			0,
				Female:			0,
				Male_list:		[0,0,0,0,0],
				Female_list:	[0,0,0,0,0],
				highlight:		idx,
				idx:			idx,
				pos:			idx
			});
		}

		last = data[data.length - 1];
		last.num_employees += parseInt(d.Count);
		last[d.Gender] += parseFloat(d.Percentage);
		last[d.Gender + '_list'][races_to_id[d.Race.trim()]] += parseFloat(d.Percentage);
	});

	// company rectangles svg
	var svg = d3.select('#svgHolder')
		.append('svg')
		.attr('class', 'company_rect_svg')
		.attr('width', svg_width)
		.attr('height', svg_height);

	// company rectangle box
	var g = svg.selectAll('g')
		.data(data)
		.enter()
		.append('g')
		.attr('class', function(d) {
			return 'company_rect_box ' + d.company;
		})
		.attr('transform', function(d) {
			return t(d.x, d.y);
		});
	
	// company rectangle
	g.append('rect')
		.attr('class', function(d) {
			return 'company_rect ' + d.company;
		})
		.attr('width', rect_width)
		.attr('height', rect_width)
		.style('stroke', rect_border_color)
		.style('fill', 'none')
		.style('stroke-width', rect_border_width);
	
	// company name
	g.append('text')
		.attr('class', function(d) {
			return 'company_text ' + d.company;
		})
		.attr('fill', company_name_color)
		.attr('x', rect_width / 2)
		.attr('y', rect_width)
		.style('text-anchor', 'middle')
		.attr('dy', '1em')
		.text(function(d) {
			return d.company;
		});

	rect_obj = {
		svg:					svg,
		g:						g,
		num_employees_color:	num_employees_color,
		rect_width:				rect_width,
		rect_border_color:		rect_border_color,
		rect_border_width:		rect_border_width,
		rect_highlight_color:	rect_highlight_color,
		races_to_id:			races_to_id,
		rect_highlight_color:	rect_highlight_color,
		races:					races,
		genders:				genders,
		left_pad:				left_pad,
		top_pad:				top_pad,
		horizontal_int:			horizontal_int,
		vectical_int:			vectical_int
	};

});

function hightlight_change() {
	races = rect_obj.races;

	var g1_idx = document.getElementById('selection1').selectedIndex;
	var r_idx = document.getElementById('selection2').selectedIndex;
	var g2_idx = document.getElementById('selection3').selectedIndex;

	var gender_1 = rect_obj.genders[g1_idx];
	var gender_2 = rect_obj.genders[g2_idx];
	var race = rect_obj.races[r_idx];

	clean_rect();
	if (thisState == 10) {
		draw_gender_divider(gender_1);
		document.getElementById("selection3").options.selectedIndex = g1_idx;
	} else if (thisState == 11) {
		draw_gender_race_divider(gender_2, race);
		document.getElementById("selection1").options.selectedIndex = g2_idx;
	};
};

function sort_data() {
	var checked = d3.select('.checkbox').property('checked');

	// set highlight (value used to sort)
	if (thisState == 10 && checked) {
		var g1_idx = document.getElementById('selection1').selectedIndex;
		var gender_1 = rect_obj.genders[g1_idx];

		rect_obj.g.style('fill', function(d) {
			d.highlight = d[gender_1];
		});
	} else if (thisState == 11 && checked) {
		var r_idx = document.getElementById('selection2').selectedIndex;
		var g2_idx = document.getElementById('selection3').selectedIndex;
		var race = rect_obj.races[r_idx];
		var gender_2 = rect_obj.genders[g2_idx];
		var start_idx = rect_obj.races_to_id[race];

		rect_obj.g.style('fill', function(d) {
			d.highlight = d[gender_2 + '_list'][start_idx];
		});
	} else {
		rect_obj.g.style('fill', function(d) {
			d.highlight = d.idx;
		});
	};

	var data = rect_obj.g.data();
	var already_sorted = true;
	data.sort(function(x, y){
		return d3.ascending(x.pos, y.pos);
	});
	for (var i = 0; i < data.length-1; ++i) {
		if (data[i+1].highlight < data[i].highlight) {
			already_sorted = false;
			break;
		}
	}

	if (already_sorted) {
		return false;
	}

	data.sort(function(x, y){
		return d3.ascending(x.highlight, y.highlight);
	});
	
	for (var i = 0; i < data.length; ++i) {
		row_idx = parseInt(i / 8);
		col_idx = i - 8*row_idx;
		x_pos = rect_obj.left_pad + col_idx * (rect_obj.rect_width + rect_obj.horizontal_int);
		y_pos = rect_obj.top_pad + row_idx * (rect_obj.rect_width + rect_obj.vectical_int);
		data[i].x = x_pos;
		data[i].y = y_pos;
		data[i].pos = i;
	}

	return true;
};
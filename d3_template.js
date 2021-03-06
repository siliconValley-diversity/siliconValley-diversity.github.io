document.addEventListener("wheel", scrollChange, {passive:true});

var jobTitleArray = ["Supportive workers", "Professionals", "Managers", "Executives"]; //list of jobs titles that are option
var raceArray = ["White", "Asian", "Hispanic_or_Latino", "Black_or_African_American", "Minorities"]; //list of possible races
var genderArray = ["Male", "Female"];// list of possible genders

var dotCount = []; //a count of every combination of people
var dotArray = [];
//an array of arrays [job type, ethnicity, gender, count]

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

//state controlling vars
var lastState = -1;
var thisState = 0;
var loaded = 0;
var drawn = -1;

//drawing dots stuff
var dotCols = 45;
var dotRadius;
var defaultColor = d3.rgb(255,255,255);
var defDotStroke = d3.rgb(75,194,195);

var ethnicityColor = {"Hispanic_or_Latino": d3.rgb(255,82,21), "White": d3.rgb(252,200,112), "Black_or_African_American":d3.rgb(147,14,25), "Asian": d3.rgb(249,148,70), "Minorities": d3.rgb(78,46,55)};

//creating the different SVGs vars that are used in the top half
var dots = d3.select('svg#theDOTS');

//svg dimension stuff
var tempBox = document.getElementById('theDOTS').getBoundingClientRect();
var dotsHeight = tempBox.height - 70;
var dotsWidth = tempBox.width;

dotRadius = Math.trunc(dotsHeight/70);

//the datum values that will hold all the d3 pulled data
var companyDetailed;

//mega-function for loading all the d3 stuff
d3.csv('./dataset_split.csv', function(error, datum){
    if(error) {
        console.error('Error loading companyDetailed.csv dataset.');
        console.error(error);
        return;
    }

	//the datum values that will hold all the d3 pulled data
	companyDetailed = datum;

	//scary array I'm praying works
	jobTitleArray.forEach(d =>{
		raceArray.forEach(d2 =>{
			var tempSum = 0;
			genderArray.forEach(d5 =>{
				companyDetailed.forEach(d4 =>{
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

	preLoad();
	loaded = 1;
	scrollChange();
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
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
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
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
}


//execs fly up
function state3(){
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
	document.getElementById("svgText").innerHTML = "Are minority groups represented in the leadership of these tech companies?";
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
	document.getElementById("box_text_1").className = "active";
	document.getElementById("box_text_2").className = "inactive";
	document.getElementById("box_text_3").className = "inactive";
	document.getElementById("checkbox").className = "inactive";
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
		.style('stroke', d3.rgb(255,255,255))
		.style('stroke-width', 0.5)
		.duration(500);

		graphic9();
}

//locks to the box view
function state9(){
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
	document.getElementById("svgText").innerHTML = "Hello, this is part 12 of the dataset";
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
	var top_pad = 40;
	var horizontal_int = 20;
	var vectical_int = 50;
	var rect_border_width = 2;
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

	//define inset-shadow style
	var def = svg.append('defs');
	var filter = def.append('filter')
		.attr('id', 'inset_shadow')
		.attr('x', '-50%')
		.attr('y', '-50%')
		.attr('width', '200%')
		.attr('height', '200%');

	filter.append('feGaussianBlur')
		.attr('in', 'SourceGraphic')
		.attr('stdDeviation', 5);

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

	// company rectangle glow
	g.append('rect')
		.attr('class', function(d) {
			return 'company_rect ' + d.company;
		})
		.attr('width', rect_width)
		.attr('height', rect_width)
		.attr('filter', 'url(#inset_shadow)')
		.style('stroke', '#919CF8')
		.style('fill', 'none')
		.style('stroke-width', 8);

	//company rectangle
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
		.attr('dy', '1.5em')
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
			d.highlight = -d[gender_1];
		});
	} else if (thisState == 11 && checked) {
		var r_idx = document.getElementById('selection2').selectedIndex;
		var g2_idx = document.getElementById('selection3').selectedIndex;
		var race = rect_obj.races[r_idx];
		var gender_2 = rect_obj.genders[g2_idx];
		var start_idx = rect_obj.races_to_id[race];

		rect_obj.g.style('fill', function(d) {
			d.highlight = -d[gender_2 + '_list'][start_idx];
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

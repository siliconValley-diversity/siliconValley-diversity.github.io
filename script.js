/**
*
*
*
*	NOTES:
*		[1] Slider could be improved. No displayed limits. Values are hidden. Etc.
*		[2] This chart's API is restricted and makes assumptions. E.g., legend entries provided to 'rose' and 'legend' are the same.
*
*
*
*	@author Kristofer Gryte. http://www.kgryte.com
*
*
*/

var NGChart = {};

NGChart.rose = function(tooltip) {

	var margin = {'top': 0, 'right': 0, 'bottom': 10, 'left': 0},
		height = 500,
		width = 500,
		color = 'rgb(0,0,0)',
		area = function(d) { return [d.y]; },
		angle = function(d) { return d.x; },
		radiusScale = d3.scaleLinear(),
		angleScale = d3.scaleLinear().range( [0*Math.PI, 2*Math.PI ] ),
		domain = [0, 1],
		legend = [''],
		label = function(d) { return d.label; },
		delay = 1000,
		duration = 100,
		canvas, graph, centerX, centerY, numWedges, wedgeGroups, wedges, legendGroup;


	var races = ['Other minorities', 'African-American', 'Hispanic-Latino', 'Asian', 'White'];
	var races_color = ['Minorities', 'Black_or_African_American', 'Hispanic_or_Latino', 'Asian', 'White'];
	// var races = ['White', 'Asian', 'Hispanic-Latino', 'African-American', 'Other minorities'];
	// var races_color = ['White', 'Asian', 'Hispanic_or_Latino', 'Black_or_African_American', 'Minorities'];

	// Arc Generator:
	var arc = d3.arc()
		.innerRadius( 0 )
		.outerRadius( function(d,i) { return radiusScale( d.radius ); } )
		.startAngle( function(d,i) {
            return angleScale( d.start_angle ); }
		);

	function show_tooltip(d) {
		tooltip.transition()
			.duration(200)
			.style('opacity', .9);
		
		console.log(d3.event.pageX, d3.event.pageY - window.pageYOffset)
		tooltip
			.style("left", (d3.event.pageX) - 150 + 'px')
			.style("top",  (d3.event.pageY - window.pageYOffset - 150) + 'px');

		console.log(d);
		percents = [];
		percents[0] = d.info.vals[0];
		percents[1] = d.info.vals[1] - d.info.vals[0];
		percents[2] = d.info.vals[2] - d.info.vals[1];
		percents[3] = d.info.vals[3] - d.info.vals[2];
		percents[4] = d.info.vals[4] - d.info.vals[3];
		max_percent = d3.max(percents);
		tooltip.append('div')
			.attr('class', 'tooltip_title')
			.style('padding-top', '10px')
			.append('text')
			.text(d.info.job + " " + d.info.vals[4].toFixed(2) + "%");

		console.log(percents);
		g = tooltip.append('svg')
			.style('margin', 0)
			.selectAll('g')
			.data(percents)
			.enter();

		g.append('rect')
			.attr('class', function(d, i) { return races_color[i]; })
			.attr('x', function(d, i) {return 20+120 - 120 / max_percent * percents[i];} )
			.attr('y', function(d, i) {return 12 + i*20;})
			.attr("width", function(d,i) { return 120 / max_percent * percents[i];} )
			.attr("height", 15);

		g.append('text')
			.text(function(d, i) { return races[i] + " " + d.toFixed(2) + "%"; })
			.attr('x', function(d, i) {return 20 + 5 + 120;} )
			.attr('y', function(d, i) {return 12 + 10 + i*20;})
			.style("text-anchor", "start")
			.style('font-size', '10px')
			.attr('width', 200);
	};

	function hide_tooltip(d) {
		tooltip.transition()
			.duration(200)
			.style('opacity', 0.);
		tooltip.html('');
	};

	function chart( selection ) {

		selection.each( function( data ) {

			// Determine the number of wedges:
            numWedges = data.length;

			// Standardize the data:
			data = formatData( data );

			// Update the chart parameters:
			updateParams();

			// Create the chart base:
			createBase( this );

			// Create the wedges:
			createWedges( data );

		});

	}; // end FUNCTION chart()

	//
	function formatData( data ) {
		// Convert data to standard representation; needed for non-deterministic accessors:
		data = data.map( function(d, i) {
			return {
				'start_angle': start_angle.call(data, d, i),
				'end_angle': end_angle.call(data, d, i),
				'angle': angle.call(data, d, i),
				'area': area.call(data, d, i),
				'label': label.call(data, d, i),
				'info': info.call(data, d, i)
			};
		});

		// Now convert the area values to radii:
		// http://understandinguncertainty.org/node/214
		return data.map( function(d, i) {
			return {
				'start_angle': d.start_angle,
				'end_angle': d.end_angle,
				'angle': d.angle,
				'label': d.label,
				'radius': d.area.map( function(area) {
					return 10 * Math.sqrt( area / d.angle );
				}),
				'info': d.info
			}
		})
	}; // end FUNCTION formatData()

	//
	function updateParams() {
		// Update the arc generator:
		arc.endAngle( function(d,i) { return angleScale( d.end_angle ); } );

		// Determine the chart center:
		centerX = (width - margin.left - margin.right) / 2;
		centerY = (height - margin.top - margin.bottom) / 2;

		// Update the radius scale:
		radiusScale.domain( domain )
			.range( [0, d3.min( [centerX, centerY] ) ] );

		// Update the angle scale:
		angleScale.domain( [0, 100.] );
	}; // end FUNCTION updateParams()

	//
	function createBase( selection ) {

		// Create the SVG element:
		canvas = d3.select( selection ).append('svg:svg')
			.attr('width', width)
			.attr('height', height)
			.attr('class', 'canvas');

		// Create the graph element:
		graph = canvas.append('svg:g')
			.attr('class', 'graph')
			.attr('transform', 'translate(' + (centerX + margin.left) + ',' + (centerY + margin.top) + ')');

	}; // end FUNCTION createBase()


	function createWedges( data ) {

		// Create the wedge groups:
		wedgeGroups = graph.selectAll('.wedgeGroup')
			.data( data )
		  .enter().append('svg:g')
		  	.attr('class', 'wedgeGroup')
		  	.attr('transform', 'scale(0,0)');

		// Create the wedges:
		wedges = wedgeGroups.selectAll('.wedge')
		  	.data( function(d) {
		  		var ids = d3.range(0, legend.length);

		  		ids.sort( function(a,b) {
			  		var val2 = d.radius[b],
			  			val1 = d.radius[a]
			  		return  val2 - val1;
			  	});
			  	return ids.map( function(i) {
			  		return {
              'start_angle': d.start_angle,
              'end_angle': d.end_angle,
			  			'legend': legend[i],
			  			'radius': d.radius[i],
			  			'angle': d.angle,
						'info': d.info
			  		};
			  	});
		  	})
		  .enter().append('svg:path')
		  	.attr('class', function(d) { return 'wedge ' + d.legend; })
		  	.attr('d', arc );

		// // Append title tooltips:
		wedges.on('mouseover', show_tooltip)
			.on('mouseout', hide_tooltip);


		// Transition the wedges to view:
		wedgeGroups.transition()
			.delay( delay )
			.duration( function(d,i) {
				return duration*i;
			})
			.attr('transform', 'scale(1,1)');

        // Append labels to the wedgeGroups:
		var numLabels = d3.selectAll('.label-path')._groups[0].length;

		wedgeGroups.selectAll('.label-path')
			.data( function(d,i) {
				return [
					{
						'index': i,
						'angle': d.angle,
						'radius': d3.max( d.radius.concat( [23] ) )
					}
				];
			} )
		  .enter().append('svg:path')
		  	.attr('class', 'label-path')
		  	.attr('id', function(d) {
		  		return 'label-path' + (d.index + numLabels);
		  	})
			.attr('d', arc)
		  	.attr('fill', 'none')
		  	.attr('stroke', 'none');

		wedgeGroups.selectAll('.label')
			.data( function(d,i) {
				return [
					{
						'index': i,
						'label': d.label
					}
				];
			} )
		  .enter().append('svg:text')
	   		.attr('class', 'label')
	   		.attr('text-anchor', 'start')
	   		.attr('x', 5)
	   		.attr('dy', '-.71em')
	   		.attr('text-align', 'center')
	  		.append('textPath')
	  			.attr('xlink:href', function(d,i) {
	  				return '#label-path' + (d.index + numLabels);
	  			})
	  			.text( function(d) { return d.label; } );

	}; // end FUNCTION createWedges()

	// Set/Get: margin
	chart.margin = function( _ ) {
		if (!arguments.length) return margin;
		margin = _;
		return chart;
	};

	// Set/Get: width
	chart.width = function( _ ) {
		if (!arguments.length) return width;
		width = _;
		return chart;
	};

	// Set/Get: height
	chart.height = function( _ ) {
		if (!arguments.length) return height;
		height = _;
		return chart;
	};

	// Set/Get: area
	chart.area = function( _ ) {
		if (!arguments.length) return area;
		area = _;
		return chart;
	};

	// Set/Get: angle
	chart.start_angle = function( _ ) {
		if (!arguments.length) return start_angle;
        start_angle = _;
		return chart;
    };

	// Set/Get: info
	chart.info = function( _ ) {
		if (!arguments.length) return info;
        info = _;
		return chart;
	};

	// Set/Get: end_angle
	chart.end_angle = function( _ ) {
		if (!arguments.length) return end_angle;
		end_angle = _;
		return chart;
    };

	// Set/Get: angle
	chart.angle = function( _ ) {
		if (!arguments.length) return angle;
		angle = _;
		return chart;
	};

	// Set/Get: label
	chart.label = function( _ ) {
		if (!arguments.length) return label;
		label = _;
		return chart;
	};

	// Set/Get: domain
	chart.domain = function( _ ) {
		if (!arguments.length) return domain;
		domain = _;
		return chart;
	};

	// Set/Get: legend
	chart.legend = function( _ ) {
		if (!arguments.length) return legend;
		legend = _;
		return chart;
	};

	// Set/Get: delay
	chart.delay = function( _ ) {
		if (!arguments.length) return delay;
		delay = _;
		return chart;
	};

	// Set/Get: duration
	chart.duration = function( _ ) {
		if (!arguments.length) return duration;
		duration = _;
		return chart;
	};

	return chart;

}; // end FUNCTION rose()





NGChart.legend = function( entries ) {
	// NOTE: positioning handled by CSS.

	// Add a legend:
	var legend = {},
		height,
		symbolRadius = 5;

	legend.container = d3.select('body').append('div')
		.attr('class', 'legend');

	height = parseInt( d3.select('.legend').style('height'), 10);
	legend.canvas = legend.container.append('svg:svg')
			.attr('class', 'legend-canvas');

	legend.entries = legend.canvas.selectAll('.legend-entry')
		.data( entries )
	  .enter().append('svg:g')
	  	.attr('class', 'legend-entry')
	  	.attr('transform', function(d,i) { return 'translate('+ (symbolRadius + i*120) +', ' + (height/2) + ')'; });

	// Append circles to each entry with appropriate class:
	legend.entries.append('svg:circle')
		.attr('class', function(d) { return 'legend-symbol ' + d;} )
		.attr('r', symbolRadius )
		.attr('cy', 0 )
		.attr('cx', 0 );

	// Append text to each entry:
	legend.entries.append('svg:text')
		.attr('class', 'legend-text' )
		.attr('text-anchor', 'start')
		.attr('dy', '.35em')
		.attr('transform', 'translate(' + (symbolRadius*2) + ',0)')
		.text( function(d) { return d; } );

	// Add interactivity:
	legend.entries.on('mouseover.focus', mouseover)
		.on('mouseout.focus', mouseout);

	//
	function mouseover() {

		// Select the current element and get the symbol child class:
		var _class = d3.select( this ).select('.legend-symbol')
			.attr('class')
			.replace('legend-symbol ', ''); // left with legend class.

		d3.selectAll('.wedge')
			.filter( function(d,i) {
				// Select those elements not belonging to the same symbol class:
				return !d3.select( this ).classed( _class );
			})
			.transition()
				.duration( 1000 )
				.attr('opacity', 0.05 );

	}; // end FUNCTION mouseover()

	function mouseout() {

		d3.selectAll('.wedge')
			.transition()
				.duration( 500 )
				.attr('opacity', 1 );

	}; // end FUNCTION mouseout()

}; // end FUNCTION legend()


NGChart.slider = function( minVal, maxVal, step ) {

	d3.select('body').append('input')
		.attr('class', 'slider')
		.attr('type', 'range')
		.attr('name', 'slider')
		.attr('min', minVal)
		.attr('max', maxVal)
		.attr('step', 0.001)
		.attr('value', maxVal);

	d3.select("input").on("change", function() {
	  var value = Math.round(this.value);

	  d3.selectAll('.wedgeGroup')
	  	.filter( function(d,i) { return i < value; } )
	  	.transition()
	  		.duration( 500 )
	  		.attr( 'transform', 'scale(1,1)');

	  d3.selectAll('.wedgeGroup')
	  	.filter( function(d,i) { return i >= value; } )
	  	.transition()
	  		.duration( 500 )
	  		.attr( 'transform', 'scale(0,0)' );

	});


}; // end FUNCTION slider()

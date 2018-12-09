d3.csv('dataset_update.csv', function(csv_data) {

    // draw bar chart
    var bchart = d3.select('#gender_barchart')
        .append('svg');

    data = prepare_bar_data(csv_data);
    console.log(data);

    var containerWidth = +d3.select('#gender_barchart').style('width').slice(0, -2);
    var containerHeight = +d3.select('#gender_barchart').style('height').slice(0, -2);

    var hor_padding = 80;

    draw_bar_chart({
        bchart      : bchart,
        width       : containerWidth,
        height      : 500,
        pad_left    : hor_padding,
        pad_top     : 0,
        bar_width   : containerWidth - 2*hor_padding,
        bar_height  : 10,
        bar_dist    : 10,
        data        : data
    });

    // draw nightingale rose chart
    var rosechart = d3.select('.com_rosechart')
        .append('div');

    data = prepare_rosechart_data(csv_data);
    console.log(data);

    draw_rosechart({
        rosechart : rosechart,
        width   : 120,
        height  : 120,
        scale   : 20,
        data    : data
    });
});

//initialize company data
function init_comp(company) {
    item = {};
    item.company = company;
    item.companyid = company.split(' ').join('').split('.').join('');
    item.male = 0.;
    item.female = 0.;
    return item;
};

//initialize compnay data by job categories
function init_comp_job(id, company, job) {
    item = {};
    item.id = id;
    item.company = company;
    item.companyid = company.split(' ').join('').split('.').join('');
    item.job = job;
    item.vals = [0., 0., 0., 0., 0.];
    item.start = 0.;
    item.end = 0.;

    return item;
};

function preprocess(data) {
    len = data.length;

    for (var i=0; i<len; ++i) {
        data[i].sum = 100. / 3;
    };

    data[0].end = data[0].sum;
    for (var i=1; i<len; ++i) {
        data[i].start = data[i-1].end;
        data[i].end = data[i].start + data[i].sum;
    };

    for (var i=0; i<len; ++i) {
        data[i].vals[1] += data[i].vals[0];
        data[i].vals[2] += data[i].vals[1];
        data[i].vals[3] += data[i].vals[2];
        data[i].vals[4] += data[i].vals[3];
    };
    return data;
};

function handle_mouse_over(d, i) {
    if (d.length > 1) {
        d = d[0];
    };

    d3.selectAll('.bchart.' + d.companyid)
        .style("fill", "#4a4a4a");

    d3.selectAll('text.rosechart.' + d.companyid)
        .style('fill', 'white');

    d3.selectAll('rect.rosechart.' + d.companyid)
        .style('fill', '#4a4a4a');
}

function handle_mouse_out(d, i) {
    if (d.length > 1) {
        d = d[0];
    };

    d3.selectAll('.bchart.' + d.companyid)
        .style("fill", "lightgrey");

    d3.selectAll('text.rosechart.' + d.companyid)
        .style('fill', 'black')

    d3.selectAll('rect.rosechart.' + d.companyid)
        .style('fill', 'white');
}

function prepare_bar_data(csv_data) {
    comps = [];
    data = []
    csv_data.forEach(function(d) {
        if (!comps.includes(d.Company)) {
            comps.push(d.Company);
            data.push(init_comp(d.Company));
        }

        item = data[data.length-1];
        if (d.Gender == 'Male') {
            item.male += parseFloat(d.Percentage);
        } else {
            item.female += parseFloat(d.Percentage);
        }
    });
    data.sort(function(a, b){return a.male - b.male});

    return data;
}

function draw_bar_chart({bchart, width, height, pad_left, pad_top, bar_width, bar_height, bar_dist, data}) {

    top_label_margin = 30;
    right_label_margin = 10;

    bchart.attr('width', width - pad_left)
        .attr('height', height)
        .attr('transform', "translate(" + pad_left + ", " + pad_top + ")");

    var bchart_label = bchart.append('g')
        .attr('class', 'bchart_label')
        .attr('transform', "translate(0," + top_label_margin/2 + ")");

    //label "male"
    bchart_label.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .style("text-anchor", "start")
        .style("text-anchor", "alignment-hanging")
        .text('Male')

    //label "50%"
    bchart_label.append('text')
        .attr('x', bar_width/2)
        .attr('y', 0)
        .style("text-anchor", "middle")
        .text('50%')

    //label "female"
    bchart_label.append('text')
        .attr('x', bar_width)
        .attr('y', 0)
        .style("text-anchor", "end")
        .text('Female')

    bars = bchart.selectAll('.bar')
        .data(data)
        .enter()
        .append('g')
        .attr('class', ".bar")
        .attr('transform', "translate(0," + top_label_margin + ")");

    //draw male bar
    bars.append('rect')
        .attr('class', "bar_male")
        .attr('x', 0)
        .attr('y', function(d, i) {return i*(bar_dist+bar_height);})
        .attr("width", bar_width)
        .attr("height", bar_height)
        .on("mouseover", handle_mouse_over)
        .on("mouseout", handle_mouse_out);

    //draw female bar
    bars.append('rect')
        .attr('class', "bar_female")
        .attr('x', function(d, i) {return d.male * bar_width/100.;})
        .attr('y', function(d, i) {return i*(bar_dist+bar_height);})
        .attr("width", function(d, i) {return bar_width - d.male* bar_width/100.;})
        .attr("height", bar_height)
        .on("mouseover", handle_mouse_over)
        .on("mouseout", handle_mouse_out);

    //draw 50 percentile breaker
    bars.append('rect')
        .attr('class', "50_percentile")
        .style("fill", "white")
        .attr('x', bar_width/2 - 1)
        .attr('y', function(d, i) {return i*(bar_dist+bar_height);})
        .attr("width", 2)
        .attr("height", bar_height)
        .on("mouseover", handle_mouse_over)
        .on("mouseout", handle_mouse_out);

    //bar company label
    bars.append('text')
        .attr('class', function(d, i) {return 'bchart '+d.companyid})
        .style("fill", "lightgrey")
        .attr('x', bar_width + right_label_margin)
        .attr('y', function(d, i) {return bar_height + i*(bar_dist+bar_height);})
        .style("text-anchor", "start")
        .text(function(d, i) {return d.company})
        .on("mouseover", handle_mouse_over)
        .on("mouseout", handle_mouse_out);
}

function prepare_rosechart_data(csv_data) {
    comp_jobs = [];
    data = [];
    races_to_id = {
        'Minorities': 0,
        'Black_or_African_American': 1,
        'Hispanic_or_Latino': 2,
        'Asian': 3,
        'White': 4
    };

    csv_data.forEach(function(d) {
        id = d.Company + d.job_category;
        if (!comp_jobs.includes(id)) {
            comp_jobs.push(id);
            data.push(init_comp_job(id, d.Company, d.job_category));
        };

        item = data[data.length-1];
        d.Race = d.Race.trim();
        item.vals[races_to_id[d.Race]] += parseFloat(d.Percentage);
        item.sum = item.vals[0] + item.vals[1] + item.vals[2] + item.vals[3] + item.vals[4]
        item.label = item.job;
    });

    return data;
}

function draw_rosechart({rosechart, width, height, scale, data}) {

    mask_width = 76;
    mask_height = 20;

    races = ['Minorities', 'Black_or_African_American', 'Hispanic_or_Latino', 'Asian', 'White'];

    var tooltip = rosechart.append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    var rose = NGChart.rose(tooltip);

    rose.legend( races )
        .width( width )
        .height( height )
        .delay( 0 )
        .duration( 500 )
        .domain( [0, scale] )
        .start_angle( function(d) { return d.start; } )
        .end_angle( function(d) { return d.end; } )
        .angle( function(d) { return d.sum; })
        .area( function(d, i) { return d.vals; } )
        .info( function(d,i) { return d; } );

    for (var i = 0; i < 24; ++i) {
        data_i = preprocess(data.slice(i*3, i*3+3));

        figure = rosechart
            .append( 'figure' );

        figure.datum( data_i )
            .attr('class', 'rosechart ' + data_i[0].company)
            .call( rose );

        figure
            .on("mouseover", handle_mouse_over)
            .on("mouseout", handle_mouse_out);

        //draw company name bg box
        figure.selectAll("svg")
            .append('rect')
            .attr('class', 'com_name_box rosechart ' + data_i[0].company)
            .style('fill', 'white')
            .attr('x', width/2- mask_width/2)
            .attr('y', height-mask_height)
            .attr('rx', mask_height/2)
            .attr('ry', mask_height/2)
            .attr('height', mask_height)
            .attr('width', mask_width);

        figure.selectAll("svg")
            .append("text")
            .attr('class', 'com_name rosechart ' + data_i[0].company)
            .attr('x', width/2)
            .attr('y', height-5)
            .style("text-anchor", "middle")
            .text(data_i[0].company);

    };
}

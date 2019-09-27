//SVG wrapper dimensions are determined by the current width and height of browser window


var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var height = svgHeight - margin.top - margin.bottom;

var width = svgWidth - margin.left - margin.right;




///setting up x
//we want poverty value on x axis which we grab from data.csv
//also the map function maps from the value of the data to value of display
var x_Value = function(d) {
        return d.poverty;
    },
    x_Scale = d3.scale.linear().range([0, width]), // this has to be changed to var xLinearScale = d3.scaleLinear().range([0, width]); for v5
    x_Map = function(d) {
        return x_Scale(x_Value(d));
    },
    x_Axis = d3.svg.axis().scale(x_Scale).orient("bottom"); /// this has to be changed to var x_Axis = d3.axisBottom(xLinearScale); for v5


///setting up y
//we want healthcare value on y axis which we grab from data.csv

var y_Value = function(d) {
        return d.healthcare;
    },

    //creating scale functions
    y_Scale = d3.scale.linear().range([height, 0]), //this has to be changed to var yLinearScale = d3.scale.Linear().range([height, 0]); for v5
    y_Map = function(d) {
        return y_Scale(y_Value(d));
    },
    //creating axis functions
    y_Axis = d3.svg.axis().scale(y_Scale).orient("left"); /// this has to be changed to var yAxis = d3.axisLeft(yLinearScale);for v5


//colors for bubble
var c_Value = function(d) {
        return d.state;
    },

    //color = d3.scale.GnBu;
    color = d3.scale.category20c(); // this has to be changed to color = d3.scaleOrdinal(d3.schemeCategory10); in v5
//here we take "state column from data.csv to highlight colors in the scatter plot


////add an svg that holds our scatter chart
var svg = d3.select(".chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Append a div to the body to create tooltips, assign it a class

var tooltip = d3.select(".chart").append("div").attr("class", "tooltip").style("opacity", 0);



//read csv data 

d3.csv("data.csv", function(error, data) {


    data.forEach(function(d) {
        d.poverty = +d.poverty; //changing the format to number from string
        d.healthcare = +d.healthcare; //changing the format to number form string
        //    console.log(d);
    });
    //scale the domain    
    x_Scale.domain([d3.min(data, x_Value) - 1, d3.max(data, x_Value) + 1]);
    y_Scale.domain([d3.min(data, y_Value) - 1, d3.max(data, y_Value) + 1]);

    /*   change it to this in v5 

 // Scale the domain
var xMin = xScale.domain([d3.min(data, xValue) - 1]);
var xMax = xScale.domain([d3.max(data, xValue) + 1]);
var yMin = yScale.domain([d3.min(data, yValue) - 1]);
var yMax = yScale.domain([d3.min(data, yValue) + 1]);

xScale.domain([xMin, xMax]);
yScale.domain([yMin, yMax])

*/

    // structure of x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(x_Axis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("In Poverty(%)");



    // structure of y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(y_Axis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Lacks Healthcare(%)");


    // getting the circles on plot
    svg.selectAll(".circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "circle")
        .attr("r", 7.5)
        .attr("cx", x_Map)
        .attr("cy", y_Map)
        .style("fill", function(d) {
            return color(c_Value(d));
        })
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(400)

            .style("opacity", 1.0);

            tooltip.html(d["abbr"] + "<br/> (" + x_Value(d) +
                    ", " + y_Value(d) + ")")
                .style("left", (d3.event.pageX + 8) + "px")
                .style("top", (d3.event.pageY - 23) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(700)
                .style("opacity", 0);
        });



});
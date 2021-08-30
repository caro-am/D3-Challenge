// @TODO: YOUR CODE HERE!
let svgWidth = 960;
let svgHeight = 550;

let margin = {
	top:20,
	right:40,
	bottom: 60,
	left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// The SVG wrapper
let svg = d3
    .select("#scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight )
	
let chartGroup = svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top})`);


//Importing data
d3.csv("assets/data/data.csv").then(function(censusData) {
	censusData.forEach(function(data) {
		data.healthcare = +data.healthcare;
		data.poverty = +data.poverty;
		//console.log(data)
		
	});

// Scale fxns 	
const xLinearScale = d3.scaleLinear()
		.domain(d3.extent(censusData, d => d.poverty))
		.range([0, width])
		.nice();

const yLinearScale = d3.scaleLinear()
		.domain([0, d3.max(censusData, d => d.healthcare)])
		.range([height, 0])
		.nice();


const bottomAxis = d3.axisBottom(xLinearScale);
const	 leftAxis = d3.axisLeft(yLinearScale);

	chartGroup.append("g")
		.attr("transform", `translate(0, ${height})`)
		.call(bottomAxis);

	chartGroup.append("g")
		.call(leftAxis);

	
// Make scatter plot
	let circlesGroup = chartGroup.selectAll("circle")
		.data(censusData)
		.enter()
		.append("circle")
		.attr("cx" , d => xLinearScale(d.poverty))
		.attr("cy", d => yLinearScale(d.healthcare))
		.attr("r", "15")
		.attr("fill" , "lightblue")
		.classed("stateCircle", true)
		.attr("opacity" , "0.75")
		
		    
 // State Abbreviations in circle
 let circleText = chartGroup.append("g")
 	.selectAll('text')
 	.data(censusData)
 	.enter()
 	.append("text")
 	.text(d => d.abbr)
 	.attr("x" , d => xLinearScale(d.poverty))
	.attr("y", d => yLinearScale(d.healthcare))
	.classed(".stateText" , true)
	.attr("font-family", "sans-serif")
	.attr("fill" , "white")
	.attr("font-size", "10px")
	.classed("stateText", true)
	.attr("alignment-baseline" , "central")
	.attr("font-weight" , "bold");
	
    				
// Axes labels
	chartGroup.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left +40)
		.attr("x", 0 - (height /2))
		.attr("dy", "1em")
		.attr("class", "axisText")
		.style("font-weight" , "bold")
		.attr("text-anchor", "middle")
		.text("Lacks Healthcare (%)");

	chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .style("font-weight" , "bold")
      .attr("text-anchor", "middle")
      .text("In Poverty (%)");

  d3.select("article")


  }).catch(function(error) {
    console.log(error);
  });
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//   console.log(data);

//   console.log(data.samples[0].otu_labels);

// // // Console log formatted OTU_ids array
// // console.log(yValues);

// });



function makeBar(dropdown_id){
  d3.json(url).then(function(data) {

    //Create an array of sample 'ids'
    let dat = data.names;

    //Create variable to hold the correct index for the ID equal to the dropdownID chosen by the user 
    let correctIndex = 0;

    //For loop to compare every id in 'dat' array until correct id selected is found and save the index
    for (let i = 0; i < dat.length; i ++){
        if (dat[i] === dropdown_id){
          //console.log(dat[i]);
          correctIndex = i;
          break;
        }
    }

     //Create 'rawOTU' variable set equal to first 10 '0TU_ids' sorted
  let rawOTU = data.samples[correctIndex].otu_ids.sort((firstNum, secondNum) => secondNum - firstNum).slice(0,10);

  // Create an array holding the first 10 OTU ids formatted as follows: 'OTU 2737'
  let yValues = rawOTU.map((i) => {
     return `OTU ${i}`
 });


    // Create bar chart plot based on index selected
    let barData = [{
      x: data.samples[correctIndex].sample_values.slice(0,10).reverse(),
      y: yValues.reverse(),
      type: "bar",
      orientation: 'h',
      text: data.samples[0].otu_labels.slice(0,10)
    }];
  
    let layout = {
      title: "Sample's Top 10 OTUs"
    };
  
    Plotly.newPlot("bar", barData, layout);
  });
};

function makeBubble(dropdown_id){
  d3.json(url).then(function(data) {
    //Create an array of sample 'ids'
    let dat = data.names;

    //Create variable to hold the correct index for the ID equal to the dropdownID chosen by the user 
    let correctIndex = 0;

    //For loop to compare every id in 'dat' array until correct id selected is found and save the index
    for (let i = 0; i < dat.length; i ++){
        if (dat[i] === dropdown_id){
          //console.log(dat[i]);
          correctIndex = i;
          break;
        }
    }

    var bubbleData = {
      x: data.samples[correctIndex].otu_ids,
      y: data.samples[correctIndex].sample_values,
      text: data.samples[correctIndex].otu_labels,
      mode: 'markers',
      marker: {
        size: data.samples[correctIndex].sample_values,
        color: data.samples[correctIndex].otu_ids
      }
    };
    
    var layout = {
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Sample Values"},
      showlegend: false,
      height: 600,
      width: 600
    };

    Plotly.newPlot("bubble", [bubbleData], layout);
  });
};

function makeMetaData(dropdown_id){
  d3.json(url).then(function(data) {
    //Create an array of sample 'ids'
    let dat = data.names;

    //Create variable to hold the correct index for the ID equal to the dropdownID chosen by the user 
    let correctIndex = 0;

    //For loop to compare every id in 'dat' array until correct id selected is found and save the index
    for (let i = 0; i < dat.length; i ++){
        if (dat[i] === dropdown_id){
          //console.log(dat[i]);
          correctIndex = i;
          break;
        }
    }
  
  // Set row variables by using d3 and selecting each row in matedata panel
  let row1 = d3.selectAll(".panel-row1");
  let row2 = d3.selectAll(".panel-row2");
  let row3 = d3.selectAll(".panel-row3");
  let row4 = d3.selectAll(".panel-row4");
  let row5 = d3.selectAll(".panel-row5");
  let row6 = d3.selectAll(".panel-row6");
  let row7 = d3.selectAll(".panel-row7");

  // Set row variable text by calling on each row variable and changing the text using .text() function
  row1.text(`id: ${data.names[correctIndex]}`);
  row2.text(`ethnicity: ${data.metadata[correctIndex].ethnicity}`);
  row3.text(`gender: ${data.metadata[correctIndex].gender}`);
  row4.text(`age: ${data.metadata[correctIndex].age}`);
  row5.text(`location: ${data.metadata[correctIndex].location}`);
  row6.text(`bbtype: ${data.metadata[correctIndex].bbtype}`);
  row7.text(`wfreq: ${data.metadata[correctIndex].wfreq}`);
  });
};

// Display the default bar chart
function init() {
  d3.json(url).then(function(data) {
  // Set dropdown variable
  let dropdownId = d3.selectAll("#selDataset");
  for (let i = 0; i < data.samples.length; i ++){
    dropdownId.append("option").text(data.names[i]).property(data.names[i]);
  }

// Create a variable 'first' to hold the id value for the intial plot
  let first = data.names[0];

// Plot the bar chart for the first ID (initial plot)
  makeBar(first)

// Plot the bubble chart for the first ID (initial plot)
  makeBubble(first)
});
}


// Call function to update the chart
function optionChanged(value){
  makeBar(value);
  makeBubble(value);
  makeMetaData(value);
};

// Call init function
init();

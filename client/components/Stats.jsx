import React, { Component } from "react";
import * as d3 from "d3";
import Table from 'react-bootstrap/Table';

class Stats extends Component {
  componentDidMount() {
    // fetch(`/getGraphData/${chosentopic}/College`)
    // .then(res => res.json)
    // .catch(err => console.log(err))

    // fetch(`/getGraphData/${chosentopic}/HighSchool`)
    // .then(res => res.json)
    // .catch(err => console.log(err))

    // fetch(`/getGraphData/${chosentopic}/$PHD`)
    // .then(res => res.json)
    // .catch(err => console.log(err))




    this.drawChart();

  }
  drawChart() {

    //give the graph an array of data with each element as an object with date: new date and nps: score
    var lineData = [];
    
    
    
    lineData.push({date:new Date('December 18, 1995 03:24:00'), nps:89});
    lineData.push({date:new Date('December 19, 1995 03:24:00'), nps:96});
    lineData.push({date:new Date('December 20, 1995 03:24:00'), nps:87});
    lineData.push({date:new Date('December 21, 1995 03:24:00'), nps:99});
    lineData.push({date:new Date('December 22, 1995 03:24:00'), nps:83});
    lineData.push({date:new Date('December 23, 1995 03:24:00'), nps:93});
    lineData.push({date:new Date('December 24, 1995 03:24:00'), nps:79});
    lineData.push({date:new Date('December 25, 1995 03:24:00'), nps:94});
    lineData.push({date:new Date('December 26, 1995 03:24:00'), nps:89});
    lineData.push({date:new Date('December 27, 1995 03:24:00'), nps:93});
    lineData.push({date:new Date('December 28, 1995 03:24:00'), nps:81});
    
    
    lineData.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });
    
    
    
    var height  = 400;
    var width   = 700;
    var hEach   = 40;
    
    var margin = {top: 120, right: 15, bottom: 125, left: 25};
    
    width =     width - margin.left - margin.right;
    height =    height - margin.top - margin.bottom;
    
    var svg = d3.select('#graph').append("svg")
      .attr("width",  width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("fill", "none")
      .attr("stroke", "#000");
    
    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    x.domain(d3.extent(lineData, function(d) { return d.date; }));
    
    
    var y = d3.scaleLinear().range([height, 0]);
    
    
    y.domain([d3.min(lineData, function(d) { return d.nps; }) - 5, 100]);
    
    var valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.nps);  })
            .curve(d3.curveMonotoneX);
    
    svg.append("path")
        .data([lineData]) 
        .attr("class", "line")  
        .attr("d", valueline); 
       
    
    
     var xAxis_woy = d3.axisBottom(x).tickFormat(d3.timeFormat("Week %V")).tickValues(lineData.map(d=>d.date));
    
    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis_woy);
    
    //  Add the Y Axis
    //  svg.append("g").call(d3.axisLeft(y));
    
    svg.selectAll(".dot")
        .data(lineData)
        .enter()
        .append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d) { return x(d.date) })
        .attr("cy", function(d) { return y(d.nps) })
        .attr("r", 5);  
    
    
    svg.selectAll(".text")
        .data(lineData)
        .enter()
        .append("text") // Uses the enter().append() method
        .attr("class", "label") // Assign a class for styling
        .attr("x", function(d, i) { return x(d.date) })
        .attr("y", function(d) { return y(d.nps) })
        .attr("dy", "-5")
        .text(function(d) {return d.nps; });
    
    svg.append('text')                                     
          .attr('x', 10)              
          .attr('y', -30)             
          .text('Score Over Time for This Topic'); 
    // const data = [12, 5, 6, 20, 50, 10];
    var models = [{
      "model_name":"Middle School",
      "field1":19,
      "field2":83,
      "field3":50, 
    },
    {
      "model_name":"High School",
      "field1":67,
      "field2":93,
      "field3": 20,
    },
    {
      "model_name":"College",
      "field1":40,
      "field2":56,
      "field3":100,
    },
    {
      "model_name":"You",
      "field1":60,
      "field2":80,
      "field3":10,
    }];
    var container = d3.select('#graph'),
      width = 720,
      height = 420,
      margin = {top: 130, right: 120, bottom: 130, left: 150},
      barPadding = .2,
      axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
    var svg2 = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
    var xScale1 = d3.scaleBand();
    var yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0]);
    var xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize);
    var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize);
    xScale0.domain(models.map(d => d.model_name));
    xScale1.domain(['field1', 'field2', 'field3']).range([0, xScale0.bandwidth()]);
    yScale.domain([0, d3.max(models, d => {
      if (d.field1 > d.field2) {
        return d.field1 > d.field3 ? d.field1 : d.field3
      }
      else {
        return d.field2 > d.field3 ? d.field2 : d.field3
      }
    })]);
    var model_name = svg2.selectAll(".model_name")
      .data(models)
      .enter().append("g")
      .attr("class", "model_name")
      .attr("transform", d => `translate(${xScale0(d.model_name)},0)`);
    model_name.selectAll(".bar.field1")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field1")
      .style("fill","blue")
      .attr("x", d => xScale1('field1'))
      .attr("y", d => yScale(d.field1))
      .attr("width", xScale1.bandwidth())
      .attr("height", d => height - margin.top - margin.bottom - yScale(d.field1));
    model_name.selectAll(".bar.field2")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field2")
      .style("fill","red")
      .attr("x", d => xScale1('field2'))
      .attr("y", d => yScale(d.field2))
      .attr("width", xScale1.bandwidth())
      .attr("height", d =>  height - margin.top - margin.bottom - yScale(d.field2));
    model_name.selectAll(".bar.field3")
      .data(d => [d])
      .enter()
      .append("rect")
      .attr("class", "bar field3")
      .style("fill","green")
      .attr("x", d => xScale1('field3'))
      .attr("y", d => yScale(d.field3))
      .attr("width", xScale1.bandwidth())
      .attr("height", d => height - margin.top - margin.bottom - yScale(d.field3));
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(xAxis);
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    svg2.append("circle").attr("cx", -10).attr("cy", -70).attr("r", 6).style("fill", "blue");
    svg2.append("circle").attr("cx", -10).attr("cy", -50).attr("r", 6).style("fill", "red");
    svg2.append("circle").attr("cx", -10).attr("cy", -30).attr("r", 6).style("fill", "green");
    svg2.append("text").attr("x", 0).attr("y", -70).text("Gametype: Film").style("font-size", "15px").style("fill", "blue").attr("alignment-baseline","middle");
    svg2.append("text").attr("x", 0).attr("y", -50).text("Gametype: Music").style("font-size", "15px").style("fill", "red").attr("alignment-baseline","middle");
    svg2.append("text").attr("x", 0).attr("y", -30).text("Gametype: Politics").style("font-size", "15px").style("fill", "green").attr("alignment-baseline","middle");    
  }

  render() {
    const questionsPosed = this.props.stats.gamesPlayed * 10;
    const questionsRight = this.props.stats.correctAnswers;
    const PercentageRightForThisGame = this.props.correctResponses.length * 10;
    const percentageRight = questionsPosed ? Math.floor((questionsRight / questionsPosed) * 100) : 0;
    let gameMode = this.props.gameMode;
    let graph = <div id='graph'></div>;
    let scoreBoard = <p>Your All-Time Score: {percentageRight}%<br/>Your Score For This Game: {PercentageRightForThisGame}%</p>;
    console.log(`questionsPosed: ${questionsPosed}, questionsRight: ${questionsRight}, percentageRight: ${percentageRight}, PercentageRightForThisGame: ${PercentageRightForThisGame}`);
    
    // TODO: pull leaderBoard data from MongoDB
    const leaderBoard = [];
    for (let i = 1; i <= 10; i += 1) {
      let eachLeader = (
        <tr>
          <td>{i}</td>
          <td>Cat</td>
          <td>{i * 10}</td>
        </tr>
      );
      leaderBoard.push(eachLeader);
    }

    return (
      <div>
        <div className='scoreboard'>
          {scoreBoard}
          {graph}
        </div>
        <div className='leaderboard'>
          <Table striped bordered hover className='center'>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Username     </th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderBoard}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Stats;
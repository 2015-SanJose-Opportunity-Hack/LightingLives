/**
 * Created by zchen8 on 10/4/15.
 */
//Constants for the SVG
var width = 600,
    height = 600;

//Set up the colour scale
var color = d3.scale.category20();

//Set up the force layout
var force = d3.layout.force()
    .charge(-360)
    .gravity(.05)
    .linkDistance(90)
    .size([width, height]);

//Append a SVG to the body of the html page. Assign this SVG as an object to svg
var svg = d3.select(".svg_graph").append("svg")
    .attr("width", width)
    .attr("height", height);

//Read the data from the mis element

d3.json('/data/anotherdata.json', function(err, graph){
//Creates the graph data structure out of the json data
    force.nodes(graph.nodes)
        .links(graph.links)
        .start();

//Create all the line svgs but without locations yet
    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function (d) {
            return Math.sqrt(d.value);
        });


    var node = svg.selectAll("g.node")
        .data(graph.nodes)
        .enter().append("svg:g")
        .attr("class", "node")
        .call(force.drag);

    node.append("svg:image")
        .attr("xlink:href", function(d){return d.image;
        })
        .attr("x", "-25px")
        .attr("y", "-25px")
        .attr("width", "50px")
        .attr("height", "50px")
        .on("mouseover", function(d){
            if(d.label!=='root'){
                $(".details img").attr("src", "/img/rounded_corners.png");
                $(".details h1").text("hello");
            }
        }).on("mouseout", function(d){
            if(d.label!=='root') {
                $(".details img").attr("src", "/img/tt.png");
                $(".details h1").text("");
            }
        });

    //node.append("svg:text")
    //    .attr("class", "nodetext")
    //    .attr("dx", 12)
    //    .attr("dy", ".35em")
    //    .text(function(d) { return d.name });

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });

});


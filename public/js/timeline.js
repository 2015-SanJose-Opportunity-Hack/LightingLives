/**
 * Created by zchen8 on 10/4/15.
 */
// DOM element where the Timeline will be attached


var container = document.getElementById('visualization');
d3.json("/timeline?name=kid4", function(error, data) {
    console.log(data);
    handleResponse(data.timeline);
});

function handleResponse(data){
    console.log('data', data);
    // Create a DataSet (allows two way data-binding)
    var items = new vis.DataSet();

    for(var i = 0; i < data.length; i++){
        items.add(
            {id: i, content: data[i].note, start: data[i].date}
        );
    }
    // Configuration for the Timeline
    var options = {};

    // Create a Timeline
    var timeline = new vis.Timeline(container, items, options);
    timeline.on('click', function(properties){

        if($('.hovergallery').find('.hoverimage')){
            $('.hoverimage').remove();
        }

        //alert('clicked items: ' + JSON.stringify(properties));
        console.log("properties :" , JSON.stringify(properties));
        console.log(JSON.stringify(data[properties.item]));
        console.log(data[properties.item].picture);

        var picture = data[properties.item].picture;
        var imageDetails = data[properties.item].imageDetails;
        for(var j=0; j<picture.length ; j++) {
            $('.hovergallery').append("<img class='hoverimage' src="+picture[j]+">");
        }
        //$('.hovergallery').css('background-color','#f8f8f8');
        //$('.w_module').css('max-width', "100%");
        //$('.w_module').css('max-height',"100%");

    });
}
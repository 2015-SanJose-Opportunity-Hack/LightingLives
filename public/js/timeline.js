/**
 * Created by zchen8 on 10/4/15.
 */
// DOM element where the Timeline will be attached
var container = document.getElementById('visualization');
d3.json("/data/flare.json", function(error, data) {
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
        if($('.activity').find('img')){
            $('.activity img').remove();
        }

        //alert('clicked items: ' + JSON.stringify(properties));
        console.log("properties :" , JSON.stringify(properties));
        console.log(JSON.stringify(data[properties.item]));
        console.log(data[properties.item].picture);
        $('.activity').append("<img id='theImg' src='data[properties.item].picture'/>");


    });
}
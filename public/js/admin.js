$(document).ready(function(){

    $("#submitKids").submit(function(e){

        e.preventDefault();

        var name = $("#name").val();
        console.log("name :", name);
        var region = $("#region").val();
        var note = $("#biography").val();
        var donor = $("#donor").val();

       var submitData = {
           "_id": name,
           "name": name,
           "region": region,
           "donors": [
               {
                   "donor": donor
               }
           ],
           "timeline": [
               {
                   "picture": "/image/"+ name + "png",
                   "date": "09-01-2015",
                   "note": "graduation"
               }
           ]
       };

        console.log(submitData);


        $.ajax({
            data: submitData,
            url: 'http://localhost:3000/insertKids',
            type: 'POST',
            dataType: 'json',
            //jsonpCallback: 'callback', // this is not relevant to the POST anymore
            success: function (data) {
                console.log('process sucess : ', data);
                $('#connectKids').modal('hide');
            }

        });
    });
});
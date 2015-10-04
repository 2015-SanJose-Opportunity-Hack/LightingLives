$(document).ready(function(){
    $("#submitKids").submit(function(e){
        //console.log( "submit :", $( this ).serializeArray() );
        e.preventDefault();
        console.log("rakesh");
        var name = $("#name").val();
        console.log("name :", name);
        var region = $("#region").val();
        var note = $("#biography").val();
        var donor = $("#donor").val();
        var picDate = $("#picDate").val();
        var picNote = $("#picNote").val();
        //var data = $( this ).serializeArray();

        $.ajax({
            data: {
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
                        "picture": "pic1",
                        "date": picDate,
                        "note": picNote
                    }
                ]
            },
            url: 'http://localhost:3000/insertKids',
            type: 'POST',
            dataType: 'json',
            //jsonpCallback: 'callback', // this is not relevant to the POST anymore
            success: function (data) {
                console.log('process sucess : ', data);
            }

        });
    });
});
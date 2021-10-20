function getSearchResult(searchText)
{
   var url="https://en.wikipedia.org/w/api.php";

  $.ajax({
             type:"GET",
             url:url,
             data:{action:"opensearch",format:"json",search:searchText},
             dataType:"jsonp",
             success: function (data)
                        {
                            var arr=data;
                            $(".top-result").empty();
                            $(".top-result").append("<tr>");
                              
                            for (i=1;i<arr.length;i++)
                                    {
                                        var list="<div>";
                                        arr[i].forEach(function(element)
                                             {
                                                if(isURL(element))
                                                    {
                                                       list+="<li><a target='_blank' href='"+element+"'>"+element+"</a></li>";
                                                    }
                                                else
                                                    {
                                                       list+="<li>"+element+"</li>";
                                                    }
                                         
                                              });
                                        list+="</div>";
                                        $(".top-result").append("<td>"+list+"</td>");
                                   }

                            $(".top-result").append("</tr>");
                        },
              error: function (error) 
                        {
                            alert(JSON.stringify(error));
                        }
                         
                          });

 }
 
function search()
{ 
  var searchText= $("#search-text").val();
  getSearchResult (searchText);
 }

 $( document ).ready(function() {
    $("#search-text").autocomplete(
     {
         source: function(request,response) {
             $.ajax({
                 type:"GET",
                 url: "http://en.wikipedia.org/w/api.php",
                 dataType: "jsonp",
                 data: {
                     'action': "opensearch",
                     'format': "json",
                     'search': request.term
                 },
                 success: function(data) {
                    response(data[1]);
                 }
             });
         },
         autoFocus:true,
         delay:300,
         minlength:3
     });
    });
function isURL(str)
 {
     var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(!regex .test(str))
       {
          return false;
       } 
      else
       {
        return true;
       }
}
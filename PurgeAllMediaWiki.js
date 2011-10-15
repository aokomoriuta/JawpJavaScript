$j.getJSON("http://ja.wikipedia.org/w/api.php?action=query&list=allpages&apnamespace=8&aplimit=500&format=json", function(result)
{
	for(var i = 0; i < result.query.allpages.length; i+= 20)
	{
		var titles = "";
		
		for(var j = 0; (j < 20)&&result.query.allpages[i + j]; j++)
		{
			titles += result.query.allpages[i + j].title + "|";
		}

		console.log("" + i + "@" + titles);

		$j.getJSON("http://ja.wikipedia.org/w/api.php?format=json&action=purge&titles=" + titles, function(result2)
		{
			console.log(result2);
		});
	}

});
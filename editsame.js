importScriptURI( 'http://prototype.wikimedia.org/mwe-gadget/mwEmbed/mwEmbed.js?uselang=' + wgUserLanguage );

mw.ready(function()
{
	mw.getJSON({
		action: "query",
		list: "allpages",
		apnamespace: 8,
		aplimit: 500
	}, function(pagelist)
	{
		for(var j in pagelist.query.allpages)
		{
			var title = pagelist.query.allpages[j].title;
			
			mw.getJSON({
				action: "query",
				prop: "revisions",
				titles: title,
				rvprop: "content"
			},function(revision)
			{
				for(var i in revision.query.pages)
				{
					var text = revision.query.pages[i].revisions[0]["*"];
					
					var title2 = revision.query.pages[i].title;

					mw.getToken(title2, function(token)
					{
						mw.log(title2 + "(" + token + ") -> " + text);

						mw.getJSON({
							action: "edit",
							title: title2,
							text: text,
							token: token
						},function(editresult)
						{
							mw.log(editresult.edit.title + " : " + editresult.edit.result);
							mw.log(editresult);
						});
					});
				}
			});
		}
	});
});
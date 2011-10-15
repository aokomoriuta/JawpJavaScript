JsBot = function(){};
JsBot.RC = function(){};

JsBot.RC.Get = function()
{
	var newRC = [];
	var rcstart = 0;
	
	if(!JsBot.RC.RecentRevID)
	{
		JsBot.RC.RecentRevID = 0;
	}
	if(!JsBot.RC.Callback)
	{
		JsBot.RC.Callback = function(){};
	}
	
	var isRecent = false;
	
	var Get10RC = function(callback10)
	{
		mw.getJSON({
			action: "query",
			list: "recentchanges",
			rcnamespace: 102,
			rctype: "edit|new",
			rcprop: "user|title|ids",
			rcstart: rcstart,
			rclimit: 10
		},function(result)
		{	
			if(result.query.recentchanges[0].revid == JsBot.RC.RecentRevID)
			{
				isRecent = true;
			}
			else
			{
				JsBot.RC.RecentRevID = result.query.recentchanges[0].revid
				
				$j.each(result.query.recentchanges, function()
				{
					if(this.revid == JsBot.RC.RecentRevID)
					{
						isRecent = true;
					}
					newRC.push(this);
				});

				rcstart = result["query-continue"].recentchanges.RCstart;
			}

			callback10();
		});
	};

	Get10RC(function()
	{
		if(!isRecent)
		{
			get10RC();
		}
		else
		{
			JsBot.RC.Callback(newRC);
		}
	});
};

JsBot.Revert = function(){};
JsBot.Revert.Do = function(title)
{
	mw.getJSON({
		action: "query",
		prop: "revisions",
		titles: title,
		rvtoken: "rollback"
	},function(result)
	{
		var token = "";
		var user = "";

		$j.each(result.query.pages, function()
		{
			token = this.revisions[0].rollbacktoken;
			user = this.revisions[0].user;
		});

		mw.log(token);
		mw.log(user);

		
		mw.getJSON({
			action: "rollback",
			title: title,
			user: user,
			token: token,
			markbot: ""
		},function(result)
		{
			console.warn(result.rollback.summary);
		});
	});
};

mw.ready(function()
{
	$bodyContent = $j("#bodyContent");
	$bodyContent.empty();

	var warking = false;

	
	var $startButton = $j(document.createElement("button"))
		.attr({type: "submit", disabled: "disabled"})
		.text("実行");

	var $stopButton = $j(document.createElement("button"))
		.attr({type: "submit", disabled: "disabled"})
		.text("停止");

	$j.get("http://ja.wikipedia.org/wiki/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88:%E3%82%A6%E3%82%A3%E3%82%AD%E6%8A%80%E8%A1%93%E9%83%A8/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E9%96%8B%E7%99%BA/%E3%82%B3%E3%83%9F%E3%83%83%E3%82%BF%E3%83%BC?action=render",
		function(result)
	{

		var comitters = [];

		var lis = $j(result).children("li")

		for(var i = 0; i < lis.length; i++)
		{
			comitters.push(lis[i].textContent);
		}

		$bodyContent.append(result);
		$startButton.removeAttr("disabled");
		
		$startButton.click(function()
		{
			console.info("開始");
			warking = true;
			
			$startButton.attr("disabled", "disabled");
			$stopButton.removeAttr("disabled");
			
			JsBot.RC.Callback = function(result)
			{
				var i = 0;
				$j.each(result, function()
				{

					console.info(" " + i++ + this.title);

					if(this.title.match("ウィキ技術部/スクリプト開発/"))
					{
						var isComitter = false;
						var user = this.user;
						console.log(user);

						$j.each(comitters, function()
						{
							if(user == this)
							{
								isComitter = true;
							}
						});

						if(!isComitter)
						{
							console.warn(user);
							JsBot.Revert.Do(this.title);
						}
					}
				});

				if(warking)
				{
					window.setTimeout(JsBot.RC.Get, 1000);
				}
			};

			JsBot.RC.Get();

		});
		
		$stopButton.click(function()
		{

			console.info("停止");

			warking = false;
			
			$stopButton.attr("disabled", "disabled");
			$startButton.removeAttr("disabled");
		});

		$bodyContent.append($startButton).append($stopButton);
	});
});
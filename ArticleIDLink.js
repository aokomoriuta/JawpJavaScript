addOnloadHook(function(){mw.ready(function()
{
	// メッセージ追加
	mw.addMessages({
		"articleidlink-link": "記事IDでのリンク"
	});
	
	// ツールボックス内リストを取得
	var $tblist = $j("#p-tb>.body>ul");
	
	// リストが取得できていれば
	if($tblist)
	{
		// 記事IDでのリンクを追加
		$tblist.append($j(document.createElement("li")).attr({id: "t-artcileidlink"})
			.append($j(document.createElement("a"))
				.attr({
					title: mw.getMsg("articleidlink-link"),
					href: "/wiki/?curid=" + wgArticleId
				})
				.text(mw.getMsg("articleidlink-link")))
		);
	}
});});
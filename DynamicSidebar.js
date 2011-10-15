// <source lang="javascript">
/************************************************************************/
// ja> = 動的生成サイドバー =
//   > 各利用者それぞれのサイドバーを、動的に生成するスクリプトです。
//   > ;作者: 青子守歌
//   > ;URL: http://ja.wikipedia.org/wiki/User:aokomoriuta
//   > 
//   > == 使い方 ==
//   > [[特別:利用者ページ/Sidebar]]に、[[MediaWiki:Sidebar]]の形式で
//   > 生成したいサイドバーを入力してください。
//   >
//   > == ライセンス ==
//   > このスクリプトは、複数ライセンスで利用可能です。
//   > 選択可能なライセンスは次の通り：
//   > * クリエイティブ・コモンズ 表示-継承 3.0 非移植
//   > * クリエイティブ・コモンズ 表示-非営利 3.0 非移植
//   > * GNU一般公衆利用許諾書 バージョン3.0以降
/************************************************************************/
// en> = Dynamic Generated Sidebar =
//   > This script allows users can add their own custom sidebars.
//   > ;author: 青子守歌
//   > ;URL: http://ja.wikipedia.org/wiki/User:aokomoriuta
//   > 
//   > == Usage ==
//   > Create sidebar configuration page on [[Special:Mypage/Sidebar]],
//   > with the same format as [[MediaWiki:Sidebar]]. 
//   >
//   > == License ==
//   > This script is multi-licensed.
//   > You can select the license of your choice from as following:
//   > * Creative Commons Attribution-ShareAlike 3.0 Unported
//   > * Creative Commons Attribution-Noncommercial 3.0 Unported
//   > * GNU General Public License v3.0 or later
/************************************************************************/

addOnloadHook(function(){jQuery(document).ready(function($)
{
	// サイドバーからコメントや改行を除去
	$("#mw-panel").contents().not("[nodeType=1]").remove();

	// サイドバーの最初と最後にコメントを追加
	$("#mw-panel").prepend(document.createComment("DynamicSidebar.js"));
	$("#mw-panel").append(document.createComment("/DynamicSidebar.js"));


	// 規定のサイドバーを読み込み
	var defaultSidebar = $.get(wgServer + wgScript + '?title=MediaWiki:Sidebar&action=render', null, function()
	{
		// すべてのグループについて
		$(defaultSidebar.responseText).children().each(function()
		{
			// そのグループを削除
			$("#p-" + $(this).contents()[0].textContent).remove();
		});
	});


	// グループ数を初期化
	var groupCount = 0;

	// 新しいグループを追加するメソッドの設定
	var AppendNewGroup = function($groupInfo)
	{
		// グループ名の取得
		var groupName = $groupInfo.contents()[0].textContent.replace("\n", "");
	
		// ツールボックスを基にグループを生成
		$group = $("#p-tb").clone();

		// IDの作成
		var id = "p-" + encodeURI(groupName);

		// idの設定
		$group.attr("id", id);

		// グループのクラスを初期化
		$group.attr("class", "portal")


		// 開閉状態のクッキーの読み込み
		var state = $.cookie('vector-nav-'+id);

		// クッキーに応じて、開閉状態クラスを指定
		$group.addClass((groupCount++ == 0) ? "first persistent" : 
			((state=="true" || state==null) ? 'expanded' : 'collapsed'));
		
		// 開閉状態のクッキーを保存
		$.cookie("vector-nav-" + $(this).parent().attr("id"),
			$(this).parent().is(".collapsed"),
			{expires: 30, path: "/"});


		// ヘッダの設定
		$("h5", $group).text(groupName);

		// ヘッダのタブインデックスを解除
		$("h5", $group).removeAttr("tabIndex");


		// マウスクリック時に開閉
		$("h5", $group).mousedown(function()
		{
			// 開閉状態のクッキーを保存
			$.cookie("vector-nav-" + $(this).parent().attr("id"),
				$(this).parent().is(".collapsed"),
				{expires: 30, path: "/"});

			// 開閉を切り替え
			$(this).parent().toggleClass("expanded").toggleClass("collapsed")
			.find("div.body").slideToggle("fast");

			// blur実行
			$(this).blur();
		});


		// グループの中身を空にする
		$("ul", $group).empty();

		// すべてのアイテムについて
		$("li", $groupInfo).each(function()
		{
			// |区切りで取得
			var split =　$(this).text().split('|');
			
			// 項目を作成
			var $item = $(document.createElement("li"));
			var $a = $(document.createElement("a"));

			// リンクの設定
			$a.attr("href", $(this).children().is("a.external") ? split[0] : wgArticlePath.replace("$1", encodeURI(split[0])));

			// ラベルの設定
			$a.text(split[(split.length >= 2) ? 1 : 0]);

			// 項目を追加
			$("ul", $group).append($item);
			$item.append($a);
		});
	   
		// ツールボックスの前にグループの追加
		$("#p-tb").before($group);
	}

	// 利用者サイドバー設定を読み込み
	var userSidebar = $.get(wgServer + wgScript + '?action=render&title=User:' + encodeURI(wgUserName) + "/Sidebar", null, function()
	{
		// すべてのグループについて
		$(userSidebar.responseText).children().each(function()
		{
			// そのグループを追加
			AppendNewGroup($(this));
		});
	});
});});
// </source>

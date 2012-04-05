// <source lang="javascript">
//************************************************************************/
// ja> = Collapse Tab When Narrow =
//   > ウインドウ幅が小さい時にタブを折りたたむ
//   > ;作者: 青子守歌
//   > ;URL: http://ja.wikipedia.org/wiki/User:aokomoriuta
//   >
//   > == ライセンス ==
//   > このスクリプトは、複数ライセンスで利用可能です。
//   > 選択可能なライセンスは次の通り：
//   > * クリエイティブ・コモンズ 表示-継承 3.0 非移植
//   > * クリエイティブ・コモンズ 表示-非営利 3.0 非移植
//   > * GNU一般公衆利用許諾書 バージョン3.0以降
/************************************************************************/
// en> = Collapse Tab When Narrow =
//   > This script collapse sidebar when the window's width is narrow
//   > ;author: 青子守歌
//   > ;URL: http://ja.wikipedia.org/wiki/User:aokomoriuta
//   >
//   > == License ==
//   > This script is multi-licensed.
//   > You can select the license of your choice from as following:
//   > * Creative Commons Attribution-ShareAlike 3.0 Unported
//   > * Creative Commons Attribution-Noncommercial 3.0 Unported
//   > * GNU General Public License v3.0 or later
/************************************************************************/
jQuery(function($)
{
	// ウインドウ幅しきい値
	var threshold = 800;
	
	// 閲覧タブのテキストを取得
	var pViewsHead = $("#p-views > h5").text();
	
	// アイコン表示しているメニューのIDを取得
	var iconMenuID = [];
	$("#p-views > ul > li.icon").each(function()
	{
		iconMenuID.push(this.id);
	});
	
	// 幅が狭いかどうか
	var narrow = false;
	
	// ウインドウ幅が変化した時
	$(window).resize(function()
	{
		// ウインドウ幅を取得
		var width = $(window).width();
		
		// 前に幅が広い状態で、今のウインドウ幅がしきい値以下になったら
		if(!narrow && (width < threshold))
		{
			// 幅が狭いことにする
			narrow = true;
			
			// 見出しを設定
			$("#p-views > h5")
				.empty()
				.append($("<span />").append(pViewsHead))
				.append($("<a />")
					.attr("href", "#")
				);
			
			// 各メニューのアイコン表示をさせない
			$("#p-views > ul > li").removeClass("icon");
			
			// メニューを設定
			$("#p-views > ul").wrap($("<div />").addClass("menu"));
			
			// 表示切り替え
			$("#p-views").removeClass("vectorTabs").addClass("vectorMenu");
		}
		// それ以上で、前に幅が狭いとき
		else if(narrow && (width >= threshold))
		{
			// 幅は広いことにする
			narrow = false;
			
			// 見出しを設定
			$("#p-views > h5")
				.empty()
				.append(pViewsHead);
			
			// 各メニューについて
			$("#p-views > div > ul > li").each(function()
			{
				// アイコンで表示しているIDと
				for(var i in iconMenuID)
				{
					// idが一致していたら
					if(this.id == iconMenuID[i])
					{
						// アイコン表示を復帰
						$(this).addClass("icon");
					}
				}
			});
			
			// メニューを設定
			$("#p-views > div.menu").replaceWith($("#p-views > div > ul"));
			
			// 表示切り替え
			$("#p-views").removeClass("vectorMenu").addClass("vectorTabs");
		}
	});
})
// </source>
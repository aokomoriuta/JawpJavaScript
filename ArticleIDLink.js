/************************************************************************/
// ja> = 記事IDリンク =
//   > ツールボックス内に記事IDでの短縮URLリンクを生成する
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
// en> = Article ID Link =
//   > This script makes a shortened link using article ID in TOOLBOX
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
	// メッセージ追加
	mw.messages.set("articleidlink-link", "記事IDでのリンク");
	
	// 版への固定リンクを取得し、取得できていれば
	var $permalink = $("#t-permalink");
	if($permalink)
	{
		// 固定リンクの次に記事IDでのリンクを追加
		$permalink.after($("<li />")
			.attr("id", "t-artcileidlink")
			.append($("<a />")
				.attr({
					title: mw.msg("articleidlink-link"),
					href: "/wiki/?curid=" + mw.config.get("wgArticleId")
				})
				.text("記事IDでのリンク")
			)
		);
	}
});
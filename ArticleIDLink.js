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
	mw.messages.set({
		"articleidlink-label"  : "ページ番号でリンク",
		"articleidlink-tooltip": "ページ番号(curid)でのリンクを取得"
	});
	
	// 版固定リンクが存在していれば
	if($("#t-permalink").length > 0)
	{
		// 版固定リンクの前にリンクを追加
		mw.util.addPortletLink(
			"p-tb",
			"/wiki/?curid=" + mw.config.get("wgArticleId"),
			mw.msg("articleidlink-label"),
	  		"t-artcileidlink",
			mw.msg("articleidlink-tooltip"),
			null,
			"#t-permalink");
	}
});
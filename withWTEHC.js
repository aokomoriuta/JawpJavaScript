// <source lang="javascript">
/************************************************************************/
// ja> =ウィキ技術部開発版スクリプトの体験リンク=
//   > [[プロジェクト:ウィキ技術部]]で開発されているスクリプトを
//   > 簡単に体験するためのリンクを生成する機能。
//   > [[Help:WithJS withCSS]]の、動作する名前環境が異なるものとほぼ同じ
/************************************************************************/
addOnloadHook(function(){
	if(extraJS && extraJS.match("^" + wgFormattedNamespaces[102] + ":ウィキ技術部/.*\.js$"))
	{
		console.log("!");
		importScript(extraJS);
	}
	if(extraCSS && extraCSS.match("^" + wgFormattedNamespaces[102] + ":ウィキ技術部/.*\.css$"))
	{
		importStylesheett(extraCSS);
	}
});
// </source>
// <source lang="javascript">
//************************************************************************/
// ja> = Fork A Page =
//   > ウィキペディア内のページを別のページへ複製する
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
// en> = Fork A Page =
//   > This script copy a page to another page
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
	// 特別ページでなければ
	if(mw.config.get("wgNamespaceNumber") != -1)
	{
		// jQueryUIを使用
		mw.loader.load("jquery.ui.dialog");
		
		// メッセージを追加
		mw.messages.set({
			"forkapage-tab-label"  : "フォーク",
			"forkapage-tab-tooltip": "このスクリプトをフォークする",
			"forkapage-dialog-title"  : "スクリプトをフォーク",
			"forkapage-dialog-header": "フォーク先の設定",
			"forkapage-dialog-forkto" : "フォーク先のページ名：",
			"forkapage-dialog-reason" : "フォークする理由：",
			"forkapage-dialog-fork"   : "フォークする",
			"forkapage-dialog-error"   : "不明なエラーが発生しました。",
			"forkapage-override-header": "上書き確認",
			"forkapage-override-exists": "フォーク先ページ「$1」は存在します。",
			"forkapage-override-time"  : "最終更新日時",
			"forkapage-override-user"  : "最終更新利用者",
			"forkapage-override-ask"   : "上書きしますか？",
			"forkapage-override-yes"   : "はい",
			"forkapage-override-no"    : "いいえ",
			"forkapage-edit-header" : "編集中",
			"forkapage-edit-move"   : "編集が完了すると自動的にフォーク先「$1」を開きます。",
			"forkapage-edit-summary": "[[$1]]の$2版(oldid=$3)よりフォーク（[[利用者:青子守歌/trunk/ForkAPage.js|スクリプト]]による）。$4",
			"forkapage-edit-error"  : "編集中にエラーが発生しました！！\n（エラーコード：$1、エラーの詳細：$2）",
			"forkapage-edit-unknown": "編集中に不明なエラーが発生しました。"
		});
		
		// 複製タブを追加
		$(mw.util.addPortletLink("p-cactions", "#", mw.msg("forkapage-tab-label"), "ca-fork", mw.msg("forkapage-tab-tooltip"))
		).click(function(e)
		{
			// イベントキャンセル
		        e.preventDefault();
			
			// フォーク先ページ指定ダイアログを作成して表示
			$("<div />")
				.attr({
					"id": "forkapage-dialog",
					"title": mw.msg("forkapage-dialog-title")
				})
				.append($("<h2 />").text(mw.msg("forkapage-dialog-header")))
				.append($("<form />")
					.append($("<div />")
						.append($("<label />")
							.attr("for", "forkapage-forkto")
							.text(mw.msg("forkapage-dialog-forkto"))
						)
						.append($("<input />")
							.attr({
								"id": "forkapage-forkto",
								"type" : "text"
							})
							// フォーク先のページ名に今のページ名を入力済
							.val(mw.config.get("wgPageName"))
						)
					)
					.append($("<div />")
						.append($("<label />")
							.attr("for", "forkapage-reason")
							.text(mw.msg("forkapage-dialog-reason"))
						)
						.append($("<input />")
							.attr({
								"id": "forkapage-reason",
								"type" : "text"
							})
						)
					)
				)
				// ダイアログ表示
				.dialog({
					"minHeight": 50,
					"width": "auto",
					"modal": true,
					// ボタンが
					"buttons": [{
						"text": mw.msg("forkapage-dialog-fork"),
						// クリックされたら
						"click": function()
						{
							// ダイアログ本体を保存
							var $dialog = $(this);
							
							// フォーク先タイトルを取得
							var forkToTitle = $dialog.find("#forkapage-forkto").val();
							
							// ページを編集するメソッド
							var editPage = function()
							{
								// ダイアログのボタンを隠す
								$dialog.dialog({"buttons": []});
								
								// フォーク元の最新版を取得
								$.getJSON(mw.util.wikiScript("api"),{
									"format": "json",
									"action": "query",
									"titles": mw.config.get("wgPageName"),
									"prop": "revisions",
									"rvprop": "timestamp|content|ids"
									}, function(result)
									{
										for(var key in result.query.pages)
										{
											// フォーク元の最終版の中身を取得
											var lastRevision = result.query.pages[key].revisions[0];
											
											// ダイアログに編集中を追加
											$dialog.append($("<h2 />").text(mw.msg("forkapage-edit-header")))
												.append($("<p />").text(mw.msg("forkapage-edit-move", forkToTitle)));
											
											// フォーク先を編集
											$.ajax({
										        url: mw.util.wikiScript("api"),
										        data: {
										            format: 'json',
										            action: 'edit',
										            title: forkToTitle,
										            summary: mw.msg("forkapage-edit-summary",
														mw.config.get("wgPageName"),
														lastRevision.timestamp,
														lastRevision.revid,
														$dialog.find("#forkapage-reason").val()),
										            text: lastRevision["*"],
										            token: mw.user.tokens.get("editToken")
										        },
										        dataType: 'json',
										        type: 'POST',
										        success: function(result){
													// 編集に成功したら
										            if(result && result.edit &&result.edit.result == "Success" )
													{
														// フォーク先に移動
														location.href = mw.util.wikiGetlink(forkToTitle);
										            }
													// エラーが返ってきたら
													else if(result && result.error)
													{
														// エラー表示
														alert(mw.msg("forkapage-edit-error", result.error.code, result.error.info));
										            }
													// 結果が違ったら
													else
													{
														// 不明なエラー表示
														alert(mw.msg("forkapage-edit-unknown"));
										            }
													
													// ダイアログを閉じる
													$dialog.dialog("close");
										        }
										    });
										}
									}
								);
							};
							
							// フォーク先の最新版を取得
							$.getJSON(mw.util.wikiScript("api"),{
								"format": "json",
								"action": "query",
								"titles": forkToTitle,
								"prop": "revisions",
								"rvprop": "timestamp|user"
								}, function(result)
								{
									// ページが取得できていれば
									if(result && result.query && result.query.pages)
									{
										for(var key in result.query.pages)
										{
											// フォーク先が存在していれば
											if(key != -1)
											{
												// フォーク先の最終更新版を取得
												var lastRevision = result.query.pages[key].revisions[0];
												
												// ダイアログに上書き確認を追加
												$dialog.append($("<h2 />").text(mw.msg("forkapage-override-header")))
													.append($("<p />").text(mw.msg("forkapage-override-exists", forkToTitle)))
													.append($("<dl />")
														.append($("<dt />").text(mw.msg("forkapage-override-time")))
															.append($("<dd />").text(lastRevision.timestamp))
														.append($("<dt />").text(mw.msg("forkapage-override-user")))
															.append($("<dd />").text(lastRevision.user))
													.append($("<p />").text(mw.msg("forkapage-override-ask")))
													);
												
												// ボタンをはい/いいえに変更
												$dialog.dialog({"buttons": [{
													"text": mw.msg("forkapage-override-no"),
													// 上書き不可なら
													"click": function()
													{
														// ダイアログを閉じる
														$dialog.dialog("close");
													}},{
													"text": mw.msg("forkapage-override-yes"),
													// 上書き可なら
													"click": function()
													{
														// ページ編集
														editPage();
													}}
													]
												});
											}
											// 存在してなかったら
											else
											{
												// ページ編集
												editPage();
											}
										}
									}
									// 取得出来なかったら
									else
									{
										// エラー表示
										alert(mw.msg("forkapage-dialog-error"));
										
										// ダイアログを閉じる
										$dialog.dialog("close");
									}
								}
							);
						}
					}]
				});
		});
	}
});
// </source>

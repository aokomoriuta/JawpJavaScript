jQuery(function ($)
{
	// 特別ページ、履歴、差分表示でのみ作動
	if(mw.config.get("wgNamespaceNumber") == -1 || mw.config.get("wgAction") == "history" || mw.util.getParamValue("diff"))
	{
		$('span.mw-rollback-link').each(function()
		{
			// 通常の巻戻しリンクを取得
			$normalLink = $(this);
			
			// 既にbot扱いでなければ
			if($normalLink.children()[0].href.indexOf("bot=1") == -1)
			{
				// 通常の巻き戻しを元に、クラスを改変
				$botLink = $normalLink.clone()
					.removeClass("mw-rollback-link")
					.addClass("mw-rollback-link-bot plainlinks");
				
				// アンカーを取得してbot巻き戻しに修正
				$botLinkAnchor = $botLink.children().eq(0);
				$botLinkAnchor
					.attr({
						 href: $botLinkAnchor.attr("href") + "&bot=1",
						title: $botLinkAnchor.attr("title") + "(bot)"
					})
					.text($botLinkAnchor.text() + "(bot)");
				
				// 通常の巻き戻しリンクの直後にbot巻き戻しを追加
				$normalLink.after($botLink);
				
				// 履歴ページの場合は
				if(mw.config.get("wgAction") == "history")
				{
					// 通常巻き戻しリンクとbot巻き戻しの間に区切り記号を追加
					$normalLink.after("&#8203;｜&#8203;");
				}
			}
		});
	}
});
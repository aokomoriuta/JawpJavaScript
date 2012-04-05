jQuery(function($)
{
	var $ptLanguagesList = mw.util.$content.find("td.mw-pt-languages-list");
	
	if($ptLanguagesList.size() > 0)
	{
		$select = $('<select id="pt-langages-select"></select>');
		$progressImages = $('<span id="pt-languages-progressImages" />');
		progressImageList = {};
		$shownImage = $("<img />");
		
		$ptLanguagesList.children("a").each(function()
		{
			$language = $(this);
			title = $language.attr("title");
			
			$option = $("<option></option>")
				.attr("value", title)
				.append($language.text());
			
			$img = $language.children("img").hide();
			
			$progressImages.append($img);
			progressImageList[title] = $img;
			
			$select.append($option);
		});
		
		$ptLanguagesList.empty()
			.append($select)
			.append($progressImages)
			.css("vertical-align", "bottom");
		
		$select.change(function()
		{
			$shownImage.hide();
			$shownImage = progressImageList[$(this).val()];
			$shownImage.show();
		});
	}
});

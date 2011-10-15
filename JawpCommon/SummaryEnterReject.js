
// 無効化されてなければ
if (summaryEnterRejectDisable) 
{
	// エンターキーでの入力実行を無効化
	jQuery(document).ready(function()
	{
		// キーが押されたとき
		$j("#wpSummary").keypress(function(e)
		{
			// エンターキーなら
			if (e.keyCode == 13) 
			{
				// 全イベント無効化
				e.preventDefault();
			}
		});
		
		// 保存ボタンのスタイル設定
		$j("#wpSave").css("font-weight", "normal");
	});
}

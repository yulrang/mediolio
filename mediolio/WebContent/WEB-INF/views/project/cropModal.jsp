<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<link href="resources/css/jquery.Jcrop.css" rel="stylesheet" type="text/css" />
<link href="resources/css/crop.css" rel="stylesheet" type="text/css"/>
<script src="js/jquery-1.11.3.min.js"></script>
<script src="js/jquery.Jcrop.js"></script>
<script type="text/javascript">

	$(function($) {
		// Create variables (in this scope) to hold the API and image size
		var jcrop_api, boundx, boundy;

		// Grab some information about the preview pane
		$preview = $('#preview-pane'), 
		$pcnt = $('#preview-pane .preview-container'), 
		$pimg = $('#preview-pane .preview-container img'),

		xsize = $pcnt.width(), ysize = $pcnt.height();

		var imgWidth = $('#target').width();
		var imgHeight = $('#target').height();

		$('#target').Jcrop({
			boxWidth: 740, 
			boxHeight: 700,
			minSize:[180, 180],
			setSelect:[imgWidth/2-90, imgHeight/2-90, imgWidth/2+90, imgHeight/2+90],
			onChange : updatePreview,
			onSelect : updatePreview,
			aspectRatio : xsize / ysize
		}, function() {
			
			// 이미지 사이즈 구함
			var bounds = this.getBounds();
			boundx = bounds[0];
			boundy= bounds[1];
			jcrop_api = this;
			
			$('.modal-content').css({ width: boundx + 210 });
			$preview.appendTo(jcrop_api.ui.holder);
		});

		function updatePreview(c) {
			if (parseInt(c.w) > 0) {
				var rx = xsize / c.w;
				var ry = ysize / c.h;

				$('#preview_x').val(c.x);
				$('#preview_y').val(c.y);
				$('#preview_w').val(c.w);
				$('#preview_h').val(c.h);
				
				$pimg.css({
					width : Math.round(rx * boundx) + 'px',
					height : Math.round(ry * boundy) + 'px',
					marginLeft : '-' + Math.round(rx * c.x) + 'px',
					marginTop : '-' + Math.round(ry * c.y) + 'px'
				});
			}
		}
		
	});
	
	function uploadAjax() {
		$.ajax({
			url: "cropImage",
			type: "POST",
			data: new FormData(document.getElementById("coverImg_form")),
	        enctype: "multipart/form-data",
			processData: false,
			contentType: false,
			dataType : "json",
			async:false,
			success: function(result){
				if(result.result == "fail") alert("이미지 크롭에 실패하였습니다.");
				else{
					$('.card_img>a').empty().append('<img src="resources/images/projectCover/'+result.result+'" class="">');
				
					$('#p_coverImg').val(result.result);
				}
				$('#crop').remove();
			}
		});
	}
	
	function cancelCrop(){
		$('#crop').remove();
	}
</script>

<div id="crop" class="crop_modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="jc-demo-box">
  				<img src="${imgUrl }" id="target" alt="original image"/>
					<div id="preview-pane">
						<div class="preview-container">
							<img src="${imgUrl }" id="target-preview" class="jcrop-preview" alt="Preview" />
    					</div>
					</div>
					<div class="clearfix"></div>
			</div>
			<input type="button" value="Crop Image" id="crop_submit" onclick="uploadAjax()"/>
			<input type="button" value="Cancel" id="crop_cancel" onclick="cancelCrop()">
		</div>
	</div>
</div>


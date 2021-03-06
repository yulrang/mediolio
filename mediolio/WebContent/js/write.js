/*  게시물(과제/프로젝트) 작성 페이지 관련 javascript
 *  이유라 - UI 관련 javascript
 *  모하람 - 기능 관련 javascript
 * */


jQuery.ajaxSettings.traditional = true;

var order=0; // 콘텐츠(이미지 파일, 문서 파일, embed 태그, 텍스트) 들의 순서
var fileNum=0; // 업로드할 파일 수
var orderArr=[]; // 파일의 이름, embed 태그/텍스트의 내용을 콘텐츠의 순서에 따라 배열에 저장(게시물 상세 보기 페이지에서 입력한 순서대로 보여주기 위해)
var colorRange;
var colorNum=0;
var colorId=0;
var tmNum = 0;

$('document').ready(function(){
	$(".writeStp2").hide();
	
    $('#btn_writeEmbed').on('click',function(){
    	// 모하람 작성 - 임베드 태그 등록
        $('.modal_bg, .modal').hide();
        var embed = $("#modal_bd_writeEmbed textarea").val();
        console.log($(embed).css("width","100%"));
        
        // 이유라 작성 - 콘텐츠 이동/삭제 박스 보여주기
        $("#write_bd").append("<div class='contentBox' data-sort="+order+">"
    			+"<ul class='content_toolBoxes' id='content_toolBox'>"
    			+"<li id='text_up'><a href='#' onclick='moveUpElement(this); return false;'></a></li>"
    			+"<li id='text_down'><a href='#' onclick='moveDownElement(this); return false;'></a></li>"
    			+"<li id='text_delete'><a href='#' onclick='removeElement(this); return false;'></a></li>"
    			+"</ul>"
    			+embed+"</div>");
        
        // 모하람 작성
        orderArr[order] = embed;
        order = parseInt(order)+1;
        addContent();
    	$('body').removeClass('preventScroll');
    });
	
    // 이유라 작성
	/* 프로젝트 개요 작성칸 height 조절*/
	$('.writeLongLineWrap').on( 'keyup', 'textarea', function (e){
        $(this).css('height', 'auto' );
        $(this).height( this.scrollHeight );
    });
    $('.writeLongLineWrap').find( 'textarea' ).keyup();
    
    
    // 이유라 작성
    /* 팀원 추가 버튼 */
    $('#btn_addTeamMate').on('click', function(){
    	tmNum++;
        var newTeamInput = '<div class="write_teamMateWrap"><div class="threeCell shortCell"><input class="writeLine_text teamMateName" data-sort='+tmNum+' type="text" onkeyup="autoCompleteMember(this)" placeholder="이름"><div class="autoCompleteBox classBox autoMember"><ul class="autoCompleteArea autoMemberArea"></ul></div></div><div class="threeCell shortCell"><input class="writeLine_text" type="text" name="tmList['+tmNum+'].tm_role" placeholder="역할"></div><div class="threeCell"><input class="writeLine_text" type="text" name="tmList['+tmNum+'].tm_detail" placeholder="소개"></div></div>';
        
        $('#teamMateGroup').append(newTeamInput);
    })
    

    
	$("#submit_portfolio").click(function(){
		// 모하람 작성 - 게시물 등록
		
		// 유효성 검사
		if($("#selectedCategory").val() == 999){
			// 1. 카테고리 선택
			$.jAlert({
			    'title': '!!',
			    'content': '카테고리를 선택해주세요.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
			console.log(orderArr);
		} else if($("input[name=cate_id]").val() == 999){
			// 2. 서브카테고리 입력
			$.jAlert({
			    'title': '!!',
			    'content': '서브카테고리를 선택해주세요.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
		} else if($.trim($("#projectTitle").val()) == ""){
			// 3. 글 제목 입력
			$.jAlert({
			    'title': '!!',
			    'content': '제목을 입력해주세요.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
		} else if($("#write_bd .contentBox").size() == 0){
			// 4. 내용 입력
			// $("#write_tagTxt span").size()
			$.jAlert({
			    'title': '!!',
			    'content': '내용을 입력해주세요.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
		} else if($.trim($("input[name=p_prjname]").val()) == ""){
			// 5. 작업 이름 입력
			$.jAlert({
			    'title': '!!',
			    'content': '작업 이름을 입력해주세요.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
		} else if($("input[name=p_workfrom]").val() == ""){
			// 6. 작업 시작일 입력
			$.jAlert({
			    'title': '!!',
			    'content': '작업 시작일을 입력해주세요.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
		} else if($("input[name=p_workto]").val() == ""){
			// 7. 작업 종료일 입력
			$.jAlert({
			    'title': '!!',
			    'content': '작업 종료일을 입력해주세요.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
		} else if($("input[name=cl_id]").val() == ""){
			// 8. 관련 과목 선택
			$.jAlert({
			    'title': '!!',
			    'content': '관련 과목을 선택해주세요.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
		} else if($.trim($("textarea[name=p_summary]").val()) == ""){
			// 9. 작업 개요 입력
			$.jAlert({
			    'title': '!!',
			    'content': '작업 개요를 입력해주세요.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
		} else{
			// 파일 업로드
			// 서버로 보내야 할 파라미터 목록
			// 1. 파일(이미지, 문서)
			var firstFile = $("input[name=contents]")[0];
			if($(firstFile).val() != ""){
				for(var i=0; i<$("input[name=contents]").length; i++){
					console.log($("input[name=contents]")[i]);
				};
			}
			
			
			// 2. 임베드 태그, 텍스트: orderArr에 있음
			// 3. orderArr: 콘텐츠 순서 정보 저장
			$(".write_textarea").each(function(){
			    orderArr[$(this).attr("data-sort")] = $(this).html().split("<ul")[0];
			    console.log(orderArr[$(this).attr("data-sort")]);
			});
			console.log("콘텐츠 순서: "+orderArr);
			$("input[name=orderArr]").val(orderArr);
			console.log($("input[name=orderArr]").val());
			
			// 7. 커버 이미지 파일 이름
			$("#p_coverImgName").val($("#p_coverImg").val());
			
			// 8. 해쉬태그
			var hashtags = "";
			$("#write_tagTxt span").each(function(){
				hashtags += $(this).html()+"/";
			});
			$("#hashtags").val(hashtags);
			
			var arrStr = "";
			for(var i=0; i<orderArr.length; i++){
				arrStr += orderArr[i]+"@@@@@@@@@@@@@@@";
			}
			
			$("input[name=orderArrStr]").val(arrStr);
			
			$("#addProjectForm").submit();
		}
		
	});

    // 이유라 작성
    //팝업 쓰기버튼 호버- 말풍선 띄우기
    $('#btn_addWrite').hover(function(){
        $('#bubble_addWrite').show();
    },function(){
        $('#bubble_addWrite').mouseenter(function(){
            $('#bubble_addWrite').show();
        });
        $('#bubble_addWrite').mouseleave(function(){
            $('#bubble_addWrite').hide();
        });
        $('#bubble_addWrite').hide();
    });
    
    //텍스트 추가 버튼 누르고 난 후 이벤트
    $('#btn_addText').on('click',function(){
//    	addContent();
    	
    	// 이유라 작성 - 텍스트 편집(사이즈, 색깔, 스타일(이탤릭/볼드/언더라인)) 툴박스 보여주기
        $('#write_bd').append('<div class="write_textarea contentBox"  data-sort='+order+'>'
        		+'<div contenteditable="true" style="min-height:inherit; height:auto;"></div>'
//        		+'<div contenteditable="false">'
        		+'<ul class="text_toolBoxes" id="text_toolBox">'
        		+'<li id="text_size">'
        		+'<select id="select_fontSize" class="txtSize">'
        		+'<option value="10">10px</option>'+'<option value="11">11px</option>'+'<option value="12">12px</option>'+'<option value="14">14px</option>'+'<option value="16">16px</option>'+'<option value="18">18px</option>'+'<option value="20">20px</option>'+'<option value="22">22px</option>'
        		+'<option value="24">24px</option>'+'<option value="26">26px</option>'+'<option value="28">28px</option>'+'<option value="36">36px</option>'+'<option value="48">48px</option>'+'<option value="72">72px</option>'
        		+'</select></li>'
        		+'<li id="text_color"><a class="palette" href="#"></a></li>'
        		+'<li id="text_bold"><a href="#" onclick="txtBold(); return false;"></a></li>'
        		+'<li id="text_italic"><a href="#" onclick="txtItalic(); return false;"></a></li>'
        		+'<li id="text_under"><a href="#" onclick="txtUnderline(); return false;"></a></li></ul>'
        		+'<ul class="text_toolBoxes content_toolBoxes" id="content_toolBox">'
                +'<li id="text_up"><a href="#" onclick="moveUpElement(this); return false;"></a></li>'
                +'<li id="text_down"><a href="#" onclick="moveDownElement(this); return false;"></a></li>'
                +'<li id="text_delete"><a href="#" onclick="removeElement(this); return false;"></a></li></ul>'
//                +'</div>'
                +'</div>'
        );
        
        $(".write_textarea:last").trigger("focus");
        
        // 모하람 작성 - 텍스트의 사이즈 변경
        $(".txtSize").on("change",function(){
        	var range = window.getSelection().getRangeAt(0);
        	console.log(range);
        	console.log(range.toString());
    		var newNode = document.createElement("span");
    		newNode.style.fontSize = $(this).val()+"px";
    		newNode.appendChild(range.extractContents());
    		range.insertNode(newNode);
    		
    		console.log($(this).closest(".write_textarea"));
        	var value = $(this).closest(".write_textarea").html();
        	orderArr[$(this).closest(".write_textarea").attr("data-sort")] = value.split("<ul")[0];
        });
        
        $("ul").find('*').attr('contenteditable','false');
        
        
        addContent();
        
        // 모하람 작성 - 텍스트 색상 변경
    	$(".palette").ColorPicker({
    		color: "#000000",
    		onShow: function(colpkr){
    			$(colpkr).fadeIn(500);
    			colorRange = getColorRange();
    			colorNum = 0;
    			return false;
    		},
    		onHide: function(colpkr){
    			$(colpkr).fadeOut(500);
    			return false;
    		},
    		onChange: function (hsb, hex, rgb) {
    			colorNum++;
    			if(colorNum == 1){
	    			console.log(colorRange);
	        		var newNode = document.createElement("span");
	        		newNode.style.color = "#"+hex;
	        		colorId++;
	        		newNode.id = "color"+colorId;
	        		newNode.appendChild(colorRange.extractContents());
	        		colorRange.insertNode(newNode);
    			} else {
    				var spanId = "#color"+colorId;
    				$(spanId).css("color","#"+hex);
    			}
    			console.log($(this));
            	var value = $(this).closest(".write_textarea").html();
            	console.log(value);
            	orderArr[$(this).closest(".write_textarea").attr("data-sort")] = value.split("<ul")[0];
    		}
    	});
    	
        
        $('select').niceSelect();
        
	    
	 	// 모하람 작성 - 콘텐츠 순서 변경(위, 아래로 이동)
        $(".write_textarea").on('keyup',function(){
        	var value = $(this).html();
        	orderArr[$(this).attr("data-sort")] = value.split("<ul")[0];
        });
       
        $(".write_textarea ul").on('click',function(){
        	var value = $(this).parent().html();
        	orderArr[$(this).parent().attr("data-sort")] = value.split("<ul")[0];
        });
        
        

        // 이유라 작성
        $('html').mouseover(function(e) {   
            if( !$(e.target).is( $('.contentBox')) ) { 
               if( !$(e.target).is( $('.contentBox').find('*') ) ){                    
                    if( !$(e.target).is( $('.text_toolBoxes').find('*') )){
                    	$(".content_toolBoxes").hide();
                    	$("#write_bd .text_toolBoxes").hide();
                    	
                    }
               }
            }
        }); 
        
        order = parseInt(order)+1;
        
        
        
        // 이유라 작성 - div.write_textarea에 focus된 경우 툴박스 보이기
        $('.write_textarea').on('click', function(){
            $(".content_toolBoxes").hide();
            $(".text_toolBoxes").hide();
            
            $(this).children().css('top', -40  );    //툴박스 위치
            $(this).children().next().css('top', -40 );    //툴박스 위치
            $(this).children().show();
            $(this).children().next().show();
            
            addContent();
            
//            $(this).focus();
//            
//            var range = document.createRange(),
//                selection = window.getSelection();
//            
//            range.setStartAfter($(this).get(0).lastChild);
//            
//            selection.removeAllRanges();
//            selection.addRange(range);
            
        });
    });//끝- 텍스트 추가 버튼 누르고 난 후 이벤트
    
  
    // 모하람 작성 - 파일 업로드 시 미리 보기
    $(".contentFile").change(function(){
    	if($(this).prop("files")[0].size > 20485500){
    		// 20메가 이상의 파일 업로드했을 때(톰캣 자체 설정 -> 설정 변경하면 업로드 가능한 max size 조절 가능)
			$.jAlert({
			    'title': '!!',
			    'content': '10MB 이하의 파일만 업로드 가능합니다.',
			    'closeOnClick' : true,
			    'theme' : 'red',
			    'size': 'xsm'
			  });
    	} else {
        	// 파일(이미지, 문서) 추가
    		var ext = $(this).val().split('.')[1].toLowerCase(); // 파일의 확장자
    		var file = $(this).prop("files")[0];
    		var newFile = $(this);
    		var contents = [];
    		blobURL = window.URL.createObjectURL(file);
    		if($.inArray(ext,['pdf','doc','docx','ppt','pptx','xls','xlsx',
    		                  'txt','py','js','xml','css','md','pl','c','m','json']) != -1){
    			// doc, pdf, ppt 파일 등(문서 형식 파일)
    			// 미리보기 영역에 뷰어 표시
				$("#write_bd").append("<div class='contentBox' data-sort="+order+">"
						+"<div class='viewerBg'><div class='loading_wrap'><img class='project_loading' src='resources/images/project_loading.gif'></div></div>"
						+"<ul class='content_toolBoxes' id='content_toolBox'>"
						+"<li id='text_up'><a href='#' onclick='moveUpElement(this); return false;'></a></li>"
						+"<li id='text_down'><a href='#' onclick='moveDownElement(this); return false;'></a></li>"
						+"<li id='text_delete'><a href='#' onclick='removeElement(this); return false;'></a></li>"
						+"</ul>"
						+"<iframe style='width:570px; height:740px;'/></div>");		
				var curOrder = order;
				order = parseInt(order)+1;
				$(".viewerBg .project_loading:last").css("display","block");
				
				var docFile = new FormData();
				docFile.append("doc",$(this).prop("files")[0]);
				
				$.ajax({
					url: "showViewer2",
					processData: false,
					contentType: false,
					data: docFile,
					type: "POST",
					success: function(newFileName){
						console.log("새로운 파일 이름: "+newFileName);
						var iframeSrc = "http://docs.google.com/viewer?url=http://52.79.195.100:8080/mediolio/upload/docs/"+newFileName+"&embedded=true";
						$("[data-sort="+curOrder+"]").find("iframe").attr("src",iframeSrc);
						
    					$("#write_bd .viewerBg:last").css("display","none");
    					if($(newFile).val().split("\\")[2] == undefined){
//    						orderArr[curOrder] = $(newFile).val();
    						orderArr[curOrder] = newFileName;
    						console.log("orderArr 들어갔는지 확인: "+orderArr[curOrder]);
    					} else {
//    						orderArr[curOrder] = $(newFile).val().split("\\")[2];
    						orderArr[curOrder] = newFileName;
    						console.log("orderArr 들어갔는지 확인: "+orderArr[curOrder]);
    					}
    					

    				    addContent();
					}
				});

    			
    			fileNum++;
    			$("#btn_addFile").append("<input type='file' class='contentFile' id='file"+fileNum+"' name='contents' onchange='fileChange(this)'/>");	
    			
    		} else if($.inArray(ext,['gif','png','jpg','jpeg']) != -1) {
    			// 이미지 파일
    			// 미리보기 영역에 이미지 표시
    			console.log(order);
    			$("#write_bd").append("<div class='contentBox' data-sort="+order+">"
    					+"<ul class='content_toolBoxes' id='content_toolBox'>"
    					+"<li id='text_up'><a href='#' onclick='moveUpElement(this); return false;'></a></li>"
    					+"<li id='text_down'><a href='#' onclick='moveDownElement(this); return false;'></a></li>"
    					+"<li id='text_delete'><a href='#' onclick='removeElement(this); return false;'></a></li>"
    					+"</ul>"
    					+"<img src='"+blobURL+"' style='display:block; margin:auto;'/></div>");
    			var curOrder = order;
    			order = parseInt(order)+1;
    			
    			if($(this).val().split("\\")[2] == undefined){
    				// 파이어폭스
    				orderArr[curOrder] = $(this).val();
    			} else {
    				orderArr[curOrder] = $(this).val().split("\\")[2];
    			}
    			
    			
    			console.log(order);
    		    fileNum++;
    			$("#btn_addFile").append("<input type='file' class='contentFile' id='file"+fileNum+"' name='contents' onchange='fileChange(this)'/>");	
    			addContent();
    			
    		} else {
    			$.jAlert({
    			    'title': '!!',
    			    'content': '업로드가 지원되지 않는 파일 형식입니다.',
    			    'closeOnClick' : true,
    			    'theme' : 'red',
    			    'size': 'xsm'
    			  });
    		}
    	}
    });
    
    $("#selectedCategory").change(function(){
    	// 모하람 작성 - 카테고리 새로 선택했을 때 기존에 있던 세부카테고리 초기화
    	$(".card_tag").html("");
//    	if($("#write_dCategory a").html() != "세부 카테고리 선택.."){
    		$("#write_dCategory a").html("세부 카테고리 선택..");
//    	}
    });
    
    
    
    
    
    $("#write_tagInput").keyup(function(){
    	// 모하람 작성 - 태그 자동 완성
    	if($(this).val().trim() != ""){
    	$.ajax({
    		type: "POST",
    		url: "autocompleteTags",
    		data: {
    			h_value: $(this).val()
    		},
    		dataType: "json",
    		success: function(jdata){
    			var codes = "";
    			var arr = jdata;
    			for(var i=0; i<arr.length; i++){
    				codes += "<li onclick='addTag(this)'>"+arr[i]+"</li>";
    			}
    			if(arr.length>0){
    				$("#autoCompleteArea").html(codes);
        			$(".autoTag").css("display","block");
            		moveAutoCompleteBox();
    			}
    		}
    	});
    	} else {
    		$(".autoTag").css("display","none");
    	}
    });
    
    $("#write_tagInput").keydown(function(e){
    	if(e.keyCode == 8 && $(this).val() == ""){
    		// 모하람 작성 - 백스페이스 누르면 태그 삭제
	    	$("#write_tagTxt span:last-child").remove();

    		
    		
    		if( $('#write_tagTxt span').last().length == 0){
    			$('#write_tagInput').css({
        			left: 0
        		})
    		}
    		else if( $('#write_tagTxt span').last().length == 1){
    			var lastSpanOffset = $('#write_tagTxt span').last().offset().left;
        		var lastSpanWidth = $('#write_tagTxt span').last().width();
        		
    			$('#write_tagInput').css({
	    			left: lastSpanOffset+lastSpanWidth-280,
	    			top: $('#write_tagTxt').height()-30
	    		})
	    		$('#write_tagTitle').css({
	    			height:$('#write_ft').height()
	    		})
    		}
    		
	    	if($("#write_tagTxt span").length == 0){
	    		// 입력된 태그가 하나도 없을 경우
	    		$("#write_tagInput").attr("placeholder","태그를 입력하세요.");
	    	}
	    	
	    	$(".autoTag").css("display","none");
	    	
	    	if($("#write_tagTxt span").size() < 2){
	    		$(".autoTag").css({
	    			left: 0,
	    			top: 30
	    		});
	    		
	    	} else {
		    	var lastSpanOffset = $('#write_tagTxt span').last().offset().left;
		    	var lastSpanWidth = $('#write_tagTxt span').last().width();
		    	
		    	$('.autoTag').css({
		    		left: lastSpanOffset+lastSpanWidth-100,
		    		top: $('#write_tagTxt').height()
		    	});
	    	}
    	} 
    });
    
    
	
	
	
    $("#write_tagInput").keyup(function(e){
    	if(e.keyCode == 188 || e.keyCode == 13){
    		// 모하람 작성 - 컴마 누르면 태그 입력
    		if(($.trim($(this).val()) != "") || ($(this).val() != ",")){
	    		var newTag = $(this).val().replace(",","");
	    		$(this).attr("placeholder","");
	    		$("#write_tagTxt").append("<span>"+newTag+"</span>");
	    		
	    		var lastSpanOffset = $('#write_tagTxt span').last().offset().left;
	    		var lastSpanWidth = $('#write_tagTxt span').last().width();
	    		
	//    		var lastSpanOffset = $newTag.offset().left;
	//    		var lastSpanWidth = newTag.length;
	    		
	    		
	    		$(this).val("");
	    		$(this).focus();
	    		
	    		
	    		$('#write_tagInput').css({
	    			left: lastSpanOffset+lastSpanWidth-280,
	    			top: $('#write_tagTxt').height()-30
	    		})
	    		$('#write_tagTitle').css({
	    			height:$('#write_ft').height()
	    		})
	    		
	    		
	    		$(".autoTag").css("display","none");
	    		moveAutoCompleteBox();
    		}
    	}
    });
    
    $('#contentsWrap').click(function(){
    	if($.trim($("#write_tagInput").val()) != ""){
    		// 모하람 작성
    		var newTag = $("#write_tagInput").val().replace(",","");
    		$("#write_tagInput").attr("placeholder","");
    		$("#write_tagTxt").append("<span>"+newTag+"</span>");
    		$("#write_tagInput").val("");

    		if( $('#write_tagTxt span').last().length == 0){
    			$('#write_tagInput').css({
        			left: 0
        		})
    		}
    		else if( $('#write_tagTxt span').last().length == 1){
    			var lastSpanOffset = $('#write_tagTxt span').last().offset().left;
        		var lastSpanWidth = $('#write_tagTxt span').last().width();
        		
    			$('#write_tagInput').css({
	    			left: lastSpanOffset+lastSpanWidth-280,
	    			top: $('#write_tagTxt').height()-30
	    		})
	    		$('#write_tagTitle').css({
	    			height:$('#write_ft').height()
	    		})
    		}
    		
	    	if($("#write_tagTxt span").length == 0){
	    		// 입력된 태그가 하나도 없을 경우
	    		$("#write_tagInput").attr("placeholder","태그를 입력하세요.");
	    	}
	    	
    		$(".autoTag").css("display","none");
    		moveAutoCompleteBox();
    	}
    });
    
    $("#projectTitle").keyup(function(){
    	// 모하람 작성 - 글 제목 입력하면 우측 미리보기 박스의 제목 변경
    	$(".card_title a").html($(this).val());
    });
    
//    addContent();
    
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////
    // 2단계: 프로젝트 정보 작성
    $(".project_related_class").keyup(function(){
    	// 모하람 작성 - 관련 과목 자동 완성
    	console.log("관련 과목");
		if($(this).val().trim() != ""){
	    	$.ajax({
	    		type: "POST",
	    		url: "autocompleteClass",
	    		data: {
	    			cl_name: $(this).val()
	    		},
	    		dataType: "json",
	    		success: function(jdata){
	    			var codes = "";
	    			var arr = jdata;
	    			for(var i=0; i<arr.length; i++){
	    				codes += "<li onclick='addProjClass(this)'>"+arr[i]+"</li>";
	    			}
	    			if(arr.length>0){
	    				$(".autoClassArea").html(codes);
	        			$(".autoClass").css({
	        				display: "block"
//	        				top: $(".historyList_addRelated").offset().top-108
	        			});
	        			
	    			}
	    		}
	    	});
    	} else {
    		$(".autoClass").css("display","none");
    	}
    });
    
    $(".teamMateName").keyup(function(){
    	// 모하람 작성 - 학생 이름 자동 완성
    	var input = $(this);
		if($(this).val().trim() != ""){
	    	$.ajax({
	    		type: "POST",
	    		url: "autocompleteMember",
	    		data: {
	    			m_name: $(this).val()
	    		},
	    		dataType: "json",
	    		success: function(jdata){
	    			var codes = "";
	    			var arr = jdata;
	    			for(var i=0; i<arr.length; i++){
	    				codes += "<li onclick='addMember(this)'>"+arr[i]+"</li>";
	    			}
	    			if(arr.length>0){
	    				$(input).parent().find(".autoMember").find(".autoMemberArea").html(codes);
	    				// $(".autoMemberArea").html(codes);
	    				$(input).parent().find(".autoMember").css({
	    					display:"block"
	    				});
	    				
	    			}
	    		}
	    	});
    	} else {
    		$(".autoMember").css("display","none");
    	}
    });
    
    
});

function moveUpElement(e){
	// 모하람 작성 - 엘리먼트 위로 이동(콘텐츠 순서 변경)
	var element = e;
	var order = $(element).closest(".contentBox").attr("data-sort");
	
	if(order != 0){
		$(element).closest(".contentBox").attr("data-sort",parseInt(order)-1);
		$(element).closest(".contentBox").prev(".contentBox").attr("data-sort",parseInt($(element).closest(".contentBox").prev(".contentBox").attr("data-sort"))+1);
	
		// 배열 순서 바꾸기
		var origin = orderArr[order]; 
		orderArr[order] = orderArr[order-1];
		orderArr[order-1] = origin;
		
		sortElements();	
		
		console.log(orderArr);
	}
}

function moveDownElement(e){
	// 모하람 작성 - 엘리먼트 아래로 이동(콘텐츠 순서 변경)
	var element = e;
	var order = $(element).closest(".contentBox").attr("data-sort");
	$(element).closest(".contentBox").attr("data-sort",parseInt(order)+1);
	$(element).closest(".contentBox").next(".contentBox").attr("data-sort",parseInt($(element).closest(".contentBox").next(".contentBox").attr("data-sort"))-1);

	// 배열 순서 바꾸기
	var origin = orderArr[order]; 
	orderArr[order] = orderArr[parseInt(order)+1];
	orderArr[parseInt(order)+1] = origin;
	
	sortElements();	
	
	console.log(orderArr);
	
}

function removeElement(e){
	// 모하람 작성 - 콘텐츠 삭제
	var element = e;
	var elementOrder = $(element).closest(".contentBox").attr("data-sort");
	var nextElements = $("#write_bd").find(".contentBox").filter(function(){
		// 삭제하려는 엘리먼트보다 뒤에 있는 엘리먼트 선택
		return $(this).attr("data-sort") > elementOrder;
	});
	for(var i=0; i<nextElements.length; i++){
		var e = nextElements[i];
		e.setAttribute("data-sort",parseInt(e.getAttribute("data-sort"))-1);
	}
	
	$(element).closest(".contentBox").remove();

	var arr1 = orderArr.slice(0,elementOrder);
	var arr2 = orderArr.slice(parseInt(elementOrder)+1,orderArr.length);
	orderArr = arr1.concat(arr2);
	
	console.log(orderArr);
	
	order = parseInt(order-1);
	console.log(order);
}

function sortElements(){
	// 모하람 작성 - 순서에 따라 콘텐츠 정렬
	var $wrapper = $('#write_bd');

	$wrapper.find('.contentBox').sort(function (a, b) {
	    return +a.getAttribute('data-sort') - +b.getAttribute('data-sort');
	})
	.appendTo($wrapper);
}

function getSelectedText(){
	// 모하람 작성 - 선택된 텍스트 출력
	var obj = window.getSelection();
}

function writeEmbedModalOpen(){
	// 이유라 작성 - 임베드 태그 모달 띄우기
	$('body').addClass('preventScroll');
    $('.modal_bg, #modal_writeEmbed').show();
    
    
}

function addTag(li){
	// 모하람 작성 - 자동 완성된 태그 클릭 시 태그 추가
	var newTag = li;
	$("#write_tagInput").attr("placeholder","");
	$("#write_tagTxt").append("<span>"+$(newTag).find("span").html()+"</span>");
	$("#write_tagInput").val("");
	$("#write_tagInput").focus();
	$(".autoTag").css("display","none");
	
	if( $('#write_tagTxt span').last().length == 0){
		$('#write_tagInput').css({
			left: 0
		})
	}
	// 이유라 작성 - 태그가 입력되는 위치 변경
	else if( $('#write_tagTxt span').last().length == 1){
		var lastSpanOffset = $('#write_tagTxt span').last().offset().left;
		var lastSpanWidth = $('#write_tagTxt span').last().width();
		
		$('#write_tagInput').css({
			left: lastSpanOffset+lastSpanWidth-280,
			top: $('#write_tagTxt').height()-30
		})
		$('#write_tagTitle').css({
			height:$('#write_ft').height()
		})
	}
	
	if($("#write_tagTxt span").length == 0){
		// 입력된 태그가 하나도 없을 경우
		$("#write_tagInput").attr("placeholder","태그를 입력하세요.");
	}
}

//모하람 작성 - 파일(이미지, 문서) 추가
function fileChange(file){
	var newFile = file;
	var ext = $(newFile).val().split('.')[1].toLowerCase(); // 파일의 확장자
	var file = $(newFile).prop("files")[0];
	blobURL = window.URL.createObjectURL(file);
	if($.inArray(ext,['pdf','doc','docx','ppt','pptx','xls','xlsx',
	                  'txt','py','js','xml','css','md','pl','c','m','json']) != -1){
		// doc, pdf, ppt 파일
		// 미리보기 영역에 뷰어 표시
		$("#write_bd").append("<div class='contentBox' data-sort="+order+">"
				+"<div class='viewerBg'><div class='loading_wrap'><img class='project_loading' src='resources/images/project_loading.gif'></div></div>"
				+"<ul class='content_toolBoxes' id='content_toolBox'>"
				+"<li id='text_up'><a href='#' onclick='moveUpElement(this); return false;'></a></li>"
				+"<li id='text_down'><a href='#' onclick='moveDownElement(this); return false;'></a></li>"
				+"<li id='text_delete'><a href='#' onclick='removeElement(this); return false;'></a></li>"
				+"</ul>"
				+"<iframe style='width:570px; height:740px;'/></div>");
		var curOrder = order;
		order = parseInt(order)+1;
		$(".viewerBg .project_loading:last").css("display","block");

		var docFile = new FormData();
		docFile.append("doc",$(newFile).prop("files")[0]);
		
		$.ajax({
			url: "showViewer2",
			processData: false,
			contentType: false,
			data: docFile,
			type: "POST",
			success: function(newFileName){
				console.log("새로운 파일 이름: "+newFileName);
				var iframeSrc = "http://docs.google.com/viewer?url=http://52.79.195.100:8080/mediolio/upload/docs/"+newFileName+"&embedded=true";
				$("[data-sort="+curOrder+"]").find("iframe").attr("src",iframeSrc);
				
				$("#write_bd .viewerBg:last").css("display","none");
				if($(newFile).val().split("\\")[2] == undefined){
					orderArr[curOrder] = newFileName;
					console.log("orderArr 들어갔는지 확인: "+orderArr[curOrder]);
				} else {
					orderArr[curOrder] = newFileName;
					console.log("orderArr 들어갔는지 확인: "+orderArr[curOrder]);
				}
				

			    addContent();
			}
		});
		
		fileNum++;
		$("#btn_addFile").append("<input type='file' class='contentFile' id='file"+fileNum+"' name='contents' onchange='fileChange(this)'/>");	
//		addContent();
		
	} else if($.inArray(ext,['gif','png','jpg','jpeg']) != -1){
		// 이미지 파일
		// 미리보기 영역에 이미지 표시
		console.log(order);
		$("#write_bd").append("<div class='contentBox' data-sort="+order+">"
				+"<ul class='content_toolBoxes' id='content_toolBox'>"
				+"<li id='text_up'><a href='#' onclick='moveUpElement(this); return false;'></a></li>"
				+"<li id='text_down'><a href='#' onclick='moveDownElement(this); return false;'></a></li>"
				+"<li id='text_delete'><a href='#' onclick='removeElement(this); return false;'></a></li>"
				+"</ul>"
				+"<img src='"+blobURL+"' style='display:block; margin:auto;'/></div>");
		var curOrder = order;
		order = parseInt(order)+1;
				
		
		if($(newFile).val().split("\\")[2] == undefined){
			// 파이어폭스
			orderArr[curOrder] = $(newFile).val();
		} else {
			orderArr[curOrder] = $(newFile).val().split("\\")[2];
		}
		
		console.log(order);
		fileNum++;
		console.log("파일 이름: "+$(newFile).val());
		$("#btn_addFile").append("<input type='file' class='contentFile' id='file"+fileNum+"' name='contents' onchange='fileChange(this)'/>");	
		addContent();
		
	} else {
		$.jAlert({
		    'title': '!!',
		    'content': '업로드가 지원되지 않는 파일 형식입니다.',
		    'closeOnClick' : true,
		    'theme' : 'red',
		    'size': 'xsm'
		  });
	}
}


function replaceSelectedText(replacementText) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}

// 모하람 작성 - 텍스트 bold로 변경
function txtBold(){
	var range = window.getSelection().getRangeAt(0);
	console.log(range);
	console.log(range.toString());
	if(getSelectedNode().className.indexOf("txtBold") > -1){
		
		var newNode = document.createElement("span");
		newNode.setAttribute("class", "txtBoldRemove");
		newNode.appendChild(range.extractContents());
		range.insertNode(newNode);		
		
	} else {
		var newNode = document.createElement("span");
		newNode.setAttribute("class", "txtBold");
		newNode.appendChild(range.extractContents());
		range.insertNode(newNode);
	}
	
}

// 모하람 작성 - 텍스트 이탤릭 적용
function txtItalic(){
	var range = window.getSelection().getRangeAt(0);
	if(getSelectedNode().className.indexOf("txtItalic") > -1){
		var newNode = document.createElement("span");
		newNode.setAttribute("class", "txtItalicRemove");
		newNode.appendChild(range.extractContents());
		range.insertNode(newNode);		
		
	} else {
		var newNode = document.createElement("span");
		newNode.setAttribute("class", "txtItalic");
		newNode.appendChild(range.extractContents());
		range.insertNode(newNode);
	}
	
}

// 모하람 작성 - 텍스트 언더라인 적용
function txtUnderline(){
	var range = window.getSelection().getRangeAt(0);
	if(getSelectedNode().className.indexOf("txtUnderline") > -1){
		var newNode = document.createElement("span");
		newNode.setAttribute("class", "txtUnderlineRemove");
		newNode.appendChild(range.extractContents());
		range.insertNode(newNode);		
		
	} else {
		var newNode = document.createElement("span");
		newNode.setAttribute("class", "txtUnderline");
		newNode.appendChild(range.extractContents());
//		range.surroundContents(newNode);
		range.insertNode(newNode);
	}
	
}

function getSelectedNode()
{
    if (document.selection)
    	return document.selection.createRange().parentElement();
    else
    {
    	var selection = window.getSelection();
    	if (selection.rangeCount > 0)
    		return selection.getRangeAt(0).startContainer.parentNode;
    }
}

// 이유라 작성 
function addContent(){
	$('#write_bd .contentBox').hover(function(){
    	$('.content_toolBoxes',this).css('top', - 40 );    //툴박스 위치
        $('.content_toolBoxes',this).show();
    }, function(){
    	$('.content_toolBoxes',this).hide();
    	
    });
    
	$(this).trigger("focus");
}

function getColorRange(){
	var range = window.getSelection().getRangeAt(0);
	return range;
}


// 이유라 작성 - 자동 완성 박스 위치 조정
function moveAutoCompleteBox(){
	var lastSpanOffset = $('#write_tagTxt span').last().offset().left;
	var lastSpanWidth = $('#write_tagTxt span').last().width();
	
	$('.autoTag').css({
		left: lastSpanOffset+lastSpanWidth-280,
		top: $('#write_tagTxt').height()
	});
}

// 이유라 작성 - 태그 hover 스타일 적용
function tagHover_write(){
	$(".card_img").hover(function(){
        $('div', this).addClass("card_hover");
        $('p',this).show();
    },function(){
        $('div', this).removeClass("card_hover");
        $('p',this).hide();
    });
}

function addProjClass(li){
	// 모하람 작성 - 자동 완성 목록에서 항목 클릭 시 관련 과목 영역에 추가
	var newClass = li;
	$(newClass).parent().parent().parent().find(".project_related_class").val($(newClass).find("span").html());
	$(".autoClass").css("display","none");
	$("input[name=cl_id]").val($(newClass).find(".classId").val());
}

function addMember(li){
	// 모하람 작성 - 자동 완성 목록에서 항목 클릭 시 팀원 영역에 추가
	var newMember = li;
	$(newMember).parent().parent().parent().find(".teamMateName").val($(newMember).find("span").html());
	var tmMemOrder = $(newMember).parent().parent().parent().find(".teamMateName").attr("data-sort");
	$(".autoMember").css("display","none");
	$(".cardWindow_write2").append("<input type='hidden' name='tmList["+tmMemOrder+"].m_id' value="+$(newMember).find(".memId").val()+">");
}

function autoCompleteMember(txt){
	// 모하람 작성 - 팀원 입력 시 이름 자동 완성
	var input = txt;
	if($(input).val().trim() != ""){
    	$.ajax({
    		type: "POST",
    		url: "autocompleteMember",
    		data: {
    			m_name: $(input).val()
    		},
    		dataType: "json",
    		success: function(jdata){
    			var codes = "";
    			var arr = jdata;
    			for(var i=0; i<arr.length; i++){
    				codes += "<li onclick='addMember(this)'>"+arr[i]+"</li>";
    			}
    			if(arr.length>0){
    				$(input).parent().find(".autoMember").find(".autoMemberArea").html(codes);
    				$(input).parent().find(".autoMember").css({
    					display:"block"
    				});

    			}
    		}
    	});
	} else {
		$(".autoMember").css("display","none");
	}
}

// 이유라 작성
function writeNavi(step){
	$('.writeNavi a').removeClass('click');
	$('#'+step).addClass("click");
	writeStep(step);
}

// 이유라 작성
function writeStep(step){
	$(".write_textarea").each(function(){
	    orderArr[$(this).attr("data-sort")] = $(this).html().split("<ul")[0];
	    console.log(orderArr[$(this).attr("data-sort")]);
	});
	$('.writeNavi a').removeClass('click');
	$('#'+step).addClass("click");
	if (step=='projTab1'){
		$('.writeStp2').hide();
		$('.writeStp1').show();
	}
	else if (step=='projTab2'){
		$('.writeStp1').hide();
		$('.writeStp2').show();
	}
}

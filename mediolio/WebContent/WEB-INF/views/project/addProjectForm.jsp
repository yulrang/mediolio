<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>MEDIOLIO</title>
<link href="resources/css/common.css" rel="stylesheet" type="text/css"/>
<link href="resources/css/ui.css" rel="stylesheet" type="text/css"/>
<link href="resources/css/index.css" rel="stylesheet" type="text/css"/>
<link href="resources/css/card.css" rel="stylesheet" type="text/css"/>
<link href="resources/css/modal.css" rel="stylesheet" type="text/css"/>
<link href="resources/css/write.css" rel="stylesheet" type="text/css"/>
    
<link rel="stylesheet" href="resources/css/jquery.mCustomScrollbar.css" />
<link rel="stylesheet" href="resources/css/nice-select.css"/>
<link rel="stylesheet" href="resources/css/jquery-labelauty.css"/>

<script src="js/jquery-1.11.3.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="js/jquery.nice-select.js"></script>
<script src="js/jquery-labelauty.js"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script src="js/ui.js"></script>
<script src="js/modal.js"></script>
<script src="js/index.js"></script>    
<script src="js/write.js"></script>     
</head>
<body>
<div id="header">
	<div id="headerWrap">
        <div class="inputStyle" id="search_main">
        	<div id="selectWrap_main">
                <select id="select_main">
                    <option value="title">TITLE</option>
                    <option value="id">ID</option>
                    <option value="tag">TAG</option>
                </select>
           </div>
            <input class="input_in" id="text_main" type="text"/>
            <input class="btn_search" type="button" />
        </div><!--//search_main-->
        <input class="btnStyle" id="btn_login" type="button" value="LOGIN" onClick="loginModalOpen()"/>
    </div><!--//headerWrap-->
    
    
</div>
    

<div id="aside">
    <div id="logoWrap"></div>
	<div class="asideWrap" id="userBox">
    	<p><a href="#">12LEEYURA</a></p>
        <ul>
        	<li id="myPf"><a href="#" class="indent">MyPortfolio</a></li>
            <li id="likePf"><a href="#" class="indent">Like</a></li>
            <li id="follow"><a href="#" class="indent">Follow</a></li>
            <li id="message"><a href="#" class="indent">Message</a></li>
        </ul>
    </div><!--//userBox-->
    <div id="uploadWrap">
    	<a id="uploadPf" href="#">UPLOAD PORTFOLIO</a>
    </div><!--//uploadWrap-->
    <div class="asideWrap" id="categoryTitle">
    	<p>CATEGORY</p>
    </div><!--//categoryTitle-->
    
    <div id="categoryWrap">
        <ul id="nav_category">
    		<li class="nav_group">
    			<div class="nav_title" id="ct_game"><span></span>GAME</div>
            	<ul class="nav_sub">
            		<li><a href="#">프로그래밍</a>
                    <li><a href="#">태그이름</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">태그이름</a>
                </ul>
            </li>
            
            <li class="nav_group">
    			<div class="nav_title" id="ct_video"><span></span>VIDEO</div>
            	<ul class="nav_sub">
            		<li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                </ul>
            </li>
            
            <li class="nav_group">
    			<div class="nav_title" id="ct_sound"><span></span>SOUND</div>
            	<ul class="nav_sub">
            		<li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                </ul>
            </li>
            
            <li class="nav_group">
    			<div class="nav_title" id="ct_webApp"><span></span>WEB &amp; APP</div>
            	<ul class="nav_sub">
            		<li><a href="#">tag</a>
                </ul>
            </li>
            
            <li class="nav_group">
    			<div class="nav_title" id="ct_design"><span></span>DESIGN</div>
            	<ul class="nav_sub">
            		<li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                </ul>
            </li>
            
            <li class="nav_group">
    			<div class="nav_title" id="ct_3d"><span></span>3D</div>
            	<ul class="nav_sub">
            		<li><a href="#">tag</a>
                    <li><a href="#">tag</a>
                </ul>
            </li>
    	</ul><!--//nav_category-->
	</div><!--//categoryWrap-->
</div><!--//aside-->
    
    
<div id="contentsWrap">
    <div class="cardWindow">
        <div class="cardWindow_hd">UPLOAD PORTFOLIO</div>
        <div id="write_hd">
            <div id="write_category">
                <select id="selectedCategory">
                	<option>카테고리</option>
                    <option value="1">게임</option>
                    <option value="2">영상</option>
                    <option value="3">3D</option>
                    <option value="4">디자인</option>
                    <option value="5">웹 & 앱</option>
                    <option value="6">컴퓨터 그래픽스</option>
                    <option value="7">사운드</option>
                </select>
            </div><!--//write_category-->
            <div id="write_dCategory">
                <a href="#" onclick="writeDCategoryModalOpen()">세부 카테고리 선택..</a>
            </div>
        </div><!--//write_hd-->
        
        <div id="write_title">
            <input class="input_in" type="text" placeholder="글 제목을 입력하세요."/>
        </div><!--//write_title-->
        
        <div id="write_bd">
            <a href="#" class="btn_circle" id="btn_addWrite"></a>
            <ul class="bubble" id="bubble_addWrite">
                <li>
					<form id="viewerForm" action="showViewer" method="post" enctype="multipart/form-data">
                		<a id="btn_addFile" href="#"><input type="file" id="contentFile" name="projectFile"/>파일 업로드</a>
  					</form>
                </li>
                <li><a id="btn_addMedia" href="#" onclick="writeEmbedModalOpen()">미디어 추가</a></li>
                <li><a id="btn_addText" href="#">텍스트 추가</a></li>
            </ul>
 <!--
            <div class="write_textarea" contenteditable>
                
            </div>
            

            <ul id="text_toolBox">
                <li id="text_size">
                    <select id="select_fontSize">
                        <option>10px</option>
                        <option>11px</option>
                    </select>
                </li>
                <li id="text_color"><a href="#"></a></li>
                <li id="text_bold"><a href="#"></a></li>
                <li id="text_italic"><a href="#"></a></li>
                <li id="text_under"><a href="#"></a></li>
                <li id="text_up"><a href="#"></a></li>
                <li id="text_down"><a href="#"></a></li>
                <li id="text_up"><a href="#"></a></li>
                <li id="text_down"><a href="#"></a></li>
                <li id="text_delete"><a href="#"></a></li>
            </ul>

            <a href="#" class="text_position" id="btn_textUp"></a>
            <a href="#" class="text_position" id="btn_textDown"></a>
-->
            
        </div><!--//write_bd-->
        

        <div id="write_ft">
            <div id="write_tagTitle">#</div>
            <div id="write_tag">
                <input class="input_in" type="text" placeholder="태그를 입력하세요."/>
            </div>
        </div>
    </div><!--//cardWindow-->
    
    
    
    <div class="cardWrap">
    	<div class="card_hd"></div>
    	<div class="card_img">
        	<a href="#"><img src="images/default.png"/></a>
        </div><!--//card_img-->
    	<div class="card_bd">
        	<p class="card_title ellipsis"><a href="#">글제목입니다.글제목입니다.글제목입니다.</a></p>
            <p class="card_dscrpt"><a href="#">12이유라</a></p>
            <p class="card_tag">게임프로그래밍,게임사운드,게임프로그래밍</p>
        </div><!--//card_bd-->
        <div class="card_ct">
        	<p class="p_like"><span></span>12</p>
            <p class="p_view"><span></span>12</p>
        </div><!--//card_ct-->
    </div><!--//cardWrap-->
    
    
    <input type="submit" id="submit_portfolio" value="SUBMIT"/>
</div><!--//contentsWrap-->

        
    
    
    
<div class="modal_bg"></div>


    
<div class="modal modal_dCategory" id="modal_writeDCategory">
    <div class="modal_hd modal_hd_dCategory">CATEGORY
        <input class="btnStyle btn_category" id="btn_writeDCategory" type="button" value="REGIST"/>
    </div>
    <div class="modal_bd modal_bd_dCategory" id="modal_bd_writeDCategory">
        <ul>
<!--             <li> -->
<!--                 <input type="checkbox" data-labelauty="게임프로그래밍"/> -->
<!--                 <label class="label_category">게임프로그래밍</label> -->
<!--             </li> -->
<!--             <li> -->
<!--                 <input type="checkbox" data-labelauty="게임프로그래밍"/> -->
<!--                 <label class="label_category">게임프로그래밍</label> -->
<!--             </li> -->
        </ul>
        
        
    </div><!--//modal_bd_writeDCategory -->
</div><!--//modal_writeDCategory-->

    
    
<div class="modal modal_dCategory" id="modal_writeEmbed">
    <div class="modal_hd modal_hd_dCategory">EMBED TAG
        <input class="btnStyle btn_category" id="btn_writeEmbed" type="button" value="REGIST"/>
    </div>
    <div class="modal_bd modal_bd_dCategory" id="modal_bd_writeEmbed">
        <textarea placeholder="태그를 입력하세요."></textarea>
        
    </div><!--//modal_bd_writeEmbed -->
</div><!--//modal_writeEmbed-->
</div>
</body>
</html>
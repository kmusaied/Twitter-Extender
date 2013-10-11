		var statusBoxID = ".twitter-anywhere-tweet-box-editor";
		
		var dirIconPath = chrome.extension.getURL("icons/dir-icon.png");
		var hmIconPath = chrome.extension.getURL("icons/hmicon.png");
		var addUrlIcon = chrome.extension.getURL("icons/link_add2.png");
		
		var switchDirTag = "<a href='#' class='Swich-dir-link' style=';background-repeat:no-repeat;margin-left:3px;' ><span><i  style='background-image:none;'></i><b>&Xi; Switch </b></span></a>";
		var trnsTag = "<li><a href='#' title='Translate tweet!' class='retweet-action tr-link'><span><i></i><b>&phi; Trans.</b></span></a><li>";
		var prevTweetTag = "<li><span class='link'><span style='background-image:url()' class='prev-Tweet reply-icon icon'></span><a class='prev-Tweet' title='Load Previous Tweet' href='#'>PrevTweet</a></span></li>";
		var addLinkTag = "<a href='#' tabindex='4'  id='btnLink' title='shorten and add link' style='height:5px'><img src='"+addUrlIcon+"'/></a>&nbsp; <input type='text' id='speaktweet' style='width: 10px;display:none;background-color:transparent;border:solid 0;-webkit-box-shadow:0 0 0px;cursor: hand;' title='Speech to Tweet!' x-webkit-speech onwebkitspeechchange='var tbox = $(" + "\""+ statusBoxID +"\"" + "); tbox.val(tbox.val()+\" \"+ this.value)'  />";
		var favoritiesLink = '<li id="favorites-link"><a href="/#!/favorites" data-element-term="favorites_stats"><strong>n/a</strong> Favs</a></li>';
		var retweetLink = '<div id="retweet-link" class="your-activity retweet-activity"><h2><a href="/#!/retweeted_of_mine" class="title-link"><span class="dashboard-component-title">Retweets of Mine</span></h2></div>';
		var splitter = '<hr class="component-spacer"></hr>';
		var username = null;
		var hideMensions = null;
		var highlightColor = null;
		var autoSwitch = null;
		var MyLang = null;
		var DisableAlerts = false;
		var OldTwitterValue = 0;
		
		//show logo
		chrome.extension.sendMessage({app:"startUp"}, function(response) {
		});
		
		//Get Highlight color
		chrome.extension.sendMessage({app:"color"}, function(response) {
			highlightColor = response.result;
		});
		
		
		
		//Get Auto Swith Tweet 
		chrome.extension.sendMessage({app:"ast"}, function(response) {
			autoSwitch = response.result;
		});
		
		//Get Translation Language
		chrome.extension.sendMessage({app:"MyLang"}, function(response) {
			MyLang = response.result;
		});
		
		//Disable Mentions Alert Status
		chrome.extension.sendMessage({app:"mas"}, function(response) {
			DisableAlerts = response.result;
			console.log("DisableDesktopAlerts:"+DisableAlerts )	
			mentionsChecker();
			
		
		});
		
		
		
		//getting the username
		username = jQuery.trim($(".js-mini-current-user").attr("data-screen-name"));
		//Get Old Twitter Message
		chrome.extension.sendMessage({app:"getoldtwitter"}, function(response) {
			OldTwitterValue = response.result;
			
				if (username == '')
				{
					if (OldTwitterValue == 0)
					{
						chrome.extension.sendMessage({app:"setoldtwitter"}, function(response) {});
						var result = confirm("[Attention] Twitter Extender Extension will not function well on the old twitter. Click OK to download the old version of the extension or Disable the extension from the Extensions Page");
						
						if (result)
							window.location = 'https://sites.google.com/site/kmusaied/my-chrome-extensions/TwitterExtender-old-Twitter.crx';
					}
				}
		});
		
		

		//to show the icons before the interval
		$(document).ready(function(){setNewActions()});
		
		//start timer
		setInterval("setNewActions()",3500);
		
		//Run Mentions Notification
		function mentionsChecker(){
		
			console.log("Start Checking for mentions!");
			chrome.extension.sendMessage({app:"men",username:username}, function(response) {});
		}
		
		
		var running = false;
		function setNewActions()
		{
			if (running)
				return false;
				
			running = true;
			$(".content-main").css("width","532px");
			
			if ($("#favorites-link").length < 1){
				//favoritiesLink = favoritiesLink.replace("*USERNAME*",username);
				$(".dashboard .stats").append(favoritiesLink);
				//$(".new-followers-activity").parent().append(retweetLink);
				//$(".new-followers-activity").parent().append(splitter);
				//$(".stream-tab-mentions a").append("<span id='newMCount'></span>");
			}
		
			if ($("#hideMentions").length==0){
				
				//$(".header-inner").append(' - <small> <a id="hideMentions" href="#">Hide Mentions</a></small>');
				$("#hideMentions").click(function(){ 
				
					if ($("#hm").val() == '0')
					{
						$("#hm").val("1");
						$("#hideMentions").text("Show Mentions");
					}else{
						$("#hm").val("0")
						$("#hideMentions").text("Hide Mentions");
					}
				
				});
			}
			else{
				hideMensions = $("#hm").val();
			}
			
			
			
			$(statusBoxID).unbind("keyup.LTS");
			$(statusBoxID).bind("keyup.LTS",function(){
				
				if (parseInt($(this).parent().parent().parent().find(".tweet-counter").text()) < 0)
				{
				
					if ($(".LongTweetSplitter").length == 0)
						$(".tweet-button-container").append("<a href='#' title='Tweet via LongTweetSplitter' class='btn LongTweetSplitter'>Tweet via LTS</a>");
				}
				else
				{
					if ($(".LongTweetSplitter").length > 0)
						$(".LongTweetSplitter").remove();
				}
			});
			
			
		
		if ($("#btnLink").length == 0)
			$(".geo-control").append(addLinkTag);
			
		$("#btnLink").unbind()
		$("#btnLink").bind("click",function()
		{
			 var longUrl = prompt("Enter the URL you want to shorten:","");
			 //alert(longUrl);
			 if (longUrl == null)
				return false;
			 $("#loader").show();
			 chrome.extension.sendMessage({app:"twt",url:longUrl}, function(response) {
				$("#loader").hide();
				var tweetBox = $(statusBoxID);
				tweetBox.val(tweetBox.val() + response.result);
			});
			 return false;
		});			
		
		
		$(".LongTweetSplitter").unbind();
		$(".LongTweetSplitter").bind("click",function(){ 
			window.open("http://longtweetsplitter.com/bookmarklet?longtweet="+escape($(this).parent().parent().parent().find(statusBoxID).val()),"_newtab");
		});
		
		$("a[data-component-term='connect_nav']").unbind();
		$("a[data-component-term='connect_nav']").click(function(){
			$("#newMCount").empty();
			chrome.extension.sendMessage({app:"UpdateLastID",username:username}, function(response) {});
			chrome.extension.sendMessage({app:"ha"}, function(response) {});

		})
		
	
			var mainTweet;
			$("#page-container div .tweet").each(function(){
					mainTweet = $(this);
					//Igonre Latest tweet on the right box
					if (mainTweet.hasClass("latest-tweet"))
						return true;
						
					if ($(".profile-actions-container").length > 0){
						if (hideMensions == '1')
						{ 
							if (mainTweet.find(".extra-icons .reply-icon").length > 0)
							{
								mainTweet.parent().fadeOut('slow');
							}
						}
						else{
							if (mainTweet.find(".extra-icons .reply-icon").length > 0)
							{
								mainTweet.parent().fadeIn();
							}
						}
					}
					else
					{
							hideMensions = '0';
							$("#hm").val("0"); //reset
					}
			
					//alerady done :O) 
					if (mainTweet.hasClass("TE"))
						return true;
					
								
				/*
				Switch Direction Button
				*/
				/*
				if (autoSwitch != "2"){	
					var reg = /[\u0621-\u064A]+/;
					if ( reg.test(mainTweet.find(".js-tweet-text").text()))
					{
					
						mainTweet.find(".js-actions").append(switchDirTag);
						$(".Swich-dir-link").unbind();
						$(".Swich-dir-link").bind("click",
							function(){
								var tweet = $(this).parent().parent().parent().parent().parent();
								if (tweet.find(".js-tweet-text").css("direction") != "rtl"){
										tweet.find(".js-tweet-text").css("direction","rtl");
										tweet.find(".js-tweet-text").css("text-align","right");
								}else
								{
									tweet.find(".js-tweet-text").css("direction","ltr");
										tweet.find(".js-tweet-text").css("text-align","left");
								}
								return false;
						});
						
						if (autoSwitch == "1")
							mainTweet.find(".Swich-dir-link").click();
						}
				
				}//end if 
				
				*/
				
				/*
				Translate Button
				*/
				if (MyLang != "-1"){
						
						mainTweet.find(".js-actions").append(trnsTag);
						//console.log(trnsTag);
						$(".tr-link").unbind();
						$(".tr-link").bind("click",
							function(){
							
								var tweet =  $(this).parent().parent().parent().parent().parent().find(".js-tweet-text");
								//alert(tweet.text());
								var tweetext = tweet.text();
								
								//restore untranslated tweet in the second click
								if (tweet.data("tweet")!=null)
								{
									tweet.html(tweet.data("tweet"));
									tweet.data("tweet",null)
									return false;
								}
								
								chrome.extension.sendMessage({app:"tr",tweet:tweetext}, function(response) {
									tweet.data("tweet",tweet.html());
									tweet.text(response.result);
								});
								return false;
						});
						
				}
				
				mainTweet.parent().find(".js-view-details").text("");
				
				//highlight user mentions
				if ($(".stream-title").text().indexOf("@mentions")<0){
					if (mainTweet.find(".js-tweet-text").text().toLowerCase().indexOf(username.toLowerCase())>=0)
					{
						mainTweet.parent().css("background-color",highlightColor); 
					}
				}
				
				
				
				mainTweet.addClass("TE");
				
			});
			
			
			
				
				
			running = false;
		}	
			
		
		
		
		
			
		
		function RTCode()
		{
			var statusBoxID = ".twitter-anywhere-tweet-box-editor:last";
			var RTTag = '<li class="action-old-retweet-container old-Retweet-link"><a class="with-icn" href="#" title="Old Retweet (Share)"> <i class="action-rt"></i><b>RT</b></a> </li>';
			var DMTag = '<li class="action-dm-container DM-link"><a class="with-icn" href="#" title="Quick Direct Message"> <i class="action-reply"></i><b>DM</b></a> </li>';
			
			var username = jQuery.trim($("#screen-name:first").text());
			
			$(".js-stream-item").live('mouseover',function(){
					
					if ($(this).find(".old-Retweet-link").length == 0 ){
						$(this).find(".js-actions").append(RTTag).find(".old-Retweet-link").click(
							function(){
								var tweet = $(this).parent().parent().parent().parent().parent();
								var screenName = tweet.find(".username:first").text();
								if (screenName == "")
									screenName = $(".username:first").text().replace("@","");
								
								var tweetext = "RT "+ screenName +": "+ formatTweet(tweet.find(".js-tweet-text:first"));
								var tweetId = tweet.attr("data-item-id");
								$("#global-new-tweet-button").click();
								$("#tweet-box-global").html(tweetext);
								
								 /*new twttr.widget.TweetDialog({
									template:{title:"Old School Retweet"},
									modal: true,
									draggable: true,
									defaultContent: tweetext,
									origin: "new-tweet-titlebar-button"
								}).open().focus();*/
								return false;
							});
						
						
						$(this).find(".js-actions").append(DMTag).find(".DM-link").click(
							function(){
								var tweet = $(this).parent().parent().parent().parent().parent();
								var screenName = tweet.find(".username:first").text().replace("@","");
								if (screenName == "")
									screenName = $(".username:first").text().replace("@","");
								var tweetext = "DM "+ screenName;
								
								$(".nav-tweet").click();
								$("#tweet-box-global").html(tweetext);
								
								/*new twttr.widget.TweetDialog({
									template:{title:"Quick Direct Message to "+screenName},
									modal: true,
									draggable: true,
									defaultContent: tweetext,
									origin: "new-tweet-titlebar-button"
								}).open().focus();*/
								
								return false;
							});
					
				}
			});
			
			
			function formatTweet(element) {
				myElement = element.clone();
				myElement.find('.twitter-timeline-link').each(function() {
					$(this).text($(this).attr('href'));
				});
				myElement.find('.peerindex').remove();
				return myElement.text().replace(/\n/g, ' ').replace(/ +(?= )/g,'');
			}
			
			function speak2tweet(tweet)
			{
				$(statusBoxID).val(tweet);
			}
		
			
		
		}
		
	
			$(document).ready(function() {
			var node = document.createElement('script');
			var toInject = "("+RTCode.toString()+")();";
			
			node.innerText = toInject ;
			document.querySelector('body').appendChild(node);
			});
	
	
		
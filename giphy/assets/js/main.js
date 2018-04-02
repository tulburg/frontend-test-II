var config = {
	apiKey: "7809hTWMc8iljBlAQh61sQ9mdkD0ngEC",
	domain: "https://api.giphy.com"
}
$(document).ready(function() {
	$("#send").click(function(){
		send($("#message-edit").val());
	});
	$("#message-edit").on("keypress", function(e){
		if(e.keyCode == 13) {
			send($("#message-edit").val());
			return false;
		}
	});
});
function send(msg){
	if(msg.match("/giphy")) {
		fetchGIF(msg.replace("/giphy "));
	}else {
		insertMessage(msg, 0);
	}
}
function fetchGIF(query) {
	console.log(query);
	$.ajax({
		url: config.domain + "/v1/gifs/translate",
		dataType: "json",
		type: "GET",
		data: {api_key: config.apiKey, s: query},
		success: function(x, xhr) {
			if(x.data.length < 1){
				alert("Gif not found\ntry again with a different keyword");
			}else {
				insertMessage(x.data, 1);
			}
		},
		error: function(x, xhr) {
			console.log(x, xhr);
		}
	});
}

function insertMessage(message, type) {
	// type: 1 - giphy, 0 - message, 2 - captionable
	if(type == 1) {
		$message = $("<div class='message-right'></div>").append("<div class='message giphy'><img src=\""+message.images.downsized.url+"\" alt=\""+message.title+"\"/></div>");
	}else if(type == 0) {
		$message = $("<div class='message-right'></div>").append("<div class='message'>"+message+"</div>");
	}
	$("#message-edit").val("");
	$(".messages").append($message);
	setTimeout(function(){
		$(".timeline").animate({ scrollTop: $(document).height() }, 1000);
	}, 1000);
}
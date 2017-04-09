$(document).ready(function(){
	initialFunction();
});

var globalVar;
function initialFunction() {
    let DataFetchCommand;
    $("#buttonSearchID").click(function(){
        $(".dimScreen").show();
        $("#headerID").hide();
        let webURL = document.getElementById("textSearchInput").value;
        let newWebURL = webURL.split("?v=")[1];
        DataFetchCommand = newWebURL.split("&")[0];
		globalVar = DataFetchCommand;
        sendHackVideoURL(DataFetchCommand);
    });
}

function sendHackVideoURL(DataFetchCommand) {
$(".dimScreen").hide();
$("#headerID").hide();
  $.ajax({
      type: 'get',
      dataType: 'text',
      url: 'api/url',
      async: false,
      data: {
        "cmd" : DataFetchCommand
      },
      success: function (result, status) {
			$(".dimScreen").show();
			$("#headerID").hide();
			getIndividualVideo(JSON.parse(result));
			getTopIndividualVideos(JSON.parse(result));
			getDataJSON(JSON.parse(result));
      },
      error: function(res) {
          $(".dimScreen").hide();
          $("#headerID").show();
          alert("Server Error:" + res.responseText + ".\nError occurred while retrieving values for the search Tab.");
      }
    }
  );
}

function getIndividualVideo(result) {
	var myID = $('#IndividualResults');

	var VideoElement = document.createElement("iframe");
	VideoElement.setAttribute("class", "IndividualframeVideo");
	VideoElement.setAttribute("src", "https://www.youtube.com/embed/" + globalVar);
	
	var total = 0;
	for(var iCount = 0, jCount = 0; iCount < result.topCommentUsers.length; iCount++) {
		total = total + result.topCommentUsers[iCount].badWords;
	}
	
	var divElement = document.createElement("div");
	divElement.setAttribute("class", "BlackText UpperText UnderLine");
	divElement.textContent = "Requested Analytics and it's BWS is " + total;

	var smalldivElement = document.createElement("div");
	smalldivElement.setAttribute("class", "smalldivElement");
	smalldivElement.textContent = "**BWS (Bad Words Score) - parameter which indicates the quantity of obscene comments for the video";

	myID.append(VideoElement);
	myID.append(divElement);
	myID.append(smalldivElement);
	
	result.topCommentUsers.sort(function(a, b) {
		return parseFloat(b.badWords) - parseFloat(a.badWords);
	});	

	var newElement = document.createElement("div");
	newElement.setAttribute("class", "BorderStyle DisplayInline OuterIndividualsLength");	
	for(var iCount = 0, jCount = 0; iCount < result.topCommentUsers.length; iCount++) {
		var profilePicElement = document.createElement("img");
		profilePicElement.setAttribute("class", "UserPicStyleSquare");
		profilePicElement.setAttribute("src", result.topCommentUsers[iCount].profilePic);
		
		var tempAnotherElement = document.createElement("div");
		
		var userNameElement = document.createElement("div");
		userNameElement.setAttribute("class", "BWRUser");
		userNameElement.textContent = result.topCommentUsers[iCount].userName; 		
		
		var RankElement = document.createElement("div");
		RankElement.setAttribute("class", "BWR");
		RankElement.textContent = "BWS: " + result.topCommentUsers[iCount].badWords; 		

		tempAnotherElement.appendChild(profilePicElement);
		tempAnotherElement.appendChild(userNameElement);
		tempAnotherElement.appendChild(RankElement);

		newElement.appendChild(tempAnotherElement);
		
	}
	myID.append(newElement);

}

function getTopIndividualVideos(result) {
	var videoIDs = $('.IndividualVideos');
	for(var iCount = 0, jCount = 0; iCount < result.topVideos.length; iCount++) {
		var newElement = document.createElement("div");
		newElement.setAttribute("class", "EmbedOuterDiv BorderStyle");

		var VideoElement = document.createElement("iframe");
		VideoElement.setAttribute("class", "iframeVideo");
		VideoElement.setAttribute("src", "https://www.youtube.com/embed/" + result.topVideos[iCount].videoId);
		
		var userNameElement = document.createElement("div");
		userNameElement.setAttribute("class", "BWRStyle");
		userNameElement.textContent = "BWS (Bad Words Score " + (iCount + 1) + " ): " + result.topVideos[iCount].rank; 		

		newElement.appendChild(VideoElement);
		newElement.appendChild(userNameElement);
	
		if(jCount === 0) {
			var divElement = document.createElement("div");
			divElement.setAttribute("class", "BlackText UnderLine");
			divElement.textContent = "The top 5 videos which have the most abusive words in total with the present data in our database along with it's BWS";
			jCount++;
			videoIDs.append(divElement);
		}
		
		videoIDs.append(newElement);
	}
}

function getDataJSON(result) {
	var topVideos = $('.TopVideos10');
	for(var iCount = 0, jCount = 0; iCount < result.topUsers.length; iCount++) {
		var newElement = document.createElement("div");
		newElement.setAttribute("class", "outerDiv DisplayInline");

		var tempAnotherElement = document.createElement("div");
		
		var profilePicElement = document.createElement("img");
		profilePicElement.setAttribute("class", "UserPicStyle");
		profilePicElement.setAttribute("src", result.topUsers[iCount].profilePic);

		tempAnotherElement.appendChild(profilePicElement);

		var tempAnotherAgainElement = document.createElement("div");
		tempAnotherAgainElement.setAttribute("class", "DivInsideStyle");
		
		var userNameElement = document.createElement("div");
		userNameElement.setAttribute("class", "userNameStyle");
		userNameElement.textContent = "User: " + result.topUsers[iCount].userName; 
		
		var badWordsElement = document.createElement("div");
		badWordsElement.setAttribute("class", "badWordsStyle");
		badWordsElement.textContent = "Bad Words used: " + result.topUsers[iCount].badWords; 
		
		tempAnotherAgainElement.appendChild(userNameElement);
		tempAnotherAgainElement.appendChild(badWordsElement);
		
		newElement.appendChild(tempAnotherElement);
		newElement.appendChild(tempAnotherAgainElement);

		if(jCount === 0) {
			var divElement = document.createElement("div");
			divElement.setAttribute("id", "divElement");
			divElement.setAttribute("class", "BlackText UnderLine");
			divElement.textContent = "The top 10 users who used the most abusive words on YouTube";
			jCount++;
			topVideos.append(divElement);
		}
		
		topVideos.append(newElement);
	}
	  $(".dimScreen").hide();
	  $("#headerID").hide();
	  $("#Results").show();
	  $("#IndividualResults").show();
}

$( document ).ready(function() {
	responsiveVoice.setDefaultVoice("French Female");
	var transcript = "";
	var oldTranscript = "";
	try {
		var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		var recognition = new SpeechRecognition();
		recognition.lang = 'fr-FR';
		recognition.interimResults = false;
		}
		catch(e) {
			console.error(e);
			$('.no-browser-support').show();
			$('.app').hide();
		}

	console.log(recognition)


	recognition.onresult = function(event) {
		var current = event.resultIndex;
  		var transcript = event.results[current][0].transcript;
  		var response = parse(transcript, state);
  		switch(state) {
			case 0:
				state = 1
				break;
			case 1:
				state = 2
				break;
			default:
				state = 0
		};
  		responsiveVoice.speak(response);
	}


	var state = 0;

	var text = 	'{ "keywords" : [' + //add more keywords
					'{ "root":"facture" , "syn":["factures","fact"] },' +
					'{ "root":"impayé" , "syn":["pas payée", "impayées"] },' +
					'{ "root":"juillet" , "syn":[] } ]}';

	var obj = JSON.parse(text);
	console.log(obj);
	$("#bot").on("click",function(){
		console.log(state);
		recognition.start();
	});
});

function parse(audio, state) {
	return audio;
}


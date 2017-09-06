$( document ).ready(function() {
	responsiveVoice.setDefaultVoice("French Female");
	
	try {
		var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		var recognition = new SpeechRecognition();
		recognition.lang = 'fr-FR';
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
		console.log(transcript)
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
		switch(state) {
		case 0:
			recognition.start();
			//responsiveVoice.speak("Vous avez trois factures impayée pour le mois de juillet");
			state = 0
			break;
		case 1:
			//responsiveVoice.speak("votre chat est un chien");
			state = 2
			break;
		default:
			//responsiveVoice.speak("bonjour");
			state = 0
	};
	});

	

});


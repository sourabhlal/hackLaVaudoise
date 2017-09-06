$( document ).ready(function() {
	responsiveVoice.setDefaultVoice("French Female");
	
	try {
		var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		var recognition = new SpeechRecognition();
		}
		catch(e) {
			console.error(e);
			$('.no-browser-support').show();
			$('.app').hide();
		}

	console.log(recognition)

	recognition.onstart = function() { 
		instructions.text('Voice recognition activated. Try speaking into the microphone.');
	}

	recognition.onspeechend = function() {
		instructions.text('You were quiet for a while so voice recognition turned itself off.');
	}

	recognition.onerror = function(event) {
		if(event.error == 'no-speech') {
			instructions.text('No speech was detected. Try again.');  
		};
	}
	recognition.onresult = function(event) {
		var current = event.resultIndex;
  		var transcript = event.results[current][0].transcript;
		noteContent += transcript;
		noteTextarea.val(noteContent);

		console.log(current)
		console.log(transcript)
		console.log(noteContent)
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


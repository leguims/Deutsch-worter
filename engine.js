/**
 * Model and controller for the Deutsch wörter web app
 *
 * @author Ilya Ilyankou - Guillaume Rousselot (french translation)
 * @version 0.9
 */

var index = 0; // index of word in dictionary
var form = 0;  // first, local (0 or 1 respectively)
var show = 0;  // first, local (0 or 1 respectively)
var correct = 0; // counter of correct answers
var altogether = 0;  // counter of all attempts
var inputTag = '<input type="text" id="myInput" autocomplete="off">';
var level = "";
var timerOk = 0; // Timer to freeze display if answer is OK
var timerKo = 0; // Timer to freeze display if answer is KO

// Initializing the dictionary
var dict =
[
    ['der Stadtplane', 'le plan de la ville'],
    ['die StraBe (n)', 'la rue'],
    ['der Platz (¨e)', 'la place'],
    ['das Rathaus (¨er)', 'la mairie'],
    ['der Dom (e)', 'la cathédrale'],
    ['die Bank (en)', 'la banque'],
    ['das Museum (die Museen)', 'le musée'],
    ['das Geschäft (e)', 'le magasin'],
    ['das Kaufhaus (¨er)', 'le grand magasin'],
    ['das Einkaufzzenerum (en)', 'le centre commercial'],
    ['das Wochhaus (¨er)', 'la maison haute'],
    ['das Hochhaus (¨er)', 'la tour'],
    ['der Volkenkratzen (-)', 'le gratte-ciel'],
    ['der Flughafen (¨)', 'l\'aéroport'],
    ['in die Innenstadt', 'le centre ville'],
    ['in die FuBgangerzonen', 'le terrain de football'],
    ['in die EinkaufsstraBe', 'la rue des pecheurs'],
    ['links/rechts', 'gauche/droite'],
    ['geraudaus', '???'],
    ['multiqulturell', 'multi-culturel'],
    ['shoppen gehen', 'faire du shopping'],
    ['kaufen gehen', 'aller acheter'],
    ['spazieren gehen', 'se promener'],
    ['joggen', 'faire du jogging'],
    ['Rad fahren', 'faire du vélo'],
    ['besichtigen', 'visiter'],
    ['groB/klein', 'grand/petit'],
    ['eine GroBestadt/eine kleinstadt', 'une grande ville/une petite ville'],
    ['bekannt/unbekannt', 'connu/inconnu'],
    ['schön/nicht so schön', 'beau/pas très beau'],
    ['alt/modern', 'vieux/moderne'],
    ['ruhig/laut', 'calme/bruyant'],
    ['grün', 'vert'],
    ['in Stadtzentrum', 'le centre de la ville'],
];

function generateWord() {
  hideAnswer();

    index = Math.floor(Math.random() * dict.length);
    form = Math.floor(Math.random() * 2); // Local or first
    
  var entry = dict[index];

  $('#first').text(entry[0]);
  $('#local').text(entry[1]);

  switch (form) {
    case 0:
      $('#first').html(inputTag);
      break;
    default:
    $('#local').html(inputTag);
  }
    $('#myInput').focus();
}


function checkWord() {
    var myInput = $("#myInput").val().trim().toLowerCase();
  myInput = '$' + myInput + '$';

  var correctInput = '$' + dict[index][form].replace('/', '$') + '$';
  var timer = 0;

  if (correctInput.indexOf(myInput) > -1) {
    correct++;
    $("#myInput").css({backgroundColor: 'YellowGreen'});
    timer = timerOk;
  } else {
    $('#myInput').css({backgroundColor: 'DarkSalmon'});
    showAnswer();
    timer = timerKo;
  }

  setTimeout(generateWord, timer);

  updateCounters();
}

function updateCounters() {
  $('#counterCorrect').text(correct);
  $('#counterAltogether').text(altogether);
}

function showAnswer() {
  $('#answer').text(dict[index][form]).show();
}

function hideAnswer() {
  $('#answer').hide();
}

$(document).ready(function() {
    timerOk = 1500;
    timerKo = 3000;

    generateWord();

    $("form").submit(function () {
    altogether++;
        if ($("#myInput").attr("value") == "") {return false;}
        $("#myInput").attr({disabled: 'disabled'});
        checkWord();
        return false;
    });
});

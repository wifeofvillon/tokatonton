const wovCookieKey = "wovbunalsc";
const wovCookieProp = {expires:wovExpires};
const wovCookieInit = {
  "last": master.character[0].id,
  "character": [
    {"id": master.character[0].id, "score": 0},
    {"id": master.character[0].id, "score": 0},
    {"id": master.character[0].id, "score": 0}
  ]
};

$(document).ready(function(){
  $('select').material_select();

  // TODO: read cookie
  var scc = new SCCookie(wovCookieKey, wovCookieProp);
  var cookieVal = scc.read();
  if(typeof(cookieVal) == "undefined"){
    scc.write(wovCookieInit);
    cookieVal = wovCookieInit;
  }
  var pc = new ParseCookie(cookieVal);

  // parse master data
  var pm = new ParseMaster(pc.getLastId);
  var chara = pm.getCharacter();
  chara.score = pc.getScore(pc.getLastId);
  console.log(chara);

  // rewrite character name
  $('h2.header').text(chara.name);

  // set total number
  var scoreString = ('000' + chara.score).slice(-4);
  $('.total-score select option').removeAttr('selected');
  $('#total-4 option:eq(' + scoreString.slice(0,1) + ')').attr('selected', 'selected');
  $('#total-3 option:eq(' + scoreString.slice(1,2) + ')').attr('selected', 'selected');
  $('#total-2 option:eq(' + scoreString.slice(2,3) + ')').attr('selected', 'selected');
  $('#total-1 option:eq(' + scoreString.slice(3,4) + ')').attr('selected', 'selected');

  // rewrite graph
  var sortedReward = pm.sortReward(chara);
  var graph = new Chart($('#graph'), {
    type: 'horizontalBar',
    data: {
      labels: sortedReward.label,
      datasets: [{
        data: sortedReward.data,
        backgroundColor: sortedReward.bgColor
      }]
    },
    options: graphOption
  });
});

/**
 * Class ControllMainView
 * @const pm - ParseMaster
 */
var ControllMainView = function(pm){


};

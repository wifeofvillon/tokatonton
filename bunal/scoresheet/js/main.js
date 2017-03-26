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
  // <canvas />
  var canvasObj = $('#graph');

  $('select').material_select();

  // main view controller
  var cmv = new ControllMainView();

  // read cookie
  var scc = new SCCookie(wovCookieKey, wovCookieProp);
  var cookieVal = scc.read();
  // first access
  if(typeof(cookieVal) == "undefined"){
    scc.write(wovCookieInit);
    cookieVal = wovCookieInit;
  }
  // parse cookie data
  var pc = new ParseCookie(cookieVal);
  var charaId = pc.getLastId();
  var charaScore = pc.getScore(charaId);

  // parse master data
  var pm = new ParseMaster(charaId);
  var chara = pm.getCharacter();
  chara.score = charaScore;

  // set character id
  if(!cmv.setCharaId(charaId)){
    console.error('I cannot set ID');
  }

  // rewrite character name
  if(!cmv.setCharaName(chara.name)){
    console.error('I cannot get name.')
  }

  // set selectbox
  if(!cmv.setSelectBox(charaScore)){
    console.error('I cannot get score.');
  }

  // rewrite graph
console.info(chara);
  var sortedReward = pm.sortReward(chara);
console.info(sortedReward);
  if(!cmv.drawGraph(canvasObj, sortedReward, graphOption)){
    console.error('I cannot draw graph.');
  }

  // add score
  $('#add-button').click(function(){
    var addScore = cmv.getScore('point');
    var totalScore = cmv.getScore('total');
    totalScore = totalScore + addScore;
    if(!cmv.setSelectBox(totalScore)){
      console.error('I cannot get score.');
    }
  });

  // change total score
  $('#select-total select').change(function(){
    console.log('select changed.');
    // get total score
    var totalScore = cmv.getScore('total');
    // set new cookie
    if(!cmv.setNewCookieVal(scc, $('#charaId').val(), totalScore)){
      console.error('I cannot set new cookie.');
    }
    chara.score = totalScore;
    sortedReward = pm.sortReward(chara);
    if(!cmv.drawGraph(canvasObj, sortedReward, graphOption)){
      console.error('I cannot redraw graph.');
    }
  });
});

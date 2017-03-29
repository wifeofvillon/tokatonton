const wovCookieKey = "wovbunalsc";
const wovCookieProp = {expires:wovExpires};
const wovCookieInit = {
  "last": master.character[0].id,
  "character": [
    {"id": master.character[0].id, "score": 0},
    {"id": master.character[1].id, "score": 0},
    {"id": master.character[2].id, "score": 0}
  ]
};
const wovCanvasObj = $('#graph');

var cmv; // Instance: ControllMainView
var scc; // Instance: SCCookie
var pc; // Instance: ParseCookie
var pm; // Instance: ParseMaster
var cookieVal; // json
var charaId; // Number: Character ID
var charaScore; // Number: Character score
var chara; // json
var sortedReward; // json
var graph; // Instance:Chart

$(document).ready(function(){
  // activate selectbox
  $('select').material_select();
  // activate sidebar
  $('.button-collapse').sideNav();
  // activate tips
  $('.chips').material_chip();

  // main view controller
  cmv = new ControllMainView();

  // read cookie
  scc = new SCCookie(wovCookieKey, wovCookieProp);
  cookieVal = scc.read();
  // first access
  if(typeof(cookieVal) == "undefined"){
    scc.write(wovCookieInit);
    cookieVal = wovCookieInit;
  }

  // parse cookie data
  pc = new ParseCookie(cookieVal);
  charaId = pc.getLastId();
  charaScore = pc.getScore(charaId);

  // controll tab
  cmv.controllTab(charaId);

  // parse master data
  pm = new ParseMaster(charaId);
  chara = pm.getCharacter();
  if(chara.error){
    console.error(chara.error);
  }
  chara.score = charaScore;

  // set character id
  if(!cmv.setCharaId(charaId)){
    console.error('I cannot set ID');
  }

  // initialize character name
  if(!cmv.setCharaName(chara.name)){
    console.error('I cannot get name.')
  }

  // initialize selectbox
  if(!cmv.setSelectBox(charaScore)){
    console.error('I cannot get score.');
  }

  // initialize graph
  sortedReward = pm.sortReward(chara);
  graph = cmv.drawGraph(wovCanvasObj, sortedReward, graphOption);
  if(graph.error){
    console.error(graph.error);
  }

  // TODO: view history automatically
  cmv.viewHistory();

  // nav version chips
  $('nav div.chip:eq(0)').text('var.' + appHistory[appHistory.length - 1].version);

  // add score
  $('#add-button').click(function(){
    var addScore = cmv.getScore('point');
    var totalScore = cmv.getScore('total');
    totalScore = totalScore + addScore;
    if(!cmv.setSelectBox(totalScore)){
      console.error('I cannot get score.');
    }
    // set new cookie
    if(!cmv.setNewCookieVal(scc, $('#charaId').val(), totalScore)){
      console.error('I cannot set new cookie.');
    }
    chara.score = totalScore;
    sortedReward = pm.sortReward(chara);
    // destroy old graph
    graph = cmv.destroyGraph(graph);
    // draw new graph
    graph = cmv.drawGraph(wovCanvasObj, sortedReward, graphOption);
    // graph = cmv.updateGraph(graph, sortedReward);
    if(graph.error){
      console.error(graph.error);
    }
  });

  // change total score
  $('#select-total select').change(function(){
    // get total score
    var totalScore = cmv.getScore('total');
    // set new cookie
    if(!cmv.setNewCookieVal(scc, $('#charaId').val(), totalScore)){
      console.error('I cannot set new cookie.');
    }
    chara.score = totalScore;
    sortedReward = pm.sortReward(chara);
    // destroy old graph
    graph = cmv.destroyGraph(graph);
    // draw new graph
    graph = cmv.drawGraph(wovCanvasObj, sortedReward, graphOption);
    // graph = cmv.updateGraph(graph, sortedReward);
    if(graph.error){
      console.error(graph.error);
    }
  });

  // change tab
  $('.tab a').not('.active').click(function(event){
    // get new cookie
    charaId = event.target.id.slice(-2);

    // controll tab
    cmv.controllTab(charaId);

    // rewrite cookie
    cookieVal = scc.read();
    cookieVal.last = charaId;
    scc.write(cookieVal);

    // parse cookie data
    pc = new ParseCookie(cookieVal);
    charaScore = pc.getScore(charaId);

    // parse master data
    pm = new ParseMaster(charaId);
    chara = pm.getCharacter();
    if(chara.error){
      console.error(chara.error);
    }
    chara.score = charaScore;

    // set character id
    if(!cmv.setCharaId(charaId)){
      console.error('I cannot set ID');
    }

    // initialize character name
    if(!cmv.setCharaName(chara.name)){
      console.error('I cannot get name.')
    }

    // set selectbox
    if(!cmv.setSelectBox(charaScore)){
      console.error('I cannot get score.');
    }

    // rewrite graph
    sortedReward = pm.sortReward(chara);
    // destroy old graph
    graph = cmv.destroyGraph(graph);
    // draw new graph
    graph = cmv.drawGraph(wovCanvasObj, sortedReward, graphOption);
    // graph = cmv.updateGraph(graph, sortedReward);
    if(graph.error){
      console.error(graph.error);
    }
  });

  $('.reset-cookie').click(function(){
    scc.remove(wovCookieKey);
    console.info($.cookie(wovCookieKey));
    scc.write(wovCookieInit);
    console.info($.cookie(wovCookieKey));
    location.reload();
  });
});

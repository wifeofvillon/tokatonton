const wovCookieKey = "wovbunalsc";
const wovCookieProp = {expires:wovExpires};
const wovCookieInit = {
  "last": master.character[0].id,
  "character": [
    {"id": master.character[0].id, "score": 0},
    {"id": master.character[1].id, "score": 0},
    {"id": master.character[2].id, "score": 0}
  ],
  "version": appHistory[0].version.slice(0,1)
};
const wovCanvasObj = $('#graph');
const wovScreenWidth = 601;
const wovCanvasHeight = 990;

let cmv; // Instance: ControllMainView
let scc; // Instance: SCCookie
let pc; // Instance: ParseCookie
let pm; // Instance: ParseMaster
let cookieVal; // json
let charaId; // Number: Character ID
let charaScore; // Number: Character score
let chara; // json
let sortedReward; // json
let graph; // Instance:Chart

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
  if(typeof(cookieVal) == "undefined"
    || typeof(cookieVal.version) == "undefined"
    || cookieVal.version != appHistory[0].version.slice(0,1)){
      console.warn('Cookie data is old version.');
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

  // view history automatically
  cmv.viewHistory();

  // nav version chips
  var lastHistory = appHistory[0];
  $('nav div.chip:eq(0),nav div.chip:eq(2)').text('var.' + lastHistory.version);
  $('nav div.chip:eq(1),nav div.chip:eq(3)').text(lastHistory.date + ' updated')

  // add score
  $('#add-button').click(function(){
    var addScore = cmv.getScore('point');
    var totalScore = cmv.getScore('total');
    // cat-paw(nomal)
    if($('div.cat-normal div.switch input:checkbox:checked').length == 1) addScore = addScore * 2;
    // cat-paw(gold)
    if($('div.cat-gold div.switch input:checkbox:checked').length == 1) addScore = addScore * 3;
    // add 'addScore' to 'totalScore'
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
    charaId = event.target.id.replace('chara-', '');

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

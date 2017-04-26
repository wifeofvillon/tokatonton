let wc; // Instance:WovCookie
let cookieVal;
let score = new Number();
let pm; // Instance:ParseMaster
let sortedReward;
let vg; // Instance:ViewGraph

$(document).ready(function(){
  // activate selectbox
  $('select').material_select();
  // activate sidebar
  $('.button-collapse').sideNav();
  // activate tips
  $('.chips').material_chip();

  // add Headding
  View.setHeadding(wovBookTitle);

  // view history automatically
  View.viewHistory();

  // nav version chips
  var lastHistory = appHistory[0];
  $('nav div.chip:eq(0),nav div.chip:eq(2)').text('var.' + lastHistory.version);
  $('nav div.chip:eq(1),nav div.chip:eq(3)').text(lastHistory.date + ' updated')

  // read cookie
  wc = new WovCookie(wovCookieKey, wovCookieProp);
  cookieVal = wc.read();
  // first access
  if(typeof(cookieVal) == "undefined"){
    wc.write(wovCookieInit);
    cookieVal = wovCookieInit;
  }

  // get score from cookieVal
  score = cookieVal.collected;

  // initialize selectbox
  if(!View.setTotalScore(score)){
    console.error('I cannot get score.');
  }

  // parse master data
  pm = new ParseMaster();
  sortedReward = pm.sortReward(score);

  // initialize graph
  vg = new ViewGraph();
  graph = vg.draw(sortedReward);
  if(graph.error){
    console.error(graph.error);
  }

  // add score
  $('#add-button').click(function(){
    let addScore = View.getScore(wovAddDigit, 'point');
    var totalScore = View.getScore(wovTotalDigit, 'total');
    // cat-paw(nomal)
    if($('div.cat-normal div.switch input:checkbox:checked').length == 1) addScore = addScore * 2;
    // cat-paw(gold)
    if($('div.cat-gold div.switch input:checkbox:checked').length == 1) addScore = addScore * 3;
    // add 'addScore' to 'totalScore'
    totalScore = totalScore + addScore;
    if(!View.setTotalScore(totalScore)){
      console.error('I cannot get score.');
    }
    // set new cookie
    if(!wc.write({"collected": totalScore})){
      console.error('I cannot set new cookie.');
    }
    sortedReward = pm.sortReward(totalScore);
    // destroy old graph
    graph = vg.destroy(graph);
    // draw new graph
    graph = vg.draw(sortedReward);
    if(graph.error){
      console.error(graph.error);
    }
  });

  // change total score
  $('#select-total select').change(function(){
    // get total score
    var totalScore = View.getScore(wovTotalDigit, 'total');
    // set new cookie
    if(!wc.write({"collected": totalScore})){
      console.error('I cannot set new cookie.');
    }
    sortedReward = pm.sortReward(totalScore);
    // destroy old graph
    graph = vg.destroy(graph);
    // draw new graph
    graph = vg.draw(sortedReward);
    if(graph.error){
      console.error(graph.error);
    }
  });

  $('.reset-cookie').click(function(){
    wc.remove(wovCookieKey);
    wc.write(wovCookieInit);
    location.reload();
  });
});

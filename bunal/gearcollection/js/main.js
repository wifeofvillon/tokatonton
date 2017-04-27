let wc; // Instance:WovCookie
let cookieVal;
let score = new Number();
let pm; // Instance:ParseMaster
let sortedReward;
let vg; // Instance:ViewGraph
let graph;

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
  let lastHistory = appHistory[0];
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
    main('add');
  });

  // change total score
  $('#select-total select').change(function(){
    main('total');
  });

  // add 1k point
  $('#k-button').click(function(){
    main('1k');
  });

  // tweet button
  $('#tweet-button').click(function(){
    let tweetScore = wc.read().collected;
    let tweetUrl = getTweetUrl(tweetScore);
    window.open(tweetUrl, '_blank', 'width=550,height=474');
  });

  $('.reset-cookie').click(function(){
    wc.remove(wovCookieKey);
    wc.write(wovCookieInit);
    location.reload();
  });
});

function main(flag) {
  // get add score
  let addScore;
  if (flag == 'add') {
    addScore = View.getScore(wovAddDigit,'point');

    // cat-paw(nomal)
    if($('div.cat-normal div.switch input:checkbox:checked').length == 1) addScore = addScore * 2;
    // cat-paw(gold)
    if($('div.cat-gold div.switch input:checkbox:checked').length == 1) addScore = addScore * 3;
  } else if (flag == '1k') {
    addScore = 1000;
  }

  // get total score
  let totalScore = View.getScore(wovTotalDigit, 'total');

  // totalScore + addScore
  if (flag == 'add' || flag == '1k') {
    totalScore = totalScore + addScore;

    if(!View.setTotalScore(totalScore)){
      console.error('I cannot get score.');
    }
  }

  // set new cookieVal
  if(!wc.write({"collected": totalScore})){
    console.error('I cannot set new cookie.');
  }

  // get labels from master
  sortedReward = pm.sortReward(totalScore);

  // destroy and draw graph
  graph = vg.destroy(graph);
  graph = vg.draw(sortedReward);
  if(graph.error){
    console.error(graph.error);
  }
}

function getTweetUrl(score) {
  return "https://twitter.com/intent/tweet?text=%e3%80%8c%e5%a4%aa%e9%99%bd%e3%81%ae%e3%81%aa%e3%81%84%e8%a1%97%e3%80%8d%e3%81%8b%e3%82%89" + score + "%e5%80%8b%e3%81%ae%e6%ad%aa%e3%81%aa%e6%ad%af%e8%bb%8a%e3%82%92%e5%9b%9e%e5%8f%8e%e3%81%97%e3%81%be%e3%81%97%e3%81%9f%e3%80%82%20%23%e6%96%87%e3%82%a2%e3%83%ab%e3%82%a4%e3%83%99%e3%83%b3%e3%83%88&url=https://wifeofvillon.github.io/tokatonton/bunal/gearcollection/";
}

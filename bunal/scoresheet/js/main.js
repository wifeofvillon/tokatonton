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
    console.error('i cannot set ID');
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
  var sortedReward = pm.sortReward(chara);
  if(!cmv.drawGraph($('#graph'), sortedReward, graphOption)){
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
});

/**
 * Class ControllMainView
 * @const pm - ParseMaster
 */
var ControllMainView = function(){

  /**
   * ControllMainView.setCharaId
   * @param id - Number
   * @return result - Boolean
   */
  this.setCharaId = function(id){
    if(!id) return false;
    $('#charaId').val(id);
    return true;
  };
  /**
   * ControllMainView.setName
   * @param name - String
   * @return result - Boolean
   */
  this.setCharaName = function(name){
    if(name.length == 0) return false;
    $('h2.header').text(name);
    return true;
  };

  /**
   * ControllMainView.setScore
   * @param score - Number
   * @return result - Boolean
   */
  this.setSelectBox = function(score){
    // error check
    if(score < 0) return false;
    // score to string
    var scoreString = ('000' + score).slice(-4);
    // reset selectbox
    $('.total-score select option').removeAttr('selected');
    // select score
    $('#total-4 option:eq(' + scoreString.slice(0,1) + ')').attr('selected', 'selected');
    $('#total-3 option:eq(' + scoreString.slice(1,2) + ')').attr('selected', 'selected');
    $('#total-2 option:eq(' + scoreString.slice(2,3) + ')').attr('selected', 'selected');
    $('#total-1 option:eq(' + scoreString.slice(3,4) + ')').attr('selected', 'selected');
    return true;
  };

  /**
   * ControllMainView.getScore
   * @param prefix - String
   * @return score - Number
   */
  this.getScore = function(prefix){
    // error check
    if(!prefix.length) return -1;
    // get selectbox
    var selectbox = $('#select-' + prefix + ' select');
    if(selectbox.length == 0){
      return false;
    }
    var score = "";
    for (var i = selectbox.length; 0 < i; i--) {
      score = score + $('#select-' + prefix + ' select#' + prefix + '-' + i + ' option:selected').val();
      console.info(score);
    }
    if(score.length == 0) return -1;
    return Number(score);
  };

  /**
   * ControllMainView.drawGraph
   * @param canvas - canvas
   * @param chara - Object
   * @param option - Object
   * @return result - Boolean
   */
  this.drawGraph = function(canvas, reward, option){
    if(!canvas || typeof(reward) == 'undefined' || typeof(option) == 'undefined') return false;

    var graph = new Chart(canvas, {
      type: 'horizontalBar',
      data: {
        labels: reward.label,
        datasets: [{
          data: reward.data,
          backgroundColor: reward.bgColor
        }]
      },
      options: option
    });

    return true;
  };

};

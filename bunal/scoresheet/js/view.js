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

  /**
   * ControllMainView.setNewCookieVal
   * @param scc - SCCookie
   * @param id - Number
   * @param score - Number
   * @return newCookieVal - String
   */
  this.setNewCookieVal = function(scc, id, score){
    var newCookieVal = scc.read();
    // set "last" property
    newCookieVal.last = id;
    // set "score" property
    for (var i = 0; i < newCookieVal.character.length; i++) {
      if(newCookieVal.character[i].id == id){
        newCookieVal.character[i].score = score;
        if(!scc.write(newCookieVal)){
          console.error('I cannot rewrite cookie.');
        }
        return true;
      }
    }
    return false;
  };
};

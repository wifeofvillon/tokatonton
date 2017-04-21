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
   * ControllMainView.getCharaId
   * @return id Number
   */
  this.getCharaId = function(){
    return $('#charaId').val();
  }

  /**
   * ControllMainView.setName
   * @param name - String
   * @return result - Boolean
   */
  this.setCharaName = function(name){
    if(name.length == 0) return false;
    $('section#main h2.header').text(name);
    return true;
  };

  /**
   * setScore
   * @param score {Number} score
   * @return result {Boolean}
   */
  this.setSelectBox = function(score){
    // error check
    if(score < 0) return false;
    // score to string
    var scoreString = ('0000' + score).slice(-5);
    // reset selectbox
    $('.total-score select option').removeAttr('selected');
    $('#total-5 option:eq(' + scoreString.slice(0,1) + ')').prop('selected', true);
    $('#total-4 option:eq(' + scoreString.slice(1,2) + ')').prop('selected', true);
    $('#total-3 option:eq(' + scoreString.slice(2,3) + ')').prop('selected', true);
    $('#total-2 option:eq(' + scoreString.slice(3,4) + ')').prop('selected', true);
    $('#total-1 option:eq(' + scoreString.slice(4,5) + ')').prop('selected', true);
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
    if(!canvas || typeof(reward) == 'undefined' || typeof(option) == 'undefined') return {'error':"It's parameter error."};

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

    return graph;
  };

  /**
   * updateGraph
   * @param graph {Object} - Chart Instance
   * @param reward {Object} - Contain: label, data, bgColor
   * @return graph {Object} - Chart Instance
   */
  this.updateGraph = function(graph, reward){
    graph.labels = reward.label;
    graph.data.datasets[0].data = reward.data;
    graph.data.datasets[0].backgroundColor = reward.bgColor;
    graph.update();
    return graph;
  };

  /**
   * destroyGraph
   * @param graph {Object} - Chart Instance
   */
  this.destroyGraph = function(graph){
    return graph.destroy();
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

  /**
   * controllTab
   * @param id {Number} - Character ID
   */
  this.controllTab = function(id){
    $('.tab a').removeAttr('class', 'active');
    $('#chara-' + id).attr('class', 'active');
  };

  /**
   * viewHistory
   */
  this.viewHistory = function(){
    var historyUl = $('section#history ul.collection');
    if(typeof(appHistory) !== 'object' || appHistory.length == 0){
      historyUl.html('<li class="collection-item">更新履歴はありません</li>');
    } else {
      for (var i = 0; i < appHistory.length; i++) {
        var ahHash = appHistory[i];
        // create appHistory body
        var ahBody = $('<ul></ul>');
        for (var j = 0; j < ahHash.body.length; j++) {
          ahBody.append('<li>' + ahHash.body[j] + '</li>');
        }
        // create appHistory item
        var ahItem = $('<li class="collection-item"><div class="header"><span class="date right">' + ahHash.date + '</span><span class="title">ver.' + ahHash.version + '</span></div></li>');
        ahItem.append(ahBody);
        historyUl.append(ahItem);
      }
    }

    /**
     * getElement
     * @param elem {String} element name
     * @param innerText {String} innnerText
     * @param attr {Array} attributes [{'name':'value'}]
     * @return element {Object} element
     */
    function getElement(elem, innerText = '', attr = []){
      var element = document.createElement(elem);
      element.innerText = innerText;
      element.attributes = attr;
      return element;
    }
  };
};

$(document).ready(function(){
  $('select').material_select();
});

/**
 * Class ParseMaster
 * @const id - Number
 */
var ParseMaster = function(id){
  this.id = id;

  /**
   * ParseMaster.getCharacter
   * @return character - Object
   */
  this.getCharacter = function(){
    for (var i = 0; i < master.character.length; i++) {
      if(master.character[i].id === this.id){
        return master.character[i];
      }
    }
    return {};
  };

  /**
   * ParseMaster.getCharaName
   * @param chara - Object
   * @return name - String
   */
  this.getCharaName = function(chara){
    return chara.name;
  };

  /**
   * ParseMaster.sortReward
   * @param chara - Object
   * @return sortedReward - Object
   */
  this.sortReward = function(chara){
    var score = chara.score;
    var reward = chara.reward;
    var sortedReward = {
      "label":[],
      "data":[],
      "bgColor":[]
    };
    var tmpHash = {
      "label":[],
      "data":[],
      "bgColor":[]
    };

    for (var i = 0; i < reward.length; i++) {
      var r = reward[i];
      var label = getLabel(r.score, r.item);
      var data = 100;
      var bgColor = master.graphfill[3].color;
      if(score < r.score){
        data = getPercentage(score, r.score);
      }
    }

    /**
     * getLabel
     * @param score - Number
     * @param item - String
     * @return label - String
     */
    function getLabel(score, item){
      return item + ' [' + score + '点]';
    }

    /**
     * getPercentage
     * @param score - Number
     * @param itemScore - Number
     * @return percentage - Number
     */
    function getPercentage(score, itemScore){
      return itemScore / score * 100;
    }
  };
};

/**
 * Class ControllMainView
 * @const pm - ParseMaster
 */
var ControllMainView = function(pm){
  this.pm = pm;

};

  var ctx = document.getElementById("graph");
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ["想魂(大)","語魂(大)","島崎藤村第四衣装","文魂(大)"],
      datasets: [{
        data: [84,53,12, 100],
        backgroundColor: [
          '#8bc34a',
          '#ffd54f',
          '#e57373',
          '#4db6ac'
        ]
      }]
    },
    options: graphOption
  });

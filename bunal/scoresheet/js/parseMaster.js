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
    var newHash = {
      "label":[],
      "data":[],
      "bgColor":[]
    };

    for (var i = 0; i < reward.length; i++) {
      var r = reward[i];
      var label = getLabel(r.score, r.item);
      if(score < r.score){
        // Not Achiebved
        sortedReward.label.push(label);
        data = getPercentage(score, r.score);
        sortedReward.data.push(data);
        sortedReward.bgColor.push(getBgColor(data));
      } else {
        // Achieved
        tmpHash.label.push(label);
        tmpHash.data.push(100);
        tmpHash.bgColor.push(master.graphfill[3].color);
      }
    }

    newHash = {
      "label": sortedReward.label.concat(tmpHash.label),
      "data": sortedReward.data.concat(tmpHash.data),
      "bgColor": sortedReward.bgColor.concat(tmpHash.bgColor)
    };

    return newHash;

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
      return (score / itemScore * 100).toFixed();
    }

    /**
     * getBgColor
     * @param percentage - Number
     * @return color - String
     */
    function getBgColor(percentage){
      var bgArray = master.graphfill;
      for (var i = 0; i < bgArray.length; i++) {
        if(percentage < bgArray[i].border){
          return bgArray[i].color;
        }
      }
      return '#000';
    }
  };
};

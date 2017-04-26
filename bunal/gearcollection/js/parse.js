class ParseMaster {
  /**
   * @param {Number} score
   */
  sortReward(score){
    // initialize arrays
    let sortedReward = {
      "label":[],
      "data":[],
      "bgColor":[]
    };
    let tmpHash = {
      "label":[],
      "data":[],
      "bgColor":[]
    };
    let newHash = {
      "label":[],
      "data":[],
      "bgColor":[]
    };

    for (let i = 0; i < master.reward.length; i++) {
      let r = master.reward[i];
      let label = getLabel(r.score, r.item);
      if(score < r.score){
        sortedReward.label.push(label);
        let data = getPercentage(score, r.score);
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
     * @param {Number} score
     * @param {String} item
     * @return {String} label
     */
    function getLabel(score, item){
      return item + '[' + score + '点]';
    }

    /**
     * @param {Number} score
     * @param {Number} itemScore
     * @return {Number} percentage
     */
    function getPercentage(score, itemScore){
      return (score / itemScore * 100).toFixed();
    }

    /**
     * @param {Number} percentage
     * @return {String} colorHex
     */
    function getBgColor(percentage){
      for (let i = 0; i < master.graphfill.length; i++){
        if(percentage < master.graphfill[i].border){
          return master.graphfill[i].color;
        }
      }
      return '#000';
    }
  }
}

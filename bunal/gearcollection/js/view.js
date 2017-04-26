class View {
  /**
   * @static setHeadding - set headding text.
   * @param  {String} headding headding text
   * @return {Boolean} isSuccess
   */
  static setHeadding(headding){
    if(wovHeaddingObj.text(headding)) return true;
    return false;
  }

  /**
   * @static setTotalScore - description
   *
   * @param  {Number} score description
   * @return {Boolean} isSuccess description
   */
  static setTotalScore(score){
    if(score < 0) return false;

    let scoreString = new String();
    for (var i = 1; i < wovTotalDigit; i++) scoreString = scoreString + '0';
    // score.toString
    scoreString = scoreString + score;
    scoreString = scoreString.slice(-1 * wovTotalDigit);

    // remove 'selected'
    wovTotalObj.removeAttr('selected');
    for (let i = 0; i < wovTotalDigit; i++) {
      $(wovTotalSelectPref + (wovTotalDigit - i) + ' option:eq(' + scoreString.slice(i, i+1) + ')').prop('selected', true);
    }
    return true;
  }

  /**
   * @static getScore - description
   * @param {Number} digit
   * @param {String} suffix
   * @return {Number} score description
   */
  static getScore(digit, suffix){
    let score = new String();
    for (var i = 0; i < digit; i++) {
      score = score + $('#select-' + suffix + ' select:eq(' + i + ') option:selected').val();
    }
    if(score.length == 0) return -1;
    return Number(score);
  }

  /**
   * @static viewHistory - view History
   *
   * @return {type}  description
   */
  static viewHistory(){
    if(typeof(appHistory) !== 'object' || appHistory.length == 0){
      wovHistoryUl.html('<li class="collection-item">更新履歴はありません</li>');
    } else {
      for (let i = 0; i < appHistory.length; i++) {
        let ahHash = appHistory[i];
        let ahBody = $('<ul></ul>');
        for (let j = 0; j < ahHash.body.length; j++) {
          ahBody.append('<li>'+ ahHash.body[j] +'</li>');
        }
        let ahItem = $('<li class="collection-item"><div class="header"><span class="date right">' + ahHash.date + '</span><span class="title">ver.' + ahHash.version + '</span></div></li>');
        ahItem.append(ahBody);
        wovHistoryUl.append(ahItem);
      }
    }
  }
}

class ViewGraph {
  constructor() {
    this.canvas = wovCanvasObj;
    this.option = wovGraphOption;
  }

  /**
   * draw - description
   *
   * @param  {json} reward description
   * @return {Chart} graph description
   */
  draw(reward){
    if(typeof(reward) == 'undefined') return {'error':"It's parameter error."};

    let graph = new Chart(this.canvas, {
      type: 'horizontalBar',
      data: {
        labels: reward.label,
        datasets: [{
          data: reward.data,
          backgroundColor: reward.bgColor
        }]
      },
      options: this.option
    });

    return graph;
  }

  /**
   * destroy - description
   *
   * @param  {Chart} graph description
   * @return {Chart} graph description
   */
  destroy(graph){
    return graph.destroy();
  }

}
/**
 * Class ControllMainView
 * @const pm - ParseMaster
 */

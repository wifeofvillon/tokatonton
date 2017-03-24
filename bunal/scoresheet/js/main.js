$(document).ready(function(){
  $('select').material_select();

  // TODO: read cookie

  // parse master data
  var pm = new ParseMaster(38);
  var chara = pm.getCharacter();
  chara.score = 64;
  console.info(chara);

  // rewrite character name
  $('h2.header').text(chara.name);

  // TODO: set total number

  // rewrite graph
  var sortedReward = pm.sortReward(chara);
  console.info(sortedReward);
  console.info(graphOption);
  var graph = new Chart($('#graph'), {
    type: 'horizontalBar',
    data: {
      labels: sortedReward.label,
      datasets: [{
        data: sortedReward.data,
        backgroundColor: sortedReward.bgColor
      }]
    },
    options: graphOption
  });
});

/**
 * Class ControllMainView
 * @const pm - ParseMaster
 */
var ControllMainView = function(pm){


};

var graphOption = {
  legend:{
    display: false
  },
  scales: {
    xAxes: [{
      position: 'top',
      ticks: {
        beginAtZero:true,
        min:0,
        max:100,
        stepSize:10,
        callback:function(value){
          return value + "%";
        }
      }
    }],
    yAxes: [{
      barThickness: 24
    }]
  }
}

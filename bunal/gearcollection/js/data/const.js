// for cookie
const wovExpires = 365;

// for graph
const wovGraphOption = {
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
    }]
  }
};

// for main
const wovCookieKey = "wovbunalgc";
const wovCookieProp = {expires:wovExpires};
const wovCookieScoreKey = 'collected';
const wovCookieInit = {"collected": 0};
const wovCanvasObj = $('#graph');
const wovScreenWidth = 601;
const wovCanvasHeight = 990;

const wovBookTitle = "太陽のない街";
const wovHeaddingObj = $('section#main h2.header');
const wovTotalObj = $('.total-score select option');
const wovTotalDigit = 5;
const wovTotalSelectPref = '#total-';
const wovAddDigit = 3;
const wovHistoryUl = $('section#history ul.collection');

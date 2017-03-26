const wovExpires = 365;

/**
 * Class SCCookie
 * depend on jQuery.cookie
 * @const key - String
 * @const prop - Object
 */
var SCCookie = function(key, prop){
  $.cookie.json = true;
  this.key = key;
  this.prop = prop;

  /**
   * SCCookie.read
   * @param key - String
   * @return  value - String
   */
  this.read = function(){
    return $.cookie(this.key);
  };

  /**
   * SCCookie.write
   * @param key - String
   * @param value - String or json
   * @param prop  - Object
   * @return
   */
  this.write = function(value){
    return $.cookie(this.key, value, this.prop);
  };

  /**
   * SCCookie.remove
   * @param key - String
   */
  this.remove = function(){
    return $.removeCookie(this.key);
  }
};

/**
 * Class ParseCookie
 * @const json - JSON
 */
var ParseCookie = function(json){
  this.json = json;

  /**
   * ParseCookie.getLastId
   * @return id - Number
   */
  this.getLastId = function(){
    return this.json.last;
  }

  /**
   * ParseCookie.getScore
   * @param  id - Number
   * @return score - Number
   */
  this.getScore = function(id){
    console.log(id);
    console.log(json.character);
    for (var i = 0; i < json.character.length; i++) {
      console.log(json.character[i].id);
      if(id == json.character[i].id){
        return json.character[i].score;
      }
    }
    return -1;
  }
};

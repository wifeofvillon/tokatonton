/**
 * depend on js-cookie.js
 * @constructor
 * @param {String} key - Cookie key
 * @param {json} prop - Cookie property
 */
class WovCookie {
  constructor(key, prop) {
    this.key = key;
    this.prop = prop || {};
  }

  /**
   * @return {json} value Cookie value
   */
  read(){
    return Cookies.getJSON(this.key);
  }

  /**
   * @param {json} value Cookie value
   * @return {}
   */
  write(value){
    return Cookies.set(this.key, value, this.prop);
  }

  /**
   * @return {}
   */
  remove(){
    return Cookies.remove(this.key);
  }
}

(function(){

})();

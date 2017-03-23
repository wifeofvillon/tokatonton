const wovKey = "wovbunalsc";
const wovExpires = 365;
const wovCookieProp = {expires:wovExpires};

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

// test
var testScc = new SCCookie('testCookieKey',{expires:1});
console.log(testScc.read());
console.log(testScc.write('testCookieString'));
console.log(testScc.read());
console.log(testScc.write({"key":"value"}));
console.log(testScc.read());

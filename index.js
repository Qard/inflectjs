/*!
 * Inflect
 * Copyright(c) 2011 Stephen Belanger <admin@stephenbelanger.com>
 * MIT Licensed
 */
(function(exports){
  // Remove whitespace.
  exports.trim = function(str) {
    return str.replace(/^\s+|\s+$/, '');
  }

  // Make singular words plural.
  exports.plural = function(str, keep_case) {
    var s = this.trim(str);

    // It's easier to avoid multipluralization by singularizing first.
    s = this.singular(str);
    if ( ! keep_case) { s = s.toLowerCase(); }
    switch (s.substr(-1)) {
      case 'y':
        s = s.substr(-2, 1) in ['a', 'e', 'i', 'o', 'u']
          ? s + 's'
          : s.substr(0, s.length-1) + 'ies';
        break;
      
      case 'h':
        s += s.substr(-2) == 'ch' || s.substr(-2) == 'sh' ? 'es' : 's';
        break;
      
      case 's':
        s += 'es';
        break;
      
      default:
        s += 's';
    }
    return s;
  }

  // Make plural words singular.
  exports.singular = function(str, keep_case) {
    var s = this.trim(str);
    if ( ! keep_case) { s = s.toLowerCase(); }
    switch (s.substr(-3)) {
      case 'ies':
        s = s.substr(0, s.length-3) + 'y';
        break;
      
      case 'ses':
        s = s.substr(0, s.length-2);
        break;
      
      default:
        if (s.substr(-1) == 's') {
          s = s.substr(0, s.length-1);
        }
    }
    return s;
  }

  // Remove word separators and uppercase first char of each word.
  exports.camel = function(str) {
    var s = this.human(str).toLowerCase();
    s = s.replace(/[\s_]/g, ' ');
    s = s.replace(/^(.)|\s(.)/g, function($1) {
      return $1.toUpperCase();
    });
    return s.replace(/ /g, '');
  }

  // Replace spaces with a different word separator.
  exports.separate = function(str, splitter, keep_case) {
    var s = this.human(str);
    if ( ! keep_case) { s = s.toLowerCase(); }
    return s.replace(/[\s]+/g, splitter);
  }

  // Separate aliases.
  exports.underscores = function(str, keep_case) {
    return this.separate(str, '_', keep_case);
  }
  exports.dashes = function(str, keep_case) {
    return this.separate(str, '-', keep_case);
  }
  exports.pluses = function(str, keep_case) {
    return this.separate(str, '+', keep_case);
  }

  // Make camelCasedStrings or separated_strings human readable.
  exports.human = function(str, caps_all) {
    var s = this.trim(str);
    s = str.replace(/[A-Z]/g, '_$&');
    if (s.charAt(0) === '_') { s = s.substr(1); }
    s = s.toLowerCase().replace(/[^A-Za-z0-9]+/g, ' ');
    if (caps_all) {
      s = s.replace(/^(.)|\s(.)/g, function($1) {
        return $1.toUpperCase();
      });
    } else {
      s = s.charAt(0).toUpperCase()+s.substr(1);
    }
    return s;
  }
})(typeof module !== 'undefined' ? module.exports : (window.Inflect || (window.Inflect = {})));
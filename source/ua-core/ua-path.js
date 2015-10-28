uaApp.provider('uaPath', [
  function() {
    var _base = '';

    this.setBase = function(base) {
      _base = base;
      return this;
    };

    this.$get = function() {
      return {
        resolve: function(path) {
          return _base + path;
        }
      };
    };
  }
]);

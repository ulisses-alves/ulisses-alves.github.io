uaApp.provider('uaCode', function() {
  var _url;

  this.url = function(url) {
    _url = url;
    return this;
  }

  this.$get = ['$resource',
    function($resource) {
      return $resource(_url, {}, {
        query: {
          method: 'GET'
        }
      });
    }
  ];
});

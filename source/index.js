document.addEventListener('DOMContentLoaded', function(event) {
  angular.module('index', ['uaApp']);
  angular.bootstrap(event.target, ['index']);
});

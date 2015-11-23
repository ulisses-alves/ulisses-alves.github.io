document.addEventListener('DOMContentLoaded', function(event) {
  angular.module('index', ['uaApp'])
  .config([
    '$sceDelegateProvider',
    '$routeProvider',
    'uaLayoutConfig',
    'uaCodeProvider',

    function($sceDelegateProvider, $routeProvider, uaLayoutConfig,
      uaCodeProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://gist.github.com/ulisses-alves/**'
      ]);

      uaLayoutConfig($routeProvider);
      uaCodeProvider.url('ua-data/ua-code.json');
    }
  ]);

  angular.bootstrap(event.target, ['index']);
});

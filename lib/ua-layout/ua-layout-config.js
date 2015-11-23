uaApp.constant('uaLayoutConfig',
  function($routeProvider, basePath) {
    basePath = basePath || '';

    $routeProvider
      .when(basePath + '/', {
        templateUrl: 'ua-about-page/ua-about-page.html'
      })
      .when(basePath + '/code/:name', {
        templateUrl: 'ua-code-page/ua-code-page.html',
        controller: 'uaCodePageController'
      })
      .otherwise({
        redirectTo: basePath + '/'
      });
  }
);

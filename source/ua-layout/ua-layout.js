uaApp.directive('uaLayout', ['uaPath',
  function(uaPath) {
    return {
      templateUrl: uaPath.resolve('ua-layout/ua-layout.html')
    };
  }
]);

uaApp.config(['$mdThemingProvider',
  function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange')
      .backgroundPalette('grey', {
        'hue-1': '100'
      });
  }
]);

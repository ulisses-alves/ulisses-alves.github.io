uaApp.directive('uaSticky', ['$mdSticky',
  function($mdSticky) {
    return {
      link: function(scope, iElement) {
        $mdSticky(scope, iElement);
      }
    };
  }
]);

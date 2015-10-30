uaApp.controller('uaCodePageController', ['$scope', '$routeParams', 'uaCode',
  function($scope, $routeParams, uaCode) {
    $scope.name = null;
    $scope.src = null;

    uaCode.query(function(codes) {
      var code = codes[$routeParams.name];
      $scope.name = code.name;
      $scope.src = code.gist;
    });
  }
]);

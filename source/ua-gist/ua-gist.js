uaApp.directive('uaGist', ['$window',
  function($window) {
    return {
      templateUrl: 'ua-gist/ua-gist.html',
      link: function(scope, iElement, iAttrs) {
        scope.ready = false;

        iAttrs.$observe('src', function(value) {
          console.log(value);

          var iframe = iElement.find('iframe');
          var iframeDocument = iframe[0].contentWindow.document;
          var resizeFrameFn = 'uaGist' + scope.$$id;

          $window[resizeFrameFn] = function() {
            iframe.css('height', iframeDocument.body.scrollHeight + 'px');
            delete $window[resizeFrameFn];

            scope.$apply(function() {
              scope.ready = true;
            });
          };

          var iframeTemplate =
            '<!DOCTYPE html>' +
            '<html>' +
              '<head><base target="_blank"></head>' +
              '<body onload="parent.' + resizeFrameFn + '()">' +
                '<script src="' + value + '"></script>' +
              '</body>' +
            '</html>';

          iframeDocument.open();
          iframeDocument.write(iframeTemplate);
          iframeDocument.close();
        });
      }
    };
  }
]);

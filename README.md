# angular-linkify

Angular filter, directive, and service to linkify text. As of **v0.3.0**, angular-linkify works for twitter/github mentions, twitter hashtags, and basic urls.
**v1.2.0** introduces facebook and instagram linkification.

## Install

```
bower install angular-linkify --save
```

## Usage

Inject module into your application

```javascript
angular.module('YourApp', ['linkify']);
```

Use as a [AngularJS Directive](http://docs.angularjs.org/guide/directive)

```html
<!-- As a directive, no twitter -->
<div ng-bind="someModel" linkify></div>

<!-- As a directive, with twitter parsing -->
<div ng-bind="someModel" linkify="twitter"></div>
```

Inject as a [AngularJS Service](http://docs.angularjs.org/guide/dev_guide.services)

```javascript
// Injected into controller
angular.module('someModule').controller('SomeCtrl', function ($scope, linkify, $sce) {
  var text = "@keebits #keebits and http://www.keebits.de";
  
  // Twitter
  // Must use $sce.trustAsHtml() as of Angular 1.2.x
  $scope.text = $sce.trustAsHtml(linkify.twitter(text));
  // outputs: <a href="https://twitter.com/keebits" target="_blank">keebits</a> <a href="https://twitter.com/hashtag/keebits?src=hash">keebits</a> and <a href="http://www.keebits.de" target="_blank">www.keebits.de</a>
  
  // Github
  // Must use $sce.trustAsHtml() as of Angular 1.2.x
  $scope.text = $sce.trustAsHtml(linkify.github(text));
  // outputs: <a href="https://github.com/keebits" target="_blank">keebits</a> #keebits and <a href="http://www.keebits.de" target="_blank">www.keebits.de</a>

  // Facebook
  // Must use $sce.trustAsHtml() as of Angular 1.2.x
  $scope.text = $sce.trustAsHtml(linkify.facebook(text));
  // outputs: <a href="https://www.facebook.com/keebits" target="_blank">keebits</a> <a href="https://www.facebook.com/hashtag/keebits">keebits</a> and <a href="http://www.keebits.de" target="_blank">www.keebits.de</a>

  // Instagram
  // Must use $sce.trustAsHtml() as of Angular 1.2.x
  $scope.text = $sce.trustAsHtml(linkify.github(text));
  // outputs: <a href="https://instagram.com/keebits" target="_blank">keebits</a> #keebits and <a href="http://www.keebits.de" target="_blank">www.keebits.de</a>
  
});

```

## Build

```
grunt
```

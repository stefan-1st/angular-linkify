angular.module('linkify', []);

angular.module('linkify')
/**
 * The angular linkify filter.
 */
    .filter('linkify', function () {
        'use strict';

        /**
         * Utility function that does all the logic to replace special text with links.
         * @param {string} _str
         * @param {string} type
         * @returns {string}
         * @private
         */
        function linkify(_str, type) {
            if (!_str) {
                return;
            }

            // force type to be lower case
            type = (type ? type.toLowerCase() : '');

            // replace regular links
            var _text = _str.replace(/(?:https?\:\/\/|www\.)+(?![^\s]*?")([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/ig, function (url) {
                var wrap = document.createElement('div'),
                    anch = document.createElement('a'),
                    prefix = (url.match(/^https?/) ? '' : 'http://');

                anch.href = prefix + url;
                anch.target = '_blank';
                anch.innerHTML = url;

                wrap.appendChild(anch);

                return wrap.innerHTML;
            });

            // bugfix
            if (!_text) {
                return '';
            }

            // Twitter
            switch (type) {
                case 'twitter':
                    _text = _text.replace(/(|\s)*@([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>');
                    _text = _text.replace(/(^|\s)*#([\u00C0-\u1FFF\w]+)/g, function ($1, $2, $3) {
                        return $2 + '<a href="https://twitter.com/search?q=' + encodeURIComponent('#' + $3) + '" target="_blank">#' + $3 + '</a>';
                    });

                    break;

                case 'github':
                    _text = _text.replace(/(|\s)*@(\w+)/g, '$1<a href="https://github.com/$2" target="_blank">@$2</a>');
                    break;

                case 'facebook':
                    _text = _text.replace(/(|\s)*@([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://www.facebook.com/$2" target="_blank">@$2</a>');
                    _text = _text.replace(/(^|\s)*#([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://www.facebook.com/hashtag/$2" target="_blank">#$2</a>');
                    break;

                case 'instagram':
                    _text = _text.replace(/(|\s)*@([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://instagram.com/$2/" target="_blank">@$2</a>');
                    break;
            }

            return _text;
        }

        //
        return function (text, type) {
            return linkify(text, type);
        };
    })

/**
 * Factory wrapper for the linkify filter.
 */
    .factory('linkify', ['$filter', function ($filter) {
        'use strict';

        /**
         * Generate functions to call linkify filter with the correct type.
         * @param {string} type
         * @returns {Function}
         * @private
         */
        function _linkifyAsType(type) {
            return function (str) {
                (type, str);
                return $filter('linkify')(str, type);
            };
        }

        return {
            twitter: _linkifyAsType('twitter'),
            github: _linkifyAsType('github'),
            facebook: _linkifyAsType('facebook'),
            instagram: _linkifyAsType('instagram'),
            normal: _linkifyAsType()
        };
    }])

/**
 * Directive that wraps the filter.
 */
    .directive('linkify', ['$filter', '$timeout', 'linkify', function ($filter, $timeout, linkify) {
        'use strict';

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var type = attrs.linkify || 'normal';
                $timeout(function () {
                    element.html(linkify[type](element.html()));
                });
            }
        };
    }]);

/**
 * @license
 * lux.js - v0.1.0
 * Copyright (c) 2013, Luxurious Animals, Tai U
 * http://luxanimals.com/
 * https://github.com/luxuriousanimals/lux.js.git
 *
 * Compiled: 2013-09-30
 *
 * lux.js is licensed under the MIT License.
 * http://opensource.org/licenses/MIT
 */



    'use strict';

    // LUX CORE
    var lux = {};

    (function() {
        var namespace = function(name, props) {
            var current = window,
                spaces,
                space,
                prop;

            props  = props || {};
            spaces = name.split('.');

            while(space = spaces.shift()) {
                if(current.hasOwnProperty(space)) {
                    current = current[space];
                } else {
                    current = current[space] = {};
                };
            };

            for(prop in props) if(!current.hasOwnProperty(prop)) current[prop] = props[prop];

            return current;
        };

        var asyncScriptLoad = function(url, id, handler) {
            (function(d) {
                var ref = d.getElementsByTagName('script')[0],
                    js;

                if (d.getElementById(id)) {return;}

                js       = d.createElement('script');
                js.id    = id;
                js.async = true;

                if(handler) js.addEventListener('load', handler);

                js.src   = url;

                ref.parentNode.insertBefore(js, ref);
            }(document));
        };

        // LUX JS
        var memoize = function(f) {
            // This is the simple, lightweight memoize by Addi Yosmani - it's extremely simple with
            // regards to argument hashing, and should only be used with functions that take primitives
            // as arguments.  There is no type checking or strict identity here.
            return function() {
                var args = Array.prototype.slice.call(arguments);
                f.memoize = f.memoize || {};
                return (args in f.memoize) ? f.memoize[args] : f.memoize[args] = f.apply(this, args);
            };
        };

        var template = function(template, vars) {
            // Templayed micro Mustache-compliant templating
            // https://github.com/archan937/templayed.js
            var get = function(path, i) {
                    i    = 1;
                    path = path.replace(/\.\.\//g, function() { i++; return ''; });

                    var js   = ['vars[vars.length - ', i, ']'],
                        keys = (path == "." ? [] : path.split(".")),
                        j    = 0;

                    for(j; j < keys.length; j++) {
                        js.push('.' + keys[j]);
                    };

                    return js.join('');
                },

                tag = function(template) {
                    return template.replace(/\{\{(!|&|\{)?\s*(.*?)\s*}}+/g, function(match, operator, context) {
                        if (operator == "!") return '';
                        var i = inc++;
                        return ['"; var o', i, ' = ', get(context), ', s', i, ' = typeof(o', i, ') == "function" ? o', i, '.call(vars[vars.length - 1]) : o', i, '; s', i, ' = ( s', i, ' || s', i, ' == 0 ? s', i, ': "") + ""; s += ', (operator ? ('s' + i) : '(/[&"><]/.test(s' + i + ') ? s' + i + '.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/>/g,"&gt;").replace(/</g,"&lt;") : s' + i + ')'), ' + "'].join('');
                    });
                },

                block = function(template) {
                    return tag(template.replace(/\{\{(\^|#)(.*?)}}(.*?)\{\{\/\2}}/g, function(match, operator, key, context) {
                        var i = inc++;
                        return ['"; var o', i, ' = ', get(key), '; ', (operator == "^" ?
                            ['if ((o', i, ' instanceof Array) ? !o', i, '.length : !o', i, ') { s += "', block(context), '"; } '] :
                            ['if (typeof(o', i, ') == "boolean" && o', i, ') { s += "', block(context), '"; } else if (o', i, ') { for (var i', i, ' = 0; i', i, ' < o',
                            i, '.length; i', i, '++) { vars.push(o', i, '[i', i, ']); s += "', block(context), '"; vars.pop(); }}' ]
                            ).join(''), '; s += "'].join('');
                    }));
                },

                inc = 0;

            return new Function("vars", 'vars = [vars], s = "' + block(template.replace(/"/g, '\\"').replace(/\n/g, '\\n')) + '"; return s;');
        };

        lux.js = {
            namespace       : namespace,
            asyncScriptLoad : asyncScriptLoad,
            memoize         : memoize,
            template        : template
        };

    })();

    (function() {
        // LUX CSS
        var UA             = navigator.userAgent,
            isIE           = /\bmsie\b/i.test(UA),
            isWebkit       = /webkit/i.test(UA),
            unquoteRE      = /^['"]|['"]$/g,
            testStyle      = document.createElement('div').style,
            transformProps = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
            transformProp  = null,
            cache          = {},
            style          = null,
            sheet          = null,
            rules          = {};

        transformProps.some(function(prop) {
            if(typeof testStyle[prop] !== 'undefined') {
                transformProp = prop;
                return true;
            } else {
                return false;
            };
        });

        var redraw = function(el, level) {
            var els = (el.length ? el : [el]),
                i   = els.length;

            level = level || 0;

            while(i--) {
                _redraw(els[i], level);
            };
        };

        var _redraw = function(el, level) {
            var d   = null,
                tn  = null;

            if(isIE || level === 0) {
                // Level 0: Simple recalculation
                 return el.offsetWidth;
            } else {
                // Level 1: Toggle display
                d = el.style.display;
                el.style.display = 'none';
                el.style.display = d;
                el.offsetWidth;

                // Old level 2 - not sure if this is needed anymore, could cause problems
                // with CSS animations & transitions
                // if(level >= 2) {
                //     el.style[transformProp] = el.style[transformProp];
                // };

                // Level 2: Append/remove empty text node
                if(level >= 2) {
                    el.appendChild(tn = document.createTextNode(''));

                    setTimeout(function() {
                        el.removeChild(tn);
                    }, 0);
                };
            };

        };

        var enableDynamicRules = function() {
            style    = document.createElement('style');
            style.id = 'lux-css-generated';

            style.appendChild(document.createTextNode(''));

            document.head.appendChild(style);

            sheet = style.sheet;
        };

        var rule = function(selector, props) {
            var r = rules[selector] || getRule(selector),
                p = null;

            for(p in props) {
                r.style[p] = props[p];
            };
        };

        var getRule = function(selector) {
            sheet.insertRule(selector + '{}', 0);
            return (rules[selector] = sheet.cssRules[0]);
        };

        var getCSSData = function(name, context) {
            // TODO: add support for "contexts" (i.e. append to a specified container rather than document.body)
            // TODO: find out if missing/unsupported values are null or just empty string.
            // TODO: remember, if this starts failing, remove the dollar signs!
            var el    = document.createElement('span'),
                sel   = '-lux-css-data -' + name,
                value = null,
                data  = null;

            if(cache[sel]) {
                data = cache[sel];
            } else {
                el.className = sel;

                document.body.appendChild(el);

                if(window.getComputedStyle) {
                    value = window.getComputedStyle(el, ':after').getPropertyValue('content');

                    if(value === null || value.length === 0) window.getComputedStyle(el).getPropertyValue('font-family');
                };

                if((value === null || value.length === 0) && el.currentStyle) value = el.currentStyle.fontFamily;

                document.body.removeChild(el);

                try {
                    data = JSON.parse(value.replace(unquoteRE, ''));
                } catch(e) {
                    // Either not JSON or no JSON support
                    data = value;
                };
                
                cache[sel] = data;
            };
                
            return data;
        };

        lux.css = {
            REDRAW_LEVEL_LOW     : 0,
            REDRAW_LEVEL_MEDIUM  : 1,
            REDRAW_LEVEL_HIGH    : 2,
            REDRAW_LEVEL_EXTREME : 3,

            redraw               : redraw,
            enableDynamicRules   : enableDynamicRules,
            rule                 : rule,
            addRule              : rule,
            getCSSData           : getCSSData
        };
        })();
    /*
    This doesn't have a home elsewhere just yet - the SASS mixin which accompanies the getCSSData:

        @mixin expose($name, $value) {
            // TODO: add support for "contexts" (i.e. append to a specified container rather than document.body)
            // TODO: find out if missing/unsupported values are null or just empty string.
            // TODO: remember, if this starts failing, remove the dollar signs!
            .--lux-css-data.--#{$name} {
                &:before { content: "#{$value}"; }
            }
        }

        @mixin exposeJSON($name, $values) {
            $out: '{';
            $end: length($values) / 2;

            @for $i from 0 to $end {
                $prop: nth($values, $i * 2 + 1);
                $val:  nth($values, $i * 2 + 2);

                $out:  $out + '"#{$prop}":"#{$val}"';

                @if $i < ($end - 1) { $out: $out + ','; }
                @else { $out: $out + '}'; }
            }

            @include expose($name, $out);
        }

        .--lux-css-data, .--lux-css-data:before {
            width:      1px;
            height:     1px;
            margin:     -1px;
            position:   absolute;
            right:      0;
            bottom:     0;
            z-index:    -1;
            visibility: hidden;
        }
     */


    // LUX STRING
    (function() {
        var dewidowRE = /[\n\r\s]+([^\n\r\s(?:&#160;)]+[\n\r\s]*)$/gm;

        var dewidow = function(s) {
            return s.replace(dewidowRE, '&#160;$1');
        };

        var decodeHTML = function(html) {
            var d = document.createElement('div');

            d.innerHTML = html;

            return d.textContent;
        };

        var pad = function(str, len, char) {
            var out = str !== null && str !== undefined ? str.toString() : '0';
            return Array(Math.max(len - out.length + 1, 0)).join(char || '0') + out;
        };

        lux.string = {
            decodeHTML : decodeHTML,
            dewidow    : dewidow,
            pad        : pad
        };
    })();


    // LUX URL
    (function() {
        var paramsRE = /([^?=&]+)(=([^&]*))?/g,
            params   = {};

        if(window.top !== window) {
            window.top.location.search.replace(paramsRE, function($0, $1, $2, $3) {
                params[$1] = $3;
            });
        };

        window.location.search.replace(paramsRE, function($0, $1, $2, $3) {
            params[$1] = $3;
        });

        lux.url = {
            params : params,
            has    : function(param) {
                return params.hasOwnProperty(param);
            },
            get    : function(param) {
                return params[param];
            }
        };
    })();



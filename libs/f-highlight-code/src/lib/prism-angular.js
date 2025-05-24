import 'prismjs/components/prism-typescript';
import Prism from 'prismjs';

Prism.languages.markup = {

  'comment': {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true,
  },
  'prolog': {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true,
  },
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/,
        },
      },

      'angular-control-flow-attribute': {
        pattern: /@(?:if|for|switch|case|default|defer|loading|placeholder|error)\b(?=\s*=)/,
        alias: 'keyword',
      },

      // 👇 Angular-атрибуты
      'angular-attr': {
        pattern: /(?:\*[\w-]+|@[\w-]+|\[\([^)]+\)\]|\[[^\]]+\]|\([^)]+\)|(?:bind-|on-|let-|class\.|style\.|attr\.)[\w-]+)(?=\s*=)/,
        alias: 'attr-name',
      },

      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          'punctuation': [
            {
              pattern: /^=/,
              alias: 'attr-equals',
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true,
            },
          ],
        },
      },

      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/,
        },
      },
    },
  },

  'entity': [
    {
      pattern: /&[\da-z]{1,8};/i,
      alias: 'named-entity',
    },
    /&#x?[\da-f]{1,8};/i,
  ],
};
Prism.languages.insertBefore('markup', 'entity', {
  'angular-interpolation': {
    pattern: /{{[^{}]*}}/,
    inside: {
      'punctuation': /{{|}}/,
      'expression': {
        pattern: /[^{}]+/,
        alias: 'language-typescript',
        inside: Prism.languages.typescript,
      },
    },
  },
});
Prism.languages.insertBefore('markup', 'entity', {
  'angular-control-flow-block': {
    pattern: /@(?:if|for|switch|case|default|defer|loading|placeholder|error)\b[^{]*\{/,
    inside: {
      'keyword': /@(?:if|for|switch|case|default|defer|loading|placeholder|error)/,
      'expression': {
        pattern: /[^{]+/,
        alias: 'language-typescript',
        inside: Prism.languages.typescript,
      },
      'punctuation': /[{]/,
    },
  },
});
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
  value: function addInlined(tagName, lang) {
    const includedCdataInside = {};
    includedCdataInside['language-' + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang],
    };
    includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

    const inside = {
      'included-cdata': {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside,
      },
    };
    inside['language-' + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang],
    };

    const def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
        return tagName;
      }), 'i'),
      lookbehind: true,
      greedy: true,
      inside,
    };

    Prism.languages.insertBefore('markup', 'cdata', def);
  },
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {

  value(attrName, lang) {
    Prism.languages.markup.tag.inside['special-attr'].push({
      pattern: RegExp(
        /(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
        'i',
      ),
      lookbehind: true,
      inside: {
        'attr-name': /^[^\s=]+/,
        'attr-value': {
          pattern: /=[\s\S]+/,
          inside: {
            'value': {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, 'language-' + lang],
              inside: Prism.languages[lang],
            },
            'punctuation': [
              {
                pattern: /^=/,
                alias: 'attr-equals',
              },
              /"|'/,
            ],
          },
        },
      },
    });
  },
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;

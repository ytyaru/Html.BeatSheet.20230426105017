# 文字列長

* [JavaScript textLength as halfWidth (半角としてのテキスト幅)][]
* [Intl.Segmenter][]
* [Html.JS.Intl.Segmenter.20230411112145][]

[JavaScript textLength as halfWidth (半角としてのテキスト幅)]:https://qiita.com/yoya/items/5da038312279f98bdd28
[Intl.Segmenter]:https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter
[Html.JS.Intl.Segmenter.20230411112145]:https://github.com/ytyaru/Html.JS.Intl.Segmenter.20230411112145

```js
String.prototype.halfWidthLength = function() {...}
String.prototype.graphemeLength = function() {...}
String.prototype.wordLength = function() {...}
String.prototype.sentenceLength = function() {...}

Length.halfWidth() // https://qiita.com/yoya/items/5da038312279f98bdd28
Length.grapheme()          // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter
Length.word()
Length.sentence()
```

# ケース

　文字列を変換するメソッドを実装したい。

* Chain
* Snake
* Camel
* コンスタント
* パスカル

英名|和名|絵|区切|字種|例(動詞)|例(名詞)|用途
----|----|--|----|----|--------|--------|----
Chain|チェーン|⛓️|`-`|Lower|`get-id`|`my-id`|HTML要素ID, CSSクラス名
Snake|スネーク|🐍|`_`|Lower|`get_id`|`my_id`|Python変数名
Camel|キャメル|🐫||２単語目から先頭字Upper、他Lower|`getId`|`myId`|JavaScript変数名、関数名
Pascal|パスカル|🐫||１単語目から先頭字Upper、他Lower|`GetId`|`MyId`|JavaScriptクラス名
Constant|コンスタント|🐍|`_`|Upper|`GET_ID`|`MY_ID`|SQLiteテーブル名、列名
Title|タイトル||` `|１単語目の先頭字のみUpper、他Lower|`Get id`|`My id`|英文、HTMLラベル名

英名|和名|絵|区切|字種|例(動詞)|例(名詞)|用途
----|----|--|----|----|--------|--------|----
Chain|チェーン|⛓️|`-`|Lower|`get-id`|`my-id`|HTML要素ID, CSSクラス名
Snake|スネーク|🐍|`_`|Lower|`get_id`|`my_id`|Python変数名
Camel|キャメル|🐫||２単語目から先頭字Upper、他Lower|`getId`|`myId`|JavaScript変数名、関数名
Pascal|パスカル|🐫||１単語目から先頭字Upper、他Lower|`GetId`|`MyId`|JavaScriptクラス名
Constant|コンスタント|🐍|`_`|Upper|`GET_ID`|`MY_ID`|SQLiteテーブル名、列名
Title|タイトル||` `|１単語目の先頭字のみUpper、他Lower|`Get id`|`My id`|英文、HTMLラベル名

## 用途

　ケースは単語を区切るときに使われる。人がみて理解できることが条件である。

　英語ではスペース（空白文字` `）が区切り文字である。しかし端末（ターミナル）やプログラミング言語においてスペースはメタ文字であり、命名には使えない。そこでスペースの代用としてアンダースコア`_`をはじめとした記号が使われるようになった。

　ケースはプログラミングの変数や関数を宣言するときに使う。ふつうそれらに使える字種は限られている。正規表現でいうと`[a-zA-Z_][a-zA-Z_0-9]+`になる。記号は`_`しか使えない。なのでスネークケースやキャメルケースがもっとも普及している。

　HTMLやCSSのようなマークアップ言語ではチェーン記号`-`が使える。

　HTMLの要素にはそれぞれ次のようにケースを使い分けることがある。

HTML要素|`id`属性値|テキストコンテント
--------|----------|------------------
`<label>`|チェーンケース|タイトルケース

HTML要素|`value`属性値|テキストコンテント
--------|----------|------------------
`<option>`|チェーンケース|タイトルケース

　マシン・リーダブルにするためにチェーンケースを使い、人の目でみて自然になるようタイトルケースを使う。

　国際化（i18n）するなら、タイトルケースは英語圏だけが有効である。他の言語圏は翻訳せねばならず、まったく別のテキストになる。それでも英語は世界共通語なので、タイトルケースと他のケースの相互変換は一定の価値がある。

## 別名

名前|別英名|別和名
----|------|------
Chain|Kebab|ケバブ
Snake|Lower Snake|ローワースネーク
Constant|Upper Sake|アッパースネーク
Camel|Lower Camel|ローワーキャメル
Pascal|Upper Camel|アッパーキャメル

　基本的にはチェーン、スネーク、キャメルを覚えておけばいい。あとは大文字・小文字を変えたパターンがそれぞれコンスタント、パスカルである。それらはアッパースネーク、アッパーキャメルとも呼べる。なので基本的にはチェーン、スネーク、キャメルの３つを覚えておけばいい。

　チェーンはチェインと表記されることもある。カタカナ英語にしたせいで起きた表記ゆれ。また、チェーンはケバブと呼ばれることもある。チェーンは鎖であり、ケバブは食べ物の串のことを指している。`-`の記号を鎖や串に見立てた呼び名。

## 記号名

記号|英名|和名
----|----|----
`-`|[hyphen][ハイフン]（[hyphen minus][ハイフンマイナス]）|[ハイフン][hyphen]（[ハイフンマイナス][]）
`_`|[under score][アンダースコア]|[アンダースコア][]

[hyphen]:https://ja.wikipedia.org/wiki/%E3%83%8F%E3%82%A4%E3%83%95%E3%83%B3
[ハイフンマイナス]:https://ja.wikipedia.org/wiki/%E3%83%8F%E3%82%A4%E3%83%95%E3%83%B3%E3%83%9E%E3%82%A4%E3%83%8A%E3%82%B9
[under score]:https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%80%E3%83%BC%E3%82%B9%E3%82%B3%E3%82%A2
[マイナス]:https://ja.wikipedia.org/wiki/%E3%83%97%E3%83%A9%E3%82%B9%E8%A8%98%E5%8F%B7%E3%81%A8%E3%83%9E%E3%82%A4%E3%83%8A%E3%82%B9%E8%A8%98%E5%8F%B7

　じつは[ハイフン][]といいつつも、正確には[ハイフンマイナス][]を使う。プログラミングでも[ハイフンマイナス][]を使う。これは[ハイフン][]とマイナスという異なる意味の記号を、同じ文字として扱った字である。

字|Unicode|名前
--|-------|----
`-`|`U+002D`|[ハイフンマイナス][]
`‐`|`U+2010`|[ハイフン][]
`−`|`U+2212`|[マイナス][]

　[アンダースコア][]はアンダーバー、アンダーラインとも呼ばれる。

字|Unicode|名前
--|-------|----
`_`|`U+005F`|[アンダースコア][]

# 省略

* https://ja.wikipedia.org/wiki/%E5%91%BD%E5%90%8D%E8%A6%8F%E5%89%87_(%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)
* ハンガリアン記法
* https://qiita.com/Yusuke196/items/b5e51ee6d77ca1b672c2

　英単語が長すぎると読書が面倒になり省略したくなる。このとき省略する方法がいくつかある。大抵は

英名|和名|例
----|----|--
`acronym`|頭文字抜粋|`HID`(`Human Interface Device`)、`pwd`（`Print Working Directory`）, `cd`(`Change Directory`)
`app`|ある子音より後を削る|`app`(`application`), `dev`(`development`), `env`(`environment`)
`img`|重要な字のみ残す|`img`(`image`), `id`(`identification`), `キムタク`(`木村拓哉`), `テレビ`(`television`)、`PT`(`party`)
`app+img`||`tmp`(`temporary`), `jp`(`japan`)

　適用範囲を明確にし、辞書として一覧できるようにするとよい。さもなくば省略しすぎて意味不明になる。

　子音を残して母音を消す方法がある。ただし先頭が母音のときは削らない。かといって子音すべてを残すとあまり省略できないこともある。たとえば`party`から母音を消しても`prty`になって1字しか消せない。もっと大胆に省略して`PT`のようにしたい。すると省略方法が複雑化してしまったり、意味不明になる。限られたコミュニティでしか通じない専門用語になる。なので用語一覧のような辞書があるとよい。略語を覚えてしまえば短時間で伝達できるようになる。

# 他

　同じものを指すが、異なる表記になることがある。

* 正式名称
* 省略名称
* 通称（愛称、別称）
* 多言語（英語、日本語（漢字、カタカナ、ひらがな、カタカナ英語、半角カタカナ））
* HTML（`<ruby>`有無（`ruby`タグがあるとテキスト検索するとき周囲の語と連続したテキストとして検索できない））

# 設計

　文字列型`String`を拡張する。名前汚染を最小限にするため`Case`名前空間に入れる。

```js
jadgeCase() // 'chain', 'SNAKE'('constant'), 'snake', 'camel', 'CAMEL'('pascal'), 'title', 'lower', 'upper'
isChain()
isSnake()
isCamel()
isPascal()
isConstant()
isTitle() // 先頭一字が大文字で以降は小文字。一単語のみでスペースがないテキストもすべてこれ。
isUpperTitle() // 二単語以上でスペースで区切られている（全小文字）
isLowerTitle() // 二単語以上でスペースで区切られている（全大文字）
isLower() // 一単語のみでスペースがないテキスト（全小文字）
isUpper() // 一単語のみでスペースがないテキスト（全大文字）


Length.halfWidth() // https://qiita.com/yoya/items/5da038312279f98bdd28
Length.grapheme()          // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/Segmenter
Length.word()
Length.sentence()

ToChain()
ToSnake()
ToCamel()
ToPascal()
ToConstant()
ToTitle()
```

```js
Case.Name // 'chain', 'SNAKE'('constant'), 'snake', 'camel', 'CAMEL'('pascal'), 'title', 'lower', 'upper'
Case.isChain()
Case.isSnake()
Case.isCamel()
Case.isPascal()
Case.isConstant()
Case.isTitle() // 先頭一字が大文字で以降は小文字。一単語のみでスペースがないテキストもすべてこれ。
Case.isUpperTitle() // 二単語以上でスペースで区切られている（全小文字）
Case.isLowerTitle() // 二単語以上でスペースで区切られている（全大文字）
Case.isLower() // 一単語のみでスペースがないテキスト（全小文字）
Case.isUpper() // 一単語のみでスペースがないテキスト（全大文字）
```


```js
String.prototype.jadgeCase() = function(){

}
```

/^[a-zA-Z][a-zA-Z0-9]+$/g.test(str))


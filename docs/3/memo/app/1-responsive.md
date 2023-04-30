# responsive

* font-size:16px;
* writing-mode:horizontal-tb;

```
<=640	labelとinputTextが別行（1行40字）
<=720	labelとinputTextが同行（1行40字）
<=1280	column-count:2(シノプシスが2列)
<=1920	

<=640	labelとinputTextが別行（1行40字）
<=720	labelとinputTextが同行（1行40字）
<=1280	
1280<=	column-count:2(シノプシスが2列)
1440<=	column-count:2(シノプシスが2列)
1920<=	BS2-6列
```

## beat sheet summary

<=1280
```
id,sn,ln,%,desc,input
```
```
id,sn,ln,%,input
```

<=640
```
id,sn,ln,%,
desc,
input
```

```
id,sn,ln,%,
input
```

## beat sheet details

```
heading
textarea
```

midpoint
```
heading
radio radio
textarea
```

break into 3
```
heading
input text
textarea
```

break into 2
```
heading
input text
input text
textarea
```


<label style="display:table-cell;padding:0;margin:0;width:0px;" for="title">Title</label><input type="text" id="title" name="title" placeholder="作品タイトル" style="display:table-cell;width:100%;"></div>



```js
if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
// スマホのみに適用させるJavaScriptを記述
} else {
// その他PC・タブレットに適用させるJavaScriptを記述
}
```


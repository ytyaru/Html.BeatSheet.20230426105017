(function(){
class _HtmlResizeObservable extends ResizeObservable {
    constructor(el) { super(Html.Root) }
    set() { super.set(this.resize) }
    resize(entry, rect, size, writingMode) {
        if (size.inline <= 1024) { // 本当は768にしたいがシミュレータバグのため便宜上1024にしておく
            console.log('sp', writingMode, size, rect, entry, Css.get('inlineSize', Html.Root), document.body.clientWidth)
            
        } else {
            console.log('pc', writingMode, size, rect, entry, Css.get('inlineSize', Html.Root), document.body.clientWidth)
        }
    }
}
const HtmlResizeObservable = new _HtmlResizeObservable()
HtmlResizeObservable.set()
})()

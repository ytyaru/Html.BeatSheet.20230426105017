(function(){
class HtmlResizeObservable extends ResizeObservable {
    constructor(el) { super(Html.Root) }
    set() { super.set(this.resize); this.#init(); }
    resize(entry, rect, size, writingMode) {
        if (size.inline <= 1024) { // 本当は768にしたいがシミュレータバグのため便宜上1024にしておく
            console.log('sp', writingMode, size, rect, entry, Css.get('inlineSize', Html.Root), document.body.clientWidth)
            
        } else {
            console.log('pc', writingMode, size, rect, entry, Css.get('inlineSize', Html.Root), document.body.clientWidth)
        }
    }
    #init() {
        //console.log(super.WritingMode, super.InlineSize, super.BlockSize)
        //WorkSummary.setup(super.WritingMode, super.InlineSize, super.BlockSize)
        console.log(super.WritingMode, super.InlineFloat, super.BlockFloat)
        WorkSummary.setup(super.WritingMode, super.InlineFloat, super.BlockFloat)
    }
}
window.HtmlResizeObservable = new HtmlResizeObservable()
})()

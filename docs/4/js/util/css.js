(function() {
class Css {
    get(key, el) { return getComputedStyle(this.#getEl(el)).getPropertyValue(key) }
    getInt(key, el) { return parseInt(this.get(key, this.#getEl(el))) }
    getFloat(key, el) { return parseFloat(this.get(key, this.#getEl(el))) }
    set(key, value, el) { return this.#getEl(el).style.setProperty(key, value) }
//    toggle(key, el) { return this.#getEl(el).classList.toggle(key) }
//    has(key, el) { return this.#getEl(el).classList.contains(key) }
    #getEl(el) {
        if (Type.isElement(el)) { return el }
        else if (Type.isString(el)) {
            const e = document.querySelector(el)
            if (e) { return e }
            else { throw new ValueError(`引数elがString型のときはdocument.querySelector()のqueryとして要素を取得できる値であるべきです。`) }
        } else { return document.querySelector(':root') }
    }
    get WritingMode() { return Css.get('writing-mode', Html.Root) }
    get IsHorizontal() { return this.WritingMode.startsWith('horizontal') }
    get IsVertical() { return this.WritingMode.startsWith('vertical') }
    get IsSideways() { return this.WritingMode.startsWith('sideways') }
    get InlineSize() { return Css.get('inlineSize', Html.Root) }
    get BlockSize() { return Css.get('blockSize', Html.Root) }

    getWritingMode(el) { return Css.get('writing-mode', el) }
    isHorizontal(el) { return this.getWritingMode(el).startsWith('horizontal') }
    isVertical(el) { return this.getWritingMode(el).startsWith('vertical') }
    isSideways(el) { return this.getWritingMode(el).startsWith('sideways') }
    getInlineSize(el) { return Css.get('inlineSize', el) }
    getBlockSize(el) { return Css.get('blockSize', el) }
}
window.Css = new Css()
})()


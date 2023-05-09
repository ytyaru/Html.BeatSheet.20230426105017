class ResizeObservable {
    constructor(el) { this.el = (Type.isElement(el) ? el : Html.Root); this.resizeObserver = null; }
    set(fn) {
        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) { fn(entry, ...this.#getRectSize(entry), this.WritingMode) }
        })
        this.resizeObserver.observe(this.el)
    }
    #getRectSize(entry) {
        const mode = this.WritingMode
        if (entry.contentBoxSize) {
            const boxSize = (Array.isArray(entry.contentBoxSize)) ? entry.contentBoxSize[0] : entry.contentBoxSize
            return [boxSize, {'inline':boxSize.inlineSize, 'block':boxSize.blockSize}]
        } else {
            const rect = entry.contentRect
            const size = (this.IsVertical || this.Sideways) ? {'inline':rect.height, 'block':rect.width} : {'inline':rect.width, 'block':rect.height}
            return [rect, size]
        }
    }
    get WritingMode() { return Css.get('writing-mode', this.el) }
    get IsHorizontal() { return this.WritingMode.startsWith('horizontal') }
    get IsVertical() { return this.WritingMode.startsWith('vertical') }
    get IsSideways() { return this.WritingMode.startsWith('sideways') }
    get InlineSize() { return Css.get('inlineSize', Html.Root) }
    get BlockSize() { return Css.get('blockSize', Html.Root) }
    get InlineSize() { return Css.get('inlineSize', this.el) }
    get BlockSize() { return Css.get('blockSize', this.el) }
}

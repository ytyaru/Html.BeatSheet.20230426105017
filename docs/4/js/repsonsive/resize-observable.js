class ResizeObservable {
    constructor(el) { this.el = (Type.isElement(el) ? el : Html.Root); this.resizeObserver = null; }
    set(fn) {
        this.resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) { fn(entry, ...this.#getRectSize(entry), this.Mode) }
        })
        this.resizeObserver.observe(this.el)
    }
    #getRectSize(entry) {
        const mode = this.Mode
        if (entry.contentBoxSize) {
            const boxSize = (Array.isArray(entry.contentBoxSize)) ? entry.contentBoxSize[0] : entry.contentBoxSize
            return [boxSize, {'inline':boxSize.inlineSize, 'block':boxSize.blockSize}]
        } else {
            const rect = entry.contentRect
            const size = (this.IsVertical || this.Sideways) ? {'inline':rect.height, 'block':rect.width} : {'inline':rect.width, 'block':rect.height}
            return [rect, size]
        }
    }
    get Mode() { return Css.get('writing-mode', this.el) }
    get IsHorizontal() { return this.Mode.startsWith('horizontal') }
    get IsVertical() { return this.Mode.startsWith('vertical') }
    get IsSideways() { return this.Mode.startsWith('sideways') }
}

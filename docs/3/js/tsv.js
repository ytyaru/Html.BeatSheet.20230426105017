(function() {
class Tsv {
    static async load(path) { return this.parse(path.includes('\n') ? path : await this.#loadFile(path)) }
    static async #loadFile(path) {
        const res = await fetch(path)
        return await res.text()
    }
    static parse(txt) { // objectに変換する
        const tsv = txt.trim().replace(/(\r?\n)+/g, '\n')
        console.debug(tsv)
        const lines = tsv.split('\n').map(l=>l.split('\t'))
        const header = lines.shift()
        return lines.map(l=>header.reduce((a, c, i, s)=>Object.assign(a, {[c]:l[i]}), {}))
    }
}
window.Tsv = Tsv
})()

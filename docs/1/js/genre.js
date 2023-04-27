(function() {
class Genre {
    constructor() { this.genres=null; this.workExamples=new Map(); this.genreSelect=null; this.subGenreSelect=null; }
    async setup() {
        if (!this.genres) { await this.#load() }
        this.#addGenreSelectOptions()
        this.#resetSubGenreSelect(this.genres[0].sid)
        this.genreSelect.dispatchEvent(new Event('change'))
        this.subGenreSelect.dispatchEvent(new Event('change'))
    }
    async reset() {
        if (!this.genres) { return }
        const genreId = document.getElementById('genre').value
        const genre = this.genres.filter(g=>g.sid===genreId)[0]
        document.getElementById('genre-summary').value = ('ja-jp'===Language.SelectedCode) ? genre.summaryJa : genre.summary
        const idx = genre.sub.indexOf(this.subGenreSelect.value)
        document.getElementById('sub-genre-ja').textContent = ('ja-jp'===Language.SelectedCode) ? genre.subJa[idx] : genre.triple.join(',')
        const links = [...document.querySelectorAll(`#genre-work-examples li a`)]
        const works = await this.#loadWorkExample(this.subGenreSelect.value)
        for (let i=0; i<links.length; i++) {
            const w = works[i]
            links[i].textContent = ('ja-jp'===Language.SelectedCode) ? ((w.nameJa) ? w.nameJa : w.nameEn) : w.nameEn
            links[i].href = ('ja-jp'===Language.SelectedCode) ? ((w.urlJa) ? w.urlJa : w.urlEn) : w.urlEn
        }
    }
    async #load() { await this.#loadGenres() }
    async #loadGenres() {
        if (this.genres) { return this.genres }
        this.genres = await Tsv.load(`locales/en-us/genre.tsv`)
        for (let i=0; i<this.genres.length; i++) {
            this.genres[i].triple = this.genres[i].triple.split(',')
            this.genres[i].sub = this.genres[i].sub.split(',')
            this.genres[i].subJa = this.genres[i].subJa.split(',')
        }
    }
    async #loadWorkExample(subGenreId) {
        if (!this.workExamples.has(subGenreId)) {
            const sid = document.getElementById('genre').value
            //const path = `locales/en/genre-works/${sid}/${subGenreId}.tsv`
            const path = `locales/en-us/genre-works/${sid}/${subGenreId}.tsv`
            this.workExamples.set(subGenreId, await Tsv.load(path))
        }
        return this.workExamples.get(subGenreId)
    }
    async #loadWorkExamples() { // 一気に50ファイル取得するため遅延が酷いので使わない
        for (let genre of this.genres) {
            for (let sub of genre.sub) {
                //const path = `locales/en/genre-works/${genre.sid}/${sub}.tsv`
                const path = `locales/en-us/genre-works/${genre.sid}/${sub}.tsv`
                this.workExamples.set(sub, await Tsv.load(path))
            }
        }
        // TSVファイル先頭にヘッダを一括追記した
        //    TARGET=/tmp/work/Html.Responsive.FontSize.20230412115805/docs/4/html/locales/en/genre-works/
        //    cd "$TARGET"
        //    find . -name '*.tsv' | xargs sed -i '1s/^/nameEn\turlEn\tnameJa\turlJa\n/'
    }
    #addGenreSelectOptions() {
        this.genreSelect = document.getElementById('genre')
        this.genreSelect.innerHTML = ''
        for (let i=0; i<this.genres.length; i++) {
            const option = document.createElement('option')
            option.textContent = this.genres[i].label
            option.value = this.genres[i].sid
            this.genreSelect.appendChild(option)
        }
        this.genreSelect.addEventListener('change', async(e) => {
            this.#resetSubGenreSelect(e.target.value)
            const genre = this.genres.filter(g=>g.sid===e.target.value)[0]
            //document.getElementById('genre-summary').value = genre.summaryJa
            document.getElementById('genre-summary').value = ('ja-jp'===Language.SelectedCode) ? genre.summaryJa : genre.summary
            document.getElementById('genre-emoji').textContent = genre.emoji
            document.getElementById('genre-icon').src = `asset/image/icon/genre/png/220x220/${genre.lid}.png`
            document.getElementById('genre-icon').title = genre.label
            //this.#resetTriple(genre.triple)
            await this.#resetWorkExamples(genre.sub[0])
        })
        this.subGenreSelect = document.getElementById('sub-genre')
        this.subGenreSelect.addEventListener('change', async(e) => {
            await this.#resetWorkExamples(e.target.value)
            const genreId = document.getElementById('genre').value
            const genre = this.genres.filter(g=>g.sid===genreId )[0]
            const idx = genre.sub.indexOf(e.target.value)
            //document.getElementById('sub-genre-ja').textContent = genre.subJa[idx]
            document.getElementById('sub-genre-ja').textContent = ('ja-jp'===Language.SelectedCode) ? genre.subJa[idx] : genre.triple.join(',')
        })
    }
    #resetSubGenreSelect(genreId) {
        if (this.genres.some(g=>g.sid===genreId)) {
            this.subGenreSelect = document.getElementById('sub-genre')
            const genre = this.genres.filter(g=>g.sid===genreId)[0]
            this.subGenreSelect.innerHTML = ''
            for (let sub of genre.sub) {
                const option = document.createElement('option')
                option.textContent = sub
                option.value = sub
                this.subGenreSelect.appendChild(option)
            }
            this.subGenreSelect.dispatchEvent(new Event('change'))
        }
    }
    async #resetWorkExamples(subGenreId) {
        const works = await this.#loadWorkExample(subGenreId)
        const ul = document.createElement('ul')
        ul.style = 'list-style-type:none;padding:0;margin:0;'
        for (let w of works) {
            const li = document.createElement('li')
            const a = document.createElement('a')
            li.style = 'display:inline-block;padding-right:1em;'
            a.textContent = ('ja-jp'===Language.SelectedCode) ? ((w.nameJa) ? w.nameJa : w.nameEn) : w.nameEn
            a.href = ('ja-jp'===Language.SelectedCode) ? ((w.urlJa) ? w.urlJa : w.urlEn) : w.urlEn
            li.appendChild(a)
            ul.appendChild(li)
        }
        document.getElementById('genre-work-examples').innerHTML = ''
        document.getElementById('genre-work-examples').appendChild(ul)
    }
    #resetTriple(triple) {
        const ul = document.createElement('ul')
        ul.style = 'list-style-type:none;'
        for (let t of triple) {
            const li = document.createElement('li')
            const a = document.createElement('a')
            li.style = 'display:inline-block;padding-right:1em;'
            li.textContent = t
            ul.appendChild(li)
        }
        document.getElementById('genre-triple').innerHTML = ''
        document.getElementById('genre-triple').appendChild(ul)
    }
}
window.Genre = new Genre()
})()

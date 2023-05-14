(function() {
class Language {
    constructor() {this.langs = {'en-us':{'flag':'🇺🇸','trans':null}, 'ja-jp':{'flag':'🇯🇵','trans':null}}; this.select = null;}
    async setup() {
        document.querySelector('#header').appendChild(this.#createSelect())
        this.#addEvent()
        this.load(this.Default)
        this.select.dispatchEvent(new Event('change'))
    }
    get Default() {
        let langs = Object.keys(this.langs).filter(l=>l.includes(window.navigator.language))
        return (0===langs.length) ? 'en-us' : langs[0]
    }
    get SelectedCode() { return this.select.value }
    get Selected() { return this.langs[this.select.value].trans }
    get IsJa() { return ('ja-jp'===this.SelectedCode) }
    get IsEn() { return ('en-us'===this.SelectedCode) }
    async load(lang) {
        if (lang && !this.langs[lang].trans) {
            const res = await fetch(`locales/${lang}/translation.json`)
            this.langs[lang].trans = await res.json()
        }
    }
    #createSelect() {
        this.select = document.createElement('select')
        this.select.id = 'language'
        for (let key of Object.keys(this.langs)) {
            const option = document.createElement('option')
            option.textContent = this.langs[key].flag + ' ' + key
            option.value = key
            this.select.appendChild(option)
        }
        let myLang = Object.keys(this.langs).filter(l=>l.includes(window.navigator.language))
        if (!myLang) { myLang = 'en-us' }
        this.select.value = this.Default
        this.select.dispatchEvent(new Event('change'))
        return this.select
    }
    #addEvent() {
        this.select.addEventListener('change', async(e) => {
            if (!this.langs[e.target.value].trans) {
                const res = await fetch(`locales/${e.target.value}/translation.json`)
                this.langs[e.target.value].trans = await res.json()
            }
            WorkSummary.reset(e.target.value)
            LoglineTable.reset(e.target.value)
            BeatSheetSummary.reset(e.target.value)
            BeatSheetDetails.reset(e.target.value)
            await Genre.reset(e.target.value)
            DropJson.reset()
        })
    }
}
window.Language = new Language()
})()

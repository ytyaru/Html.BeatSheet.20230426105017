(function() {
class Language {
    constructor() {this.langs = {'en-us':{'flag':'🇺🇸','trans':null}, 'ja-jp':{'flag':'🇯🇵','trans':null}}; this.select = null;}
    async setup() {
        document.querySelector('#header').appendChild(this.#createSelect())
        this.#addEvent()
        this.load(this.Default)
    }
    get Default() {
        let langs = Object.keys(this.langs).filter(l=>l.includes(window.navigator.language))
        return (0===langs.length) ? 'en-us' : langs[0]
    }
    async load(lang) {
        console.log(lang)
        console.log(this.langs[lang].trans)
        if (!this.langs[lang].trans) {
            const res = await fetch(`locales/${lang}/translation.json`)
            console.log(this.langs)
            console.log(lang)
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
        console.log(this.langs)
        console.log(window.navigator.language)
        let myLang = Object.keys(this.langs).filter(l=>l.includes(window.navigator.language))
        if (!myLang) { myLang = 'en-us' }
        this.select.value = this.Default
        this.select.dispatchEvent(new Event('change'))
        return this.select
    }
    #addEvent() {
        this.select.addEventListener('change', async(e) => {
            console.log(e.target.value)
            console.log(this.langs[e.target.value].trans)
            if (!this.langs[e.target.value].trans) {
                const res = await fetch(`locales/${e.target.value}/translation.json`)
                console.log(this.langs)
                console.log(e)
                console.log(e.target)
                console.log(e.target.value)
                this.langs[e.target.value].trans = await res.json()
            }
            LoglineTable.reset(e.target.value)
            BeatSheetSummary.reset(e.target.value)
            BeatSheetDetails.reset(e.target.value)
            Genre.reset(e.target.value)
        })
    }
}
window.Language = new Language()
})()



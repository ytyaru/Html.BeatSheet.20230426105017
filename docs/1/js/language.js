(function() {
class Language {
    constructor() {this.langs = {'en-us':{'flag':'🇺🇸','trans':null}, 'ja-jp':{'flag':'🇯🇵','trans':null}}; this.select = null;}
    setup() {
        //document.querySelector('header').appendChild(this.createSelect())
        document.querySelector('#header').appendChild(this.#createSelect())
        this.#addEvent()
    }
    #createSelect() {
        this.select = document.createElement('select')
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
        this.select.value = myLang
        this.select.dispatchEvent(new Event('change'))
        return this.select
    }
    #addEvent() {
        this.select.addEventListener('change', async(e) => {
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



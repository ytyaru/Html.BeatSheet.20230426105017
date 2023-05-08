(function() {
class WorkSummary {
    constructor() { 
        this.ids = ['title', 'theme', 'hook', 'central-question', 'logline', 'genre', 'synopsis']
        /*
        this.data = Tsv.parse(`id	label	placeholder	labelJa	placeholderJa
title	Title	Work name	タイトル	作品名
theme	Theme	A life lesson that the protagonist learns	テーマ	伝えたいこと（主人公が学ぶこと）
hook	Hook	Fun & Games. Grab the reader's attention	フック	ツカミ（Fun & Games）
central-question	CQ	Problems that the protagonist must solve	セントラルクエスチョン	主人公が解決すべき課題
logline	Logline	Who does what and how	ログライン	誰が、何して、こう変わる
synopsis	Synopsis	Synopsis	あらすじ	あらすじ`)
        */
        this.data = {
            'en-us': Tsv.parse(`id	label	placeholder
title	Title	Work name
theme	Theme	A life lesson that the protagonist learns
hook	Hook	Fun & Games. Grab the reader's attention
central-question	CQ	Problems that the protagonist must solve
logline	Logline	Who does what and how
genre	Genre	Work genre
synopsis	Synopsis	Synopsis`),
            'ja-jp': Tsv.parse(`id	label	placeholder
title	タイトル	作品名
theme	テーマ	伝えたいこと（主人公が学ぶこと）
hook	フック	ツカミ（Fun & Games）
central-question	セントラルクエスチョン	主人公が解決すべき課題
logline	ログライン	誰が、何して、こう変わる
genre	ジャンル	作品のジャンル
synopsis	あらすじ	あらすじ`)
        }
    }
    get Locale() { return ('ja'===window.navigator.language) ? 'ja-jp' : 'en-us' }
    setup() {
        this.container = document.getElementById('work-summary-container')
        console.log(this.data)
        this.container.appendChild(this.#makeStyle())
        for (let id of this.ids) {
            const data = this.data[Language.SelectedCode].filter(d=>d.id===id)[0]
            this.#makeUi(id, data)
        }
    }
    reset(locale) {
        for (let id of this.ids) {
            const data = this.data[Language.SelectedCode].filter(d=>d.id===id)[0]
            console.log(id, data)
            const label = this.container.querySelector(`label[for="${data.id}"]`)
            label.textContent = data.label
            const ui = this.container.querySelector(`input[id="${data.id}"], textarea[id="${data.id}"]`)
            ui.title = data.label
            ui.placeholder = data.placeholder
        }
    }
    #makeUi(id, data) {
        console.log(this.container)
        if ('genre'===id) {
            this.container.appendChild(this.#makeLabel(data))
//            this.container.appendChild(this.#makeLabel(data))
        }
        else if ('synopsis'===id) {
            //this.container.appendChild(this.#makeTextarea(data))
            this.container.appendChild(this.#makeFlexTextarea(data))
        }
        else {
            this.container.appendChild(this.#makeLabel(data))
            //this.container.appendChild(this.#makeInputText(data))
            this.container.appendChild(this.#makeFlexTextarea(data))
        }
    }
    #makeStyle() { return Html.create('style', null, this.#css()) }
    #makeLabel(data) {return Html.create('label', {'for':data.id}, data.label) }
    #makeInputText(data) {return Html.create('input', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder,'type':'text'}, this.#css()) }
    #makeTextarea(data) {return Html.create('textarea', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder}) }
    #makeFlexTextarea(data) {return createFlexTextarea(this.#makeTextarea(data))}
    #css() {
        return `#work-summary-container :is(input, textarea) { width:100%; }
`
    }
/*
    #makeStyle() {
        const style = document.createElement('style')
        style.textContent = this.#css()
        return style
    }
    #css() {
        return `#work-summary-container :is(input, textarea) { width:100%; }
`
    }
    #makeLabel(data) {
        const label = document.createElement('label')
        label.for = data.id
        label.textContent = data.label
        return label
    }
    #makeInputText(data) {
        const input = document.createElement('input')
        input.type = 'text'
        input.id = data.id
        input.name = data.id
        input.title = data.label
        input.placeholder = data.placeholder
//        input.style = 'width:100%;'
        return input
    }
    #makeTextarea(data) {
        const ta = document.createElement('textarea')
        ta.id = data.id
        ta.name = data.id
        ta.title = data.label
        ta.placeholder = data.placeholder
        return ta
    }
    
*/
}
window.WorkSummary = new WorkSummary()
})()
console.log('WorkSummary----------')

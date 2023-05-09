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
        this.#makeLayout()
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
    #makeLayout() {
        const layout = Html.create('div', {'id':'work-summary-layout'})
        const left = Html.create('div')
        const right = Html.create('div')
        for (let id of this.ids) {
            const data = this.data[Language.SelectedCode].filter(d=>d.id===id)[0]
            this.#makeRow(id, data, left, right)
        }
        layout.appendChild(left)
        layout.appendChild(right)
        this.container.appendChild(layout)
    }
    #makeRow(id, data, left, right) {
        const row = Html.create('div')
        if ('genre'===id) {
            row.appendChild(this.#makeLabel(data))
            left.appendChild(row)
        }
        else if ('synopsis'===id) {
            row.appendChild(this.#makeFlexTextarea(data))
            right.appendChild(row)
        }
        else {
            row.appendChild(this.#makeLabel(data))
            row.appendChild(this.#makeInputText(data))
//            row.appendChild(this.#makeFlexTextarea(data))
            left.appendChild(row)
        }
    }
    /*
    #makeUi(id, data) {
        const row = Html.create('div')
        if ('genre'===id) {
            row.appendChild(this.#makeLabel(data))
        }
        else if ('synopsis'===id) {
            row.appendChild(this.#makeTextarea(data))
            //row.appendChild(this.#makeFlexTextarea(data))
        }
        else {
            row.appendChild(this.#makeLabel(data))
            row.appendChild(this.#makeInputText(data))
//            row.appendChild(this.#makeFlexTextarea(data))
        }
        return row
        //this.container.appendChild(layout)
    }
    */
    #makeStyle() { return Html.create('style', null, this.#css()) }
    #makeLabel(data) { return Html.create('label', {'for':data.id}, data.label) }
    #makeInputText(data) {return Html.create('input', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder,'type':'text'}) }
//    #makeInputText(data) {return Html.create('input', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder,'type':'text','style':'display:table-cell;'}) }
    #makeTextarea(data) {return Html.create('textarea', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder}) }
    //#makeTextarea(data) {return Html.create('textarea', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder,'style':'display:table-cell;'}) }
    #makeFlexTextarea(data) {return createFlexTextarea(this.#makeTextarea(data))}
    #css() {
        return `#work-summary-container :is(input, textarea) { width:100%; display:table-cell; }
#work-summary-container :is(label, input, textarea) { display:table-cell; }
:root { --work-summary-layout-columns:2; }
#work-summary-layout {
    display:grid;
    grid-template-columns:repeat(var(--work-summary-layout-columns), 1fr);
}
#work-summary-layout > div {
    display:table-row;
}
`
    }
}
window.WorkSummary = new WorkSummary()
})()

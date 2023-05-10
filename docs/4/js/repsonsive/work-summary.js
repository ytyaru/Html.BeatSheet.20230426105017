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
central-question	ｾﾝﾄﾗﾙ･ｸｴｽﾁｮﾝ	主人公が解決すべき課題
logline	ログライン	誰が、何して、こう変わる
genre	ジャンル	作品のジャンル
synopsis	あらすじ	あらすじ`)
        }
    }
    get Locale() { return ('ja'===window.navigator.language) ? 'ja-jp' : 'en-us' }
    setup(writingMode, inlineSize, blockSize) {
        console.log('work-summary.setup(): aaaaaaa', writingMode, inlineSize, blockSize)
        this.container = document.getElementById('work-summary-container')
        console.log(this.data)
        this.container.appendChild(this.#makeStyle(inlineSize))
        this.#makeLayout()
        console.log(Css.get('--work-summary-layout-columns'), inlineSize)
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
        const table = Html.create('div', {'id':'work-summary-table'})
//        const left = Html.create('div', {'style':''})
//        const right = Html.create('div')
        for (let id of this.ids) {
            const data = this.data[Language.SelectedCode].filter(d=>d.id===id)[0]
            this.#makeRow(id, data, table, right)
        }
        //layout.appendChild(left)
        left.appendChild(table)
        layout.appendChild(left)
        layout.appendChild(right)
        this.container.appendChild(layout)
        this.#setLabelWidth(layout)
    }
    #makeRow(id, data, table, right) {
        const row = Html.create('div')
        if ('genre'===id) {
            row.appendChild(this.#makeLabel(data))
            //left.appendChild(row)
            table.appendChild(row)
            //table.appendChild(left)
        }
        else if ('synopsis'===id) {
            //row.appendChild(this.#makeFlexTextarea(data))
//            row.appendChild(this.#makeTextarea(data))
//            right.appendChild(row)
            right.appendChild(this.#makeTextarea(data))
        }
        else {
            row.appendChild(this.#makeLabel(data))
            row.appendChild(this.#makeInputText(data))
//            row.appendChild(this.#makeFlexTextarea(data))
            //left.appendChild(row)
            table.appendChild(row)
            //table.appendChild(left)
        }
    }
    #setLabelWidth(layout) {
        const width = Math.max(...[...layout.querySelectorAll('label')].map(l=>l.width))
        console.log([...layout.querySelectorAll('label')])
        console.log([...layout.querySelectorAll('label')].map(l=>l.width))
        console.log([...layout.querySelectorAll('label')].map(l=>Css.get('width', l)))
        console.log(`----work-summary-label-width: ${width}px`)
        Css.set('----work-summary-label-width', `${width}px`)
        for (let l of layout.querySelectorAll('label')) { Css.set('width', `${width}px`, l) }
    }
    #makeStyle(inlineSize) { return Html.create('style', null, this.#css(inlineSize)) }
    #makeLabel(data) { return Html.create('label', {'for':data.id}, data.label) }
    #makeInputText(data) {return Html.create('input', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder,'type':'text'}) }
//    #makeInputText(data) {return Html.create('input', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder,'type':'text','style':'display:table-cell;'}) }
    #makeTextarea(data) {return Html.create('textarea', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder}) }
    //#makeTextarea(data) {return Html.create('textarea', {'id':data.id,'name':data.id.Camel,'title':data.label,'placeholder':data.placeholder,'style':'display:table-cell;'}) }
    #makeFlexTextarea(data) {return createFlexTextarea(this.#makeTextarea(data))}
//#work-summary-container :is(label, input, textarea) { display:table-cell; }
    #css(inlineSize) {
        return `#work-summary-container :is(label) { display:table-cell; width:0; height:100%; white-space:nowrap; padding:0; margin:0; }
#work-summary-container :is(input, textarea) { display:table-cell; width:100%; height:100%; padding:0; margin:0; }
:root { --work-summary-layout-columns:${(inlineSize<=768) ? 1 : 2}; ----work-summary-label-width:100px; }
#work-summary-layout {
    display:grid;
    grid-template-columns:repeat(var(--work-summary-layout-columns), 1fr);
    padding:0; margin:0; 
}
#work-summary-table { display:table; width:100%; height:100%; padding:0; margin:0; }
#work-summary-table > div { display:table-row; width:100%; height:100%; padding:0; margin:0; }
`
    }
}
window.WorkSummary = new WorkSummary()
})()

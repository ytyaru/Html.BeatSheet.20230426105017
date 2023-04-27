(function() {
class LoglineTable {
    constructor() { this.tables = new Map() }
    async setup() {
        const table = document.getElementById('logline-table')
        table.parentElement.insertBefore(this.#makeStyle(), table), 
        this.#setInputWidth()
        this.#setupEvent()
    }
    #makeStyle() {
        const style = document.createElement('style')
        const css = `:root { --logline-table-input-width:50vw; --logline-table-display:inherit; }
#logline-table { width:100%; border-collapse:collapse; display:var(--logline-table-display);}
#logline-table :is(table,tr,td,input) { padding:0; margin:0; }
/*#logline-table tr td input[type=text] { width:var(--logline-table-input-width); }*/
#logline-table tr td:nth-child(1) { width:var(--logline-table-input-width); }
#logline-table.ja-jp tr td:nth-child(1) { width:var(--logline-table-input-width); background:#FF0000; }
#logline-table.en-us tr td:nth-child(2) { width:var(--logline-table-input-width); background:#FFFF00; }
#logline-table tr td { white-space:nowrap; }
#logline-table tr td input[type=text] { width:100%; display:table-cell; }
`
        style.textContent = css
        return style
    }
    #setInputWidth() {
        const firstTd = document.querySelector('#logline-table tr td:first-child')
        const firstLeft = firstTd.getBoundingClientRect().left
        const spans = [...document.querySelectorAll('#logline-table tr td span')]
        const spanWidth = Math.max(...spans.map(span=>span.getBoundingClientRect().right - span.getBoundingClientRect().left))
        const width = `calc(50vw - ${firstLeft}px - ${spanWidth}px)`
        console.log(width)
        document.querySelector(':root').style.setProperty('--logline-table-input-width', width)
    }
    /*
    #setInputWidth() {
        const firstTd = document.querySelector('#logline-table tr td:first-child')
        const firstLeft = firstTd.getBoundingClientRect().left
        console.log([...document.querySelectorAll('#logline-table tr td span')])
        console.log([...[...document.querySelectorAll('#logline-table tr td span')].map(span=>span.getBoundingClientRect().right - span.getBoundingClientRect().left)])
        console.log(Math.max(...[...[...document.querySelectorAll('#logline-table tr td span')].map(span=>span.getBoundingClientRect().right - span.getBoundingClientRect().left)]))
        const spanWidth = Math.max(...[...[...document.querySelectorAll('#logline-table tr td span')].map(span=>span.getBoundingClientRect().right - span.getBoundingClientRect().left)])
        const width = `calc(50vw - ${firstLeft}px - ${spanWidth}px)`
        document.querySelector(':root').style.setProperty('--logline-table-input-width', width)
    }
    */
    #setupEvent() {
        const ui = document.getElementById('is-show-logline-table')
        ui.addEventListener('change', async(event) => {
            document.querySelector(':root').style.setProperty('--logline-table-display', (event.target.checked) ? 'inherit' : 'none')
            //this.#getInputWidth(event.target.checked) 
        })
        ui.checked = false
        ui.dispatchEvent(new Event('change'))
    }
    reset(lang) {
        if (!this.tables.has(lang)) { this.tables.set(lang, this.#createTable(lang)) }
        document.getElementById('logline-table-container').innerHTML = ''
        document.getElementById('logline-table-container').appendChild(this.tables.get(lang))
        this.#setInputWidth()
    }
    #createTable(lang) {
        const table = document.createElement('table')
        table.id = 'logline-table'
        table.classList.add(lang)
        const ids = ['stasis-death', 'flawed-protagonist', 'break-into-2', 'modpoint-happen', 'all-is-lost', 'theme']
        const colors = ['pink', 'pink', 'green', 'green', 'green', 'blue', 'green']
        if ('en-us'===lang) { ids.splice(4, 'he-she'); colors.splice(4, 'green');  }
        for (let i=0; i<ids.length; i++) {
            //const method = ('ja-jp'===lang) ? this.#createTrJa : this.#createTrEn
            //table.appendChild(method.call(this, lang, `logline-${ids[i]}`, colors[i]))
            table.appendChild(this.#createTr(lang, `logline-${ids[i]}`, colors[i]))
        }
        return table
    }

    #createTr(lang, id, color) {
        const label = Language.langs[lang].trans.form.label[id]
        const placeholder = Language.langs[lang].trans.form.placeholder[id]
        console.log(lang, id, color, label, placeholder)
        const tds = [this.#createTdInput, this.#createTdSpan]
        const tdParams = [[id, placeholder], [label]]
        if ('en-us'===lang) { tds.reverse(); tdParams.reverse(); }
        const tr = document.createElement('tr')
        tr.classList.add(color)
        for (let i=0; i<tds.length; i++) {
            tr.appendChild(tds[i].call(this, ...tdParams[i]))
        }
        return tr
    }
    #createTrJa(lang, id, color) {
        const tr = document.createElement('tr')
        const label = Language.langs[lang].trans.form.label[id]
        const placeholder = Language.langs[lang].trans.form.placeholder[id]
        tr.classList.add(color)
        tr.appendChild(this.#createTdInput(id, placeholder))
        tr.appendChild(this.#createTdSpan(label))
        return tr
    }
    #createTrEn(item) {
        const tr = document.createElement('tr')
        const label = Language.langs[lang].trans.form.label[id]
        const placeholder = Language.langs[lang].trans.form.placeholder[id]
        tr.classList.add(color)
        tr.appendChild(this.#createTdInput(id, placeholder))
        tr.appendChild(this.#createTdSpan(label))
        return tr
    }
    #createTdSpan(text) {
        const td = document.createElement('td')
        const span = document.createElement('span')
        span.textContent = (text) ? text : ''
        td.appendChild(span)
        return td
    }
    #createTdInput(id, item) {
        const td = document.createElement('td')
        /*
        if ('he-she'===id) { td.appendChild(this.#createTdHeSheSelect(id)) }
        else {
            const input = document.createElement('input')
            input.id = id
            input.name = id
            input.placeholder = text
            td.appendChild(input)
        }
        */
        td.appendChild(('he-she'===id) ? this.#createTdHeSheSelect(id) : this.#createInput(id, item))
        return td
    }
    #createInput(id, placeholder) {
        const input = document.createElement('input')
        input.id = id
        input.name = id
        input.placeholder = placeholder
        return input
    }
    #createTdHeSheSelect(id) {
        const select = document.createElement('select')
        select.id = id
        select.name = id
        for (let value of ['he', 'she']) {
            const option = document.createElement('option')
            option.value = value
            option.textContent = value
            select.appendChild(option)
        }
        return select
    }
}
window.LoglineTable = new LoglineTable()
})()

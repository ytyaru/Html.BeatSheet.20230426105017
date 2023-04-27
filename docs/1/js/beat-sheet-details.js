(function() {
class BeatSheetDetails {
    constructor() { }
    reset() {
        // ラベル設定
        for (let el of document.querySelectorAll(`input[type=checkbox], input[type=radio]`)) {
            console.debug(Language.Selected)
            if (Language.Selected.form.label.hasOwnProperty(el.value)) {
                console.debug(el.value)
                el.parentElement.querySelector('span').textContent = Language.Selected.form.label[el.value]
            }
        }
        for (let el of document.querySelectorAll(`button`)) {
            console.debug(el.id, Language.Selected.form.label.hasOwnProperty(el.id))
            if (Language.Selected.form.label.hasOwnProperty(el.id)) {
                el.textContent = Language.Selected.form.label[el.id]
            }
        }
        // プレースホルダー設定
        for (let el of document.querySelectorAll(`input[type=text], textarea`)) {
            if (Language.Selected.form.placeholder.hasOwnProperty(el.name)) {
                el.setAttribute('placeholder', Language.Selected.form.placeholder[el.name])
            }
        }
    }
    setup() {
        // 連動ラジオボタン
        const interactions = {
            'false-victory': 'bad-guys-close-in-despire',
            'false-defert': 'bad-guys-close-in-hope',
            'team-assembles': 'storming-the-castle-despire',
            'team-abandons-hero': 'storming-the-castle-hope'
        }
        for (let key of Object.keys(interactions)) {
            const value = interactions[key]
            const senders = [key, value].map(v=>`input[type=radio][value="${v}"]`)
            const receivers = senders.slice().reverse()
            for (let i=0; i<2; i++) {
                document.querySelector(senders[i]).addEventListener('change', (e) => {
                    document.querySelector(receivers[i]).checked = true
                })
            }
        }
    }
}
window.BeatSheetDetails = new BeatSheetDetails()
})()


(function() {
class WorkSummaryGenre {
    constructor() { 
        this.options = Tsv.parse(`sid	lid	emoji   subs
mith	monster-in-the-house	😈
gf	golden-fleece	🐑
ootb	out-of-the-bottle	📜
dwap	dude-with-a-problem	⚔️
rop	rites-of-passage	👶
bl	buddy-love	💑
wd	whydunit	🕵
ft	fool-triumphant	🤡
i	institutionalized	🏙️
sh	superhero	💪`)
        this.trans = {
            'en-us': Tsv.parse(`sid	label	triple	subs	summary
mith	Monster In The House	Monster,House,Sin	pure-monster,domestic-monster,serial-monster,supra-natural-monster,nihilist-monster	Someone Sin brings a monster to the house
gf	Golden Fleece	Road,Team,Prize	sports-fleece,buddy-fleece,epic-fleece,caper-fleece,solo-fleece	The protagonist travels by the team and grows with new technologies, experiences, attitudes, etc. and gains award
ootb	Out of the Bottle	Wish,Spell,Lesson	body-switch-bottle,angel-bottle,thing-bottle,curse-bottle,surreal-bottle	Learn lessons in a terrible situation due to the rules that should be activated and protected according to the hero's wishes
dwap	Dude with a Problem	Innocent Hero,Sudden Event,Life or Death Battle	spy-problem,law-enforcement-problem,domestic-problem,epic-problem,nature-problem	The innocent hero gets involved in a battle that bets on life and death by a sudden event
rop	Rites of Passage	Life Problem,Wrong Way,Acceptance	mid-life-passage,separation-passage,death-passage,addiction-passage,adolescent-passage	Passing ceremony. Even though he approaches the mysterious difficulties in life, they accept the truth and change themselves, not the world.
bl	Buddy Love	Incomplete Hero,Counterpart,Complication	pet-love,professional-love,rom-com-love,epic-love,forbidden-love	Love with my partner. The protagonist, who lacks something, has complex problems such as meeting the other person who supplements it, misunderstanding, differences in ethics, values and views, and dismissal by social rude.
wd	WhyDunit	Detective,Secret,Dark Turn	political-whydunit,fantasy-whydunit,cop-whydunit,personal-whydunit,noir-whydunit	Detectives overwhelm all the secular temptation to explore the secrets, and finally break the rules.
ft	Fool Triumphant	Fool,Establishment,Transmutation	political-fool,undercover-fool,society-fool,fool-out-of-water,sex-fool	An innocent and stupid hero is sent to a place that does not suit him, but is reborn by accident, impersonation, misunderstanding, etc.
i	Institutionalized	Group,Choice,Sacrifice	military-institution,family-institution,business-institution,mentor-institution,issue-institution	Something group is forced to make a great choice and sacrifice (conflict with family and organizations, etc., and finally the protagonist is sacrificed, such as participating in the organization, committing suicide, or burning an organization).
sh	SuperHero	Special Power,Nemesis,Curse	real-life-superhero,storybook-superhero,fantasy-superhero,peoples-superhero,comic-book-superhero	The protagonist has a special power and has a nemesis and pays for some kind of price (trials, curses, etc.)`),
            'ja-jp': Tsv.parse(`sid	label	triple	subs	summary
mith	家に怪物	怪物,罪,家	純粋な怪物,家庭内に入る怪物,連続殺人鬼,超常現象,狂気殺人鬼	誰かが何かの罪を犯して安全地帯に危険を持ち込む
gf	羊毛	旅路,仲間,賞	スポーツ,相棒,叙事詩（歴史的事件、英雄譚）,強盗,伝記	主人公はチームによって導かれ旅をし新たな技術・経験・態度などを体得して成長し、賞を得る（家に帰る、宝を得る、生存権を得る等）
ootb	瓶詰め	願い,呪い,教訓	人格入替,天使,物,呪い,シュール（非現実的）	主人公の願いに応じて呪文が発動し守られるべきルールが敷かれ酷い事態になって教訓を学ぶ
dwap	問題を抱えた男	主人公,突然の事件,人生	スパイ,法的処置（困難に立ち向かい正義を貫く）,家庭,叙事詩（歴史的事件、英雄譚）,自然災害	無垢な主人公が突然の出来事により生死を賭けた戦いに巻き込まれる
rop	通過儀礼	人生の問題,間違った道,受け入れること	中年,分離,死,依存症,思春期	通過儀礼。人生における不可解な困難に対して間違ったアプローチをするも、真実を受け入れて世界でなく自分を変える。
bl	相棒との愛	不完全な主人公,補う相棒,交錯	ペット,職業,ロマンティックコメディ,叙事詩（歴史的事件、英雄譚）,禁断	相棒愛。何かが欠けている主人公は、それを補う相手と出会い、誤解、倫理・価値観・見解の相違、壮大な歴史的事件、社会的無礼による不承認などの複雑な問題が起きる。
wd	推理	探偵,秘密,暗転	政治,幻想,警官,個人,フィルム・ノワール（破滅的、悲観的、犯罪）	探偵が秘密を探るため、あらゆる世俗的な誘惑すらも圧倒して、ついには規則すら破る。
ft	愚者の勝利	愚者,支配制度,人生変化	政治,おとり捜査（なりすまし、身分詐称）,社会,人を笑いものにする,性	無邪気で愚かな主人公は彼に合わない場所に送られるも偶然・偽装・誤解などによって生まれ変わる
i	制度	集団,選択,犠牲	軍事,家族,仕事,師匠,問題	何らかのグループによって大きな選択を迫られ犠牲を払う（家族や組織などとの間で対立し、最後に主人公は組織に参加するか、自殺するか、組織を燃やすなどの犠牲を払う）
sh	超人	特殊能力,宿敵,呪い	実生活,絵本,幻想,大衆,漫画	主人公は異能を持っており宿敵がいて何らかの代償を支払っている（試練や屈服する呪い等）`)
        }
        for (let lang of Object.keys(this.trans)) {
            this.trans[lang].triple = this.trans[lang].triple.split(',')
            this.trans[lang].subs = this.trans[lang].subs.split(',')
        }
    }
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

        }
        else if ('synopsis'===id) {
            this.container.appendChild(this.#makeTextarea(data))
        }
        else {
            this.container.appendChild(this.#makeLabel(data))
            this.container.appendChild(this.#makeInputText(data))
        }
    }
    #makeStyle() { return Html.create('style', null, this.#css()) }
    #makeLabel(data) { return return Html.create('label', {id:data.id}, data.label) }
    #makeInputText(data) { return Html.create('input', {id:data.id, name:data.name, title:data.label, placeholder:data.placeholder}) }
    #makeTextarea(data) { return Html.create('textarea', {id:data.id, name:data.name, title:data.label, placeholder:data.placeholder}) }
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
window.WorkSummaryGenre = new WorkSummaryGenre()
})()

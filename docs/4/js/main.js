window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    await Language.load(Language.Default)
    BeatSheetDetails.setup()
    Promise.all([Genre.setup(), BeatSheetSummary.setup(), LoglineTable.setup()])
    document.querySelectorAll('textarea.flex').forEach(setupFlexTextarea)
    Downloader.setup()
    DropJson.setup()
    await Language.setup()

    console.log('inlineSize: ', Css.get('inline-size', Html.Root))
    console.log('inlineSize: ', Css.get('width', Html.Root))

    console.log('HtmlResizeObservable.set()')
    HtmlResizeObservable.set()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});


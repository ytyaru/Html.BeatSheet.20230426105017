window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    await Language.load(Language.Default)
    BeatSheetDetails.setup()
    Promise.all([Genre.setup(), BeatSheetSummary.setup(), LoglineTable.setup()])
    document.querySelectorAll('textarea.flex').forEach(setupFlexTextarea)
    Downloader.setup()
    DropJson.setup()
    await Language.setup()
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});


(function() {
class Language {
    get SelectedCode() { return document.getElementById('language').value }
}
window.Language = new Language()
})()

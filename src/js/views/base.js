export const renderNav = (html, parent) => {
    if (html) {
        let parentDiv = parent || document.body;
        parentDiv.insertAdjacentHTML('beforebegin', html);
        return;
    }
    console.log(`${html} is undifinded!`);
}
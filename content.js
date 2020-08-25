const colors = {
    'tipi-development': '#008000',
    'goki-staging': '#ff6f00',
    'goki-production': '#ff0000',
}
function queryParser(url) {
    const query = {}
    new URL(url).search.split('?')[1].split('&').map(param => {
        const [key, value] = param.split("=")
        query[key] = value
    })
    return query
}

function setBackgroundColorToBar(){
    if(window.location.host === "console.cloud.google.com"){
        const { project } = queryParser(window.location.href)
        let color = colors[project] || '#1a73e8'
        const bars = document.getElementsByClassName('cfc-platform-bar-container')
        if(bars[0]) bars[0].style.background = color
        for (const el of document.getElementsByTagName('a')){
            el.style.color = color
        }
        for (const el of document.getElementsByClassName('cfc-ng2-region mat-primary.mat-button[sandboxuid="0"]')){
            el.style.color = color
        }
    }
    return true
}

let oldHref = document.location.href;
window.onload = function() {
    const bodyList = document.querySelector("body")
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function() {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                setBackgroundColorToBar()
            }
        });

    });

    const config = { childList: true, subtree: true };
    observer.observe(bodyList, config);
    setBackgroundColorToBar()
};

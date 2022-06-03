Vue.component("top-bar", {
    props: {
        version: String
    },
    template: `
    <header>
        <menu-button @toggle-menu="$emit('menu')"></menu-button>
        <div class="title">
            AD Save Bank
        </div>
        <div class="about">
            <span class="version">{{version}}</span>
            <span class="link">
                 | <a target="_blank" href="changelog.html" class="link">Changelog</a>
                 | <a target="_blank" href="https://github.com/Buck4437/save-bank" class="link">Github</a>
            </span>
        </div>
    </header>
    `
});

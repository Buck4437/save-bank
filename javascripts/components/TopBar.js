"use strict";

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
                 | <a target="_blank" href="info.html" class="link">Info</a>
            </span>
        </div>
    </header>
    `
})

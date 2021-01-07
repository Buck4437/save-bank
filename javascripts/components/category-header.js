"use strict";

Vue.component("category-header", {
    template: `
    <div class="cat-header">
        <div class="cat-info">
            <span class="cat-title">{{title}}</span>
            <span class="cat-desc"><i><slot/></i></span>
        </div>
        <slot name="buttons"/>
    </div>
    `,
    props: {
        title: {
            default: "",
            type: String
        }
    }
})

"use strict";

Vue.component("category-header", {
    props: {
        title: {
            default: "",
            type: String
        }
    },
    template: `
    <div class="cat-header">
        <div class="cat-info">
            <span class="cat-title">{{title}}</span>
            <span class="cat-desc"><i><slot name="description"/></i></span>
        </div>
        <div class="cat-btn">
            <slot name="buttons"/>
        </div>
    </div>
    `
})

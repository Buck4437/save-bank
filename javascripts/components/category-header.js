"use strict";

Vue.component("category-header", {
    template: `
    <div class="cat-header">
        <div class="cat-info">
            <span class="cat-title">{{title}}</span>
            <span class="cat-desc"><i><slot/></i></span>
        </div>
        <button v-if="showButton" class="cat-btn" @click="$emit('click')">
            {{button}}
        </button>
    </div>
    `,
    props: {
        showButton: {
            default: true,
            type: Boolean
        },
        title: {
            default: "",
            type: String
        },
        button: {
            default: "",
            type: String
        }
    }
})

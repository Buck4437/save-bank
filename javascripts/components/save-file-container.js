"use strict";

Vue.component("save-file-container", {
    template: `
    <div class="file-con">
        <div class="file-text-con">
            <div class="file-name">
                {{saveFile.name}}
            </div>
            <span class="pre-formatted file-desc">
                <i>{{saveFile.desc || "No description provided."}}</i>
            </span>
        </div>
        <div class="file-btn-con">
            <save-file-button-copy :data="saveFile.data"/>
            <save-file-button-export :saveFile="saveFile"/>
            <slot name="extra-buttons">
            </slot>
        </div>
    </div>
    `,
    props: {
        saveFile: Object
    }
})

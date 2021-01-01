"use strict";

Vue.component("save-file-custom-container", {
    template: `
    <div>
        <save-file-container :save-file="saveFile">
            <template v-slot:extra-buttons>
                <button class="file-btn" @click="showEditModel = true">Edit</button>
                <button class="file-btn warning" @click="showDeleteModel = true">Delete</button>
            </template>
        </save-file-container>
        <modal-input v-if="showEditModel" :fields="fields" :default="saveFile"
                    @submit="submit" @close="closeEdit">
                    <template v-slot:header>
                        Edit save info:
                    </template>
        </modal-input>
        <modal-confirm v-if="showDeleteModel" @yes="confirm(true)" @no="confirm(false)">
                    Are you sure you want to delete this save file ({{saveFile.name}})?
                    <span class="warning">THIS CANNOT BE UNDONE!</span>
        </modal-confirm>
    </div>
    `,
    props: {
        saveFile: Object
    },
    data() {
        return {
            fields: ["Name", "Desc", "Data"],
            showEditModel: false,
            showDeleteModel: false
        }
    },
    methods: {
        closeEdit() {
            this.showEditModel = false;
        },
        submit(newSaveFile) {
            this.closeEdit();
            this.$emit("edit", newSaveFile)
        },
        confirm(confirm) {
            this.showDeleteModel = false;
            if (confirm) {
                this.$emit("delete");
            }
        }
    }
})

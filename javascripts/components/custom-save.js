"use strict";

Vue.component("custom-save", {
    template: `
    <div>
        <save-file-container :save-file="saveFile">
            <template v-slot:extra-buttons>
                <button class="file-btn" @click="edit(i)">Edit</button>
                <button class="file-btn warning" @click="showDeleteModel = true">Delete</button>
            </template>
        </save-file-container>
        <modal-input v-if="showEditModel" :fields="fields"
                    @submit="submit" @close="close('.custom-save-input-modal')"
                    :default="inputDefault" style="display: none;"
                    class="custom-save-input-modal">
                    <template v-slot:header>
                        {{inputHeader}}
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
    computed: {

    },
    methods: {
        confirm(del) {
            this.showDeleteModel = false;
            if (del) {
                this.$emit("delete")
            }
        }
    },
    mounted() {
    }
})

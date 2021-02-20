"use strict";

Vue.component("custom-save-file", {
    props: {
        saveFile: Object
    },
    data() {
        return {
            showModal: {
                edit: false,
                delete: false
            }
        }
    },
    methods: {
        setModal(name, state) {
            this.showModal[name] = state;
        },
        submit(newSaveFile) {
            this.setModal("edit", false);
            this.$emit("edit", newSaveFile);
        },
        deleteFile() {
            this.setModal('delete', false)
            this.$emit('delete');
        }
    },
    template: `
    <div class="custom-save-con">
        <save-file :save-file="saveFile">
            <template #extra-buttons>
                <button class="file-btn" @click="setModal('edit', true)">
                    Edit
                </button>
                <button class="file-btn warning" @click="setModal('delete', true)">
                    Delete
                </button>
            </template>
        </save-file>

        <input-modal v-if="showModal.edit"
                     :value="saveFile"
                     header="Edit save info:"
                     @submit="submit"
                     @close="setModal('edit', false)"/>

        <confirmation-modal v-if="showModal.delete"
                            @yes="deleteFile"
                            @no="setModal('delete', false)">
            Are you sure you want to delete this save file ({{saveFile.name}})? <span class="warning">This cannot be undone!</span>
        </confirmation-modal>
    </div>
    `
})

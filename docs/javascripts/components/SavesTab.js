Vue.component("saves-tab", {
    props: {
        category: Object,
        sortMode: Number
    },
    data() {
        return {
            desc: ""
        };
    },
    methods: {
        updateText() {
            this.desc = this.category.getDesc();
        }
    },
    mounted() {
        this.updateText();
        // To save performance
        if (this.category.glitched) {
            setInterval(this.updateText, 50);
        }  
    },
    template: `
    <div class="tab file-list">
        <tab-header :title="category.name">
            <template #description>
                <span class="pre-formatted">{{desc}}</span>
            </template>

            <template #buttons>
                <button @click="$emit('switch-sort')">
                    Ordering: {{category.getSortModeName(sortMode)}}
                </button>
            </template>
        </tab-header>
        <div v-if="!category.hasSaves()"
             class="no-saves">
            {{category.placeholder}}
        </div>
        <div v-else>
            <save-file v-for="(saveFile, i) in category.getSortedSaves(sortMode)"
                       class="save-file"
                       :save-file="saveFile"
                       :class="'category-theme-' + category.theme + (i % 2 == 1 ? '-background' : '-background-odd')"
                       :key="i">
            </save-file>
        </div>
    </div>
    `
});

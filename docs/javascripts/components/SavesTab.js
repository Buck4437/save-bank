Vue.component("saves-tab", {
    props: {
        category: Object,
        sortMode: Number
    },
    data() {
        return {
            desc: "",
            interval: null
        };
    },
    computed: {
        isGroupedCategory() {
            return this.category instanceof Saves.CategoryGrouped;
        }
    },
    methods: {
        updateText() {
            this.desc = this.category.getDesc();
        },
        mountInterval() {
            // To save performance
            if (this.category.glitched) {
                this.interval = setInterval(this.updateText, 50);
            }  
        }
    },
    watch: {
        category() {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            this.updateText();
            this.mountInterval();
        }
    },
    mounted() {
        this.updateText();
        this.mountInterval();
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
        <div v-else-if="isGroupedCategory">
            <saves-list-grouped :category="category"
                                :sortMode="sortMode"/>
        </div>
        <div v-else>
            <saves-list :category="category"
                        :sortMode="sortMode"/>
        </div>
    </div>
    `
});

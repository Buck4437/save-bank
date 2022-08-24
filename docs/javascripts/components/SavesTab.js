Vue.component("saves-tab", {
    props: {
        category: Object,
        sortMode: Number
    },
    template: `
    <div class="tab file-list">
        <tab-header :title="category.name">
            <template #description>
                <span class="pre-formatted">{{category.desc}}</span>
            </template>

            <template #buttons>
                <button v-if="!category.isAutomatorMode" 
                        @click="$emit('switch-sort')">
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
                       :isAutomatorMode="category.isAutomatorMode"
                       :class="i % 2 == 1 ? category.color + '-background' : ''"
                       :key="i">
            </save-file>
        </div>
    </div>
    `
});

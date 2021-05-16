export default {
    template: `
    <button class="menu-btn" @click="$emit('toggle-menu')">
        <span class="menu-btn-inner top"/>
        <span class="menu-btn-inner mid"/>
        <span class="menu-btn-inner bot"/>
    </button>
    `
};

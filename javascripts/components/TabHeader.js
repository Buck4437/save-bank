export default {
    props: {
        title: {
            default: "",
            type: String
        }
    },
    template: `
    <div class="tab-header">
        <div class="info">
            <span class="title">{{title}}</span>
            <span class="desc"><slot name="description"/></span>
        </div>
        <div class="btn-con">
            <slot name="buttons"/>
        </div>
    </div>
    `
};

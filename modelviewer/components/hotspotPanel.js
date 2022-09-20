export default {
    template : document.getElementById('Hotspot-Panel-Tpl').outerHTML,
    props : {
        hotspots : null,
        activeIndex : -1,
        devices:[],
    },
    data(){
        return {}
    },
    methods: {
        selectHotspot(e, htp, idx){
            this.$emit('choosespot', htp,  this.activeIndex === idx ? -1 : idx);
        }
    }
}
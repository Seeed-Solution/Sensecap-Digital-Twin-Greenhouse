import "./index.scss";
import HotspotPanel from "./components/hotspotPanel";
import {
    getGroupDevices, 
    getDevicesChannels, 
    getDeviceData, 
    getDevicesInfo, 
    getMeasurementData,
    getSensorTypeName,
} from "../utils/hooks.js"
import {
    useModelProgress,
    // useModelLoaded,
    setCamera,
    getCameraPos,
    getCameraOrbit,
    useCameraChange,
    useInteractStop
} from "../utils/model"


import { 
    HTP_CONFIG, 
    INITIAL_CAMERA_CONFIG,
    VISIBLE_CONFIG_PANEL, 
    VISIBLE_CONFIG_JSON,
    VISIBLE_HOTSPOT_PANEL,
    UPDATE_DEVICE_GAP,
    LIMIT_SCREEN_WIDTH
} from "./config";

function main() {
    const GROUP_UUID = import.meta.env.V__GROUP_UUID;
    new Vue({
        components : {HotspotPanel},
        data() {
            return {
                visibleConfigPanel : VISIBLE_CONFIG_PANEL,
                visibleConfigJSON : VISIBLE_CONFIG_JSON,
                visibleHotspotPanel: VISIBLE_HOTSPOT_PANEL,
                visibleHotspots: false,
                visibleSideBtn : true,
                enabledConfig: false,
                enableAdd: false,
                progress: 0,
                progressText: '',
                enableControl: false,
                activeSpot: -1,
                interpolationDecay: 80,
                enableInteractionPrompt : false, // 打开手势提示
                enableAutoRotate : true , // 自动旋转
                enablePan : true, // 双指
                enableCameraControl : true, // 相机控制
                disableZoom : false,
                modelViewId: 'model-viewer-comp',
                devices:null,
                hotspots: HTP_CONFIG,
                screenWidth : 0,
            }
        },
        mounted() {
            var _this = this;
            let $modelViewer = document.getElementById(_this.modelViewId);
            useModelProgress($modelViewer, (progress) => { _this.progress =  progress});
            const tt = setInterval(() => {
                _this.progressText = (_this.progress * 100).toFixed(0) + '%';
                if (_this.progress === 1) {   
                    setTimeout(() => {
                        _this.visibleHotspots = true;
                        _this.$nextTick(function () {  setTimeout(() => {setCamera($modelViewer, INITIAL_CAMERA_CONFIG)}, 300)})
                        clearInterval(tt);
                    }, 500) 
                }
            }, 50)
            _this.bindAddHotspot();
            _this.bindResetActiveSpot()
            // useCameraChange($modelViewer, (e) => { })

            window.onresize = () => {this.setModelAttrByScreen(); }
        },
        created(){
            this.initDevices();
            this.setModelAttrByScreen();
              
        },
        computed: {
            activeHotspotData() {
                return this.hotspots[this.activeSpot] || null
            },
        },
        watch: {
            activeHotspotData: {
                handler(val) {
                    if (!val) return;
                    this.$forceUpdate();
                    this.$nextTick(() => {
                        let $newView = document.getElementById(this.modelViewId);
                        let {
                            name : sid,
                            position,
                            normal
                        } = val;
                        $newView.updateHotspot({
                            name,
                            position,
                            normal
                        });
                    })

                },
                deep: true
            }
        },
        methods: {
            setModelAttrByScreen(){
                this.screenWidth = document.documentElement.clientWidth;
                let isSmallScreen = this.screenWidth < LIMIT_SCREEN_WIDTH;
                // this.enableCameraControl = !isSmallScreen;
                // this.enablePan = !isSmallScreen;
                // this.disableZoom = isSmallScreen;
                this.visibleSideBtn = !isSmallScreen;
                let preR = this.enableAutoRotate;
                this.enableAutoRotate = isSmallScreen;
                if(preR !== this.enableAutoRotate){
                    let $viewer = document.getElementById(this.modelViewId);
                    if(!$viewer) return;
                    setCamera($viewer, INITIAL_CAMERA_CONFIG);
                    $viewer.resetTurntableRotation();
                }
            },
            handleClickHotspot(e, hotspotItem, idx) {
                e.stopPropagation();
                if(this.screenWidth < LIMIT_SCREEN_WIDTH) return;
                this.chooseActiveSpot(hotspotItem, idx)
            },

            togglePanel(){
                if(this.screenWidth < LIMIT_SCREEN_WIDTH){ this.visibleHotspotPanel = false; return}
                this.visibleHotspotPanel = !this.visibleHotspotPanel
            },

            chooseActiveSpot(hotspotItem, idx){
                var _this = this;
                _this.activeSpot = idx;
                _this.enableAdd = false;
                if(idx === -1) return ;
                hotspotItem.eui && this.updateDeviceData(hotspotItem.eui);
                let $viewer = document.getElementById(_this.modelViewId);
                if (_this.enabledConfig && _this.visibleConfigPanel) {
                    hotspotItem.cameraTarget = getCameraPos($viewer);
                    hotspotItem.cameraOrbit = getCameraOrbit($viewer);
                    _this.updateHotspot(idx, hotspotItem)
                } else {
                    setCamera($viewer, hotspotItem)
                    $viewer.interpolationDecay = 150;
                    setTimeout(function () {
                        $viewer.interpolationDecay = _this.interpolationDecay;
                    }, 5000)
                }
            },

            bindResetActiveSpot(){
                var _this = this;
                let $viewer = document.getElementById(_this.modelViewId);
                $viewer.addEventListener('click', function (e) {
                    e.stopPropagation();
                    _this.activeSpot = -1;
                })
            },
         

            updateHotspot(idx, data) {
                // Delete hotspot
                if (data === null) {
                    this.hotspots.splice(idx, 1);
                    if (idx === this.activeSpot){
                        this.activeSpot = '';
                        this.enabledConfig = false;
                    }
                    return
                }
                idx === undefined ?  this.hotspots.push(data) :  this.hotspots.splice(idx, 1, data);

                this.$nextTick(() => {
                    let $newView = document.getElementById(this.modelViewId);
                    $newView.updateHotspot({
                        name: data.sid,
                        position: data.position,
                        normal: data.normal
                    });
                })
            },

            formatDeviceTitle(device){
                return `${device.device_name}<span class="mini-title"> - ${device.sensor_name}</span>`
            },

            
            bindDevice(){
                if(!this.activeHotspotData) return;
                let htp = this.activeHotspotData;
                let eui = this.activeHotspotData.eui;
                let device = this.devices.find(d => d.eui === eui);
                htp.title = this.formatDeviceTitle(device);
                this.updateDeviceData(eui);
            },

            bindAddHotspot() {
                let _this = this;
                let $view = document.getElementById(_this.modelViewId);
                $view.addEventListener('click', function (e) {
                    if (!_this.enableAdd || _this.enabledConfig || /hotspot/i.test(e.target.className)) return;
                    let timeStamp = new Date().getTime();
                    let [sid, title, position, normal] = [`p_${timeStamp}`, `p_${timeStamp}`, getCameraPos($view), '']
                    _this.updateHotspot(undefined, {
                        sid,
                        title,
                        position,
                        normal,
                        "visible": "visible",
                        "fieldOfView": "15deg"
                    })
                    _this.enableAdd = false;
                })
            },

          

            async initDevices(){
                let data = {}
                let devices, euis, details, channels;
                try{
                    await getMeasurementData();
                    devices = await getGroupDevices(GROUP_UUID);
                    euis = devices.map(t => t.device_eui)
                    details = await getDevicesInfo(euis)
                    channels = await getDevicesChannels(euis);
                }catch(err){
                    console.log(err);
                    return;
                }
                details.forEach((item, idx) => {
                    data[item.device_eui] = item;
                })
                let arr = channels.map((item, idx) => {
                    let t = {};
                    let {device_eui, channels} = item;
                    if(!data[device_eui]){data[device_eui] = {}}
                    if(channels.length > 0){
                        data[device_eui]['eui'] = device_eui;
                        data[device_eui]['channel'] = channels[0];
                        data[device_eui]['sensor_name']= getSensorTypeName(data[device_eui]['channel'].sensor_type);
                    }
                    return data[device_eui];
                });
                this.devices = arr;
            },

            async updateDeviceData(eui){
                if(!this.devices) return ;
                let idx = this.devices.findIndex(d => d.eui === eui);
                if(idx === -1) return;
                let device = this.devices[idx];
                let now = new Date().getTime();
                if(device.lastTriggleUpdate && now - device.lastTriggleUpdate <= UPDATE_DEVICE_GAP){return}
                let data = await getDeviceData(eui);
                device.lastData = data;
                device.lastTriggleUpdate = new Date().getTime();
                this.devices.splice(idx, 1, device);
                this.hotspots.forEach(htp => {
                    if(htp.eui === eui){htp.deviceData = data}
                })
            }


        }
    }).$mount("#app")
}

main()

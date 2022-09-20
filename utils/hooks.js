import * as request from "../request/index.js";
export const SDK_KEY = import.meta.env.V__MP_SDK_KEY;
/** 
 * 连接Materport Iframe
 * Connnet Iframe
 * @parmas {iframe} DOMElement
*/
export function useConnectMPIframe(iframe) {
    if (!(window.MP_SDK && iframe)) { return Promise.reject(new Error()) };
    return new Promise((resolve, reject) => {
        window.MP_SDK
            .connect(iframe, SDK_KEY, '')
            .then((sdk) => { resolve(sdk) })
            .catch(err => { console.log(err); reject(err) });
    })
}

/** 
 * 获取Materport 所有的Tag数据
 * Get All Matterport Data from instance
 * @parmas {mpSdk} Object 
*/
export async function useGetMatterTagData(mpSdk) {
    try {
        let tags = await mpSdk.Mattertag.getData();
        let data = {};
        for (let tagItem of tags) {
            tagItem.lastUpdateTime = new Date().getTime()
            let sid = tagItem['sid'];
            data[sid] = tagItem;
        }
        return tags;
    } catch (err) {
        console.warn(err);
        return null;
    }
}

/**
 * @description: 获取分组下的所有设备
 * @param {string} group_uuid
 * @param {string} device_type
 */
export async function getGroupDevices(group_uuid, device_type = 2) {
    if (!group_uuid) return null;
    try {
        let data = await request.getGroupDevices({ group_uuid, device_type });
        if (data && data.length > 0) { return data }
        return Promise.reject(null);
    } catch (err) {
        return Promise.reject(err)
    }
}

/**
 * @description: 获取设备的状态
 * @param {string[]} euis
 */
export async function getDevicesStatus(euis) {
    if (!(euis && euis.length)) return Promise.reject(null);
    try {
        let data = await request.getDevicesStatus(euis);
        return data;
    } catch (err) {
        return Promise.reject(err)
    }
}

/**
 * @description: 获取设备详情
 * @param {string[]} euis
 */
 export async function getDevicesInfo(euis) {
    if (!(euis && euis.length)) return Promise.reject(null);
    try {
        let data = await request.getDevicesInfo(euis);
        return data;
    } catch (err) {
        return Promise.reject(err)
    }
}


/**
 * @description: 获取设备的channel
 * @param {string[]} euis
 */
export async function getDevicesChannels(euis) {
    if (!(euis && euis.length)) return Promise.reject(null);
    try {
        let data = await request.getDevicesChannels(euis);
        return data;
    } catch (err) {
        return Promise.reject(err)
    }
}


/**
 * @description: 获取设备数据
 * @return {*} 
 */
export async function getDeviceData(device_eui, channel_index, measurement_id) {
    let params = {device_eui}
    if(channel_index !== undefined) params.channel_index = channel_index;
    if(measurement_id !== undefined) params.measurement_id = measurement_id;
    let data = await request.getDeviceLastData(params);

    if (data.length > 0 && data[0]?.points?.length > 0) {
        let result = data[0].points.map((item ,idx) => {
            let minfo = getMeasurementInfo(item.measurement_id)
            return {...item,...minfo}
        })
        return result;
        console.log(result)
    }
    return Promise.reject(data)
}


export async function getMeasurementData(){
    if(!window.Sensor_Measurement ){
        try{
            let data = await request.getMeasurements();
            window.Sensor_Measurement = data;
        }catch(err){
            console.log(err)
        }
        
    }
    return Promise.resolve(window.Sensor_Measurement);
}
getMeasurementData();

export function getSensorTypeName(sid, language='en'){
    if(!window.Sensor_Measurement) return undefined;
    return window.Sensor_Measurement[language]['sensorType'][sid] || null;
}

export function getMeasurement(mid, language='en'){
    if(!window.Sensor_Measurement) return undefined;
    return window.Sensor_Measurement[language]['measurementId'][mid];
}

export function getSMIds(sid){
    if(!window.Sensor_Measurement) return undefined;
    return window.Sensor_Measurement['sm'][sid];
}

export function getMeasurementRange(mid){
    if(!window.Sensor_Measurement) return undefined;
    return window.Sensor_Measurement['rg'][mid];
}

export function getMeasurementInfo(mid){
    let mcn = getMeasurement(mid, 'zh-cn'),
        men = getMeasurement(mid, 'en'),
        mrg = getMeasurementRange(mid);
    return {
        measurement_id : mid,
        measurement_cn_name : mcn && mcn.length ? mcn[0] : '',
        measurement_en_name : men ? men[0] : '',
        measurement_unit :  men ? men[1] : '',
        measurement_scope:  mrg || '' ,
    }
}
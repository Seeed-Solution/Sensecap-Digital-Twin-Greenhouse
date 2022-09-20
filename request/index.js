import request from  "../utils/request";
import Axios from "axios";
import * as api from "./api"

/** 
 * @param {Object} params
 * {
 *  device_eui      (required) string 设备唯一标识
    channel_index   string  返回该通道下的测量值
    measurement_id  string 传感器的测量值ID
 * }
*/
export function getDeviceLastData(params){
    return request({
        method : 'GET',
        url : api.getLastDeviceData,
        params
    }) 
}

/**
 * @description: 获取设备列表
 * @param {Object} params
 * {
 *  device_type {string}  设备类型：1-gateway， 2-node(默认值)
 *  group_uuid {string}   设备组唯一标识,默认返回默认分组,不传则返回所有分组
 * }
 */
export function getGroupDevices(params){
    return request({
        method: 'GET',
        url: api.listDevices,
        params
    })
}

/**
 * @description: 获取设备详情
 * @param {Object} params
 * {
 *  device_euis {string[]}  设备唯一标识,一次最多查询50个设备
 * }
 */
 export function getDevicesInfo(device_euis){
    return request({
        method: 'POST',
        url: api.viewDevices,
        data:{device_euis}
    })
}



/**
 * @description: 获取节点通道列表
 * @param {Object} params
 * {
 *  device_euis {string[]}  设备唯一标识,一次最多查询50个设备
 * }
 */
 export function getDevicesChannels(device_euis){
    return request({
        method: 'POST',
        url: api.listDevicesChannels,
        data:{device_euis}
    })
}

/**
 * @description: 获取设备工作状态
 * @param {Object} params
 * {
 *  device_euis {string[]}  设备唯一标识,一次最多查询50个设备
 * }
 */
 export function getDevicesStatus(device_euis){
    return request({
        method: 'POST',
        url: api.viewDeviceRuningStatus,
        data:{device_euis}
    })
}

export function getMeasurements(){
    return new Promise((resolve, reject) => {
        Axios.get(api.sensorJSONFile).then(res => {
            if(res.data){return resolve(res.data)}
            return reject(res)
        }).catch(err => {return reject(err)})
    })
    
}


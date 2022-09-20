
/**
 * @description: 模型加载中钩子
 * @param {Dom Element} $modelViewer 
 * @param {function} cbProgress
 */
export function useModelProgress($modelViewer , cbProgress){
    if(!$modelViewer) return ;
    cbProgress && $modelViewer.addEventListener('progress', (e) => {
        cbProgress(e.detail.totalProgress)
    })
}


/**
 * @description: 模型加载完成钩子
 * @param {Dom Element} $modelViewer 
 * @param {function} cbLoaded
 */
export function useModelLoaded($modelViewer , cbLoaded){
    if(!$modelViewer) return ;
    cbLoaded &&  $modelViewer.addEventListener('load', () => { 
        cbLoaded();
    })
}

/**
 * @description: 相机视角变化监听
 * @param {Dom Element} $modelViewer 
 * @param {function} cb
 */
export function useCameraChange($modelViewer, cb){
    if(!$modelViewer) return ;
    cb && $modelViewer.addEventListener('camera-change', (e) => {cb(e)})
}

/**
* @description: 交互停止监听
* @param {Dom Element} $modelViewer 
* @param {function} cb
*/
export function useInteractStop($modelViewer, cb){
    if(!$modelViewer) return ;
    cb && $modelViewer.addEventListener('interact-stopped', (e) => {cb(e)})
}


/**
 * @description: 配置相机视角 等属性
 * @param {Dom Element} $modelViewer 
 * @param {object} cfg
 * @return {*}
 */
export function setCamera($modelViewer, cfg, extraAttrs ){
    if(!($modelViewer && cfg)) return null;
    let keys = ['cameraTarget', 'cameraOrbit' , 'fieldOfView', 'interpolationDecay']
    if(extraAttrs && extraAttrs.length > 0){ keys = [...keys, ...extraAttrs] }
    for(let attr in cfg) {
        if(keys.includes(attr)){ 
            $modelViewer[attr] = cfg[attr]
        }
    }
}


/**
 * @description: cameraTarget
 * @param {*} view
 * @return {*}
 */
export function getCameraPos($modelViewer) {
    if(!$modelViewer) return ;
    return $modelViewer.getCameraTarget().toString()
}

/**
 * @description: cameraOrbit
 * @param {*} view
 * @return {*}
 */
export function getCameraOrbit($modelViewer) {
    if(!$modelViewer) return ;
    return $modelViewer.getCameraOrbit().toString()
}

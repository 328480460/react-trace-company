export let getBaiDuGeo = function () {
    let geolocation = new BMap.Geolocation();
    return new Promise(function (reslove, reject) {
        geolocation.getCurrentPosition((res) => {
            reslove(res)
        }, {enableHighAccuracy: true})
        
    })
}

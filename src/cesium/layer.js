import sichuanCounty from "@/assets/geoJson/sichuanCounty.json";
import * as Cesium from 'cesium'
import yaAn from "@/assets/geoJson/yaan1.json";

let layer = {
    //视角跳转
    addYaanCityDistrict() {
        let geoPromise = Cesium.GeoJsonDataSource.load(yaAn, {
            clampToGround: true, //贴地显示
            stroke: Cesium.Color.RED,
            fill: Cesium.Color.SKYBLUE.withAlpha(0.5),
            strokeWidth: 4,
        });
        // 处理加载成功的GeoJSON数据
        geoPromise.then((dataSource) => {
            window.viewer.dataSources.add(dataSource);
            // 添加 geojson
            window.regionLayerJump = dataSource;

            // 视角跳转到 geojson
            viewer.flyTo(dataSource.entities.values);

        }).catch((error) => {
            // 处理加载失败的情况
            console.error("加载GeoJSON数据失败:", error);
        });
        // 添加雅安市的标签
        let labelData = {lon: 103.003398, lat: 29.981831, name: "雅安市"};
        let position = Cesium.Cartesian3.fromDegrees(labelData.lon, labelData.lat);
        viewer.entities.add(new Cesium.Entity({
            id: "regionLayerJumpText",
            position: position,
            label: new Cesium.LabelGraphics({
                text: labelData.name,
                scale: 1,
                font: "bolder 50px sans-serif",
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                fillColor: Cesium.Color.fromCssColorString("#ffffff"),
                pixelOffset: new Cesium.Cartesian2(0, -60)
            })
        }));
    },
    addCountyLayerJump(district) {
        // 根据区县代码过滤GeoJSON数据
        let filteredFeatures = sichuanCounty.features.filter(feature => {
            return feature.properties.adcode === district.adcode;
        });
        if (filteredFeatures) {
            // 创建一个经过过滤的GeoJSON对象，包含过滤后的特性数据
            let filteredGeoJson = {
                type: "FeatureCollection",
                features: filteredFeatures
            };

            // 使用Cesium的GeoJsonDataSource.load方法加载经过过滤的GeoJSON数据
            // 该方法用于将GeoJSON数据转换为Cesium的数据源，以便在3D地图中显示
            // 在加载时，设置了数据源的样式属性，包括边颜色、填充颜色和边宽度
            let geoPromise = Cesium.GeoJsonDataSource.load(filteredGeoJson, {
                clampToGround: true, //贴地显示
                stroke: Cesium.Color.RED,
                fill: Cesium.Color.SKYBLUE.withAlpha(0.5),
                strokeWidth: 10,
            });

            // 处理地理空间数据的Promise对象
            geoPromise.then(async (dataSource) => {
                // 将数据源添加到观众的数据显示中
                window.viewer.dataSources.add(dataSource);
                // 保存区域图层以便后续使用
                window.regionLayerJump = dataSource
                // 获取特征的中心点坐标
                let center = filteredFeatures[0].properties.center;

                // 检查中心点是否定义且格式正确
                if (center && center.length === 2) {
                    // 将地理坐标转换为三维空间中的位置
                    let position = Cesium.Cartesian3.fromDegrees(center[0], center[1]);
                    // 创建并添加标签实体到观众的实体集合中
                    window.viewer.entities.add(new Cesium.Entity({
                        position: position,
                        id: "regionLayerJumpText",
                        label: new Cesium.LabelGraphics({
                            text: district.name,  // 标签文本为区域名称
                            scale: 1,  // 标签缩放比例
                            font: "bolder 50px sans-serif",  // 标签字体样式
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,  // 标签样式为填充和轮廓
                            fillColor: Cesium.Color.fromCssColorString("#ffffff"),  // 标签填充颜色
                            pixelOffset: new Cesium.Cartesian2(0, -60)  // 标签像素偏移量，用于调整位置
                        })
                    }));
                } else {
                    // 如果中心点未定义或格式不正确，输出警告信息
                    console.warn('中心点未定义或格式不正确:', feature);
                }
                // 飞行到数据源中的实体位置，以便用户查看
                viewer.flyTo(dataSource.entities.values);
            }).catch((error) => {
                // 如果加载GeoJSON数据失败，输出错误信息
                console.error("加载GeoJSON数据失败:", error);
            });
        } else {
            // console.error("未找到对应的区县:", adcode);
        }
    },
    removeRegionLayerJump() {
        if (window.regionLayerJump) {
            // 从viewer的数据源中移除图层，第二个参数为true表示强制移除
            window.viewer.dataSources.remove(window.regionLayerJump, true);
            // 清空regionLayerJump的引用，以便垃圾回收
            window.regionLayerJump = null;
            // //console.log("图层已移除");
        }
        let labelEntity = window.viewer.entities.getById("regionLayerJumpText")
        if (labelEntity) {
            window.viewer.entities.remove(labelEntity)
        }
    },
    //视角跳转 end
}
export default layer;
"use strict"

require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/views/SceneView",
    "esri/widgets/Legend",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/LayerList",
    'esri/renderers/visualVariables/VisualVariable',
    'esri/renderers/visualVariables/SizeVariable',
    'esri/renderers/SimpleRenderer'
  ], (Map, FeatureLayer, GraphicsLayer,  SceneView, Legend, BasemapGallery, Expand, LayerList, VisualVariable, SizeVariable, SimpleRenderer) => {
    const map = new Map({
      basemap: "topo-vector"
    });

    const view = new SceneView({
      container: "viewDiv",
      map: map,
      center: [-100, 40],
      zoom: 4
    });

    const template = {
      title: "{name}",
          content: [{
            type: "fields",
              fieldInfos: [{
                fieldName: "MAGNITUDE",
                label: "MAGNITUDE"

              }, {
                fieldName: "DEPTH",
                label: "DEPTH"
              }
            ],

          }]
    }


    const featureLayer2 = new FeatureLayer({
      url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0",
      popupTemplate: template
    });
    map.add(featureLayer2);

    const featureLayer = new FeatureLayer({
      url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0",
      popupTemplate: template
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

  const basemapGallery = new BasemapGallery({
    view: view,
  });

  const layerList = new LayerList({
    view: view, 
  });

  view.ui.add(new Legend({ view: view }), "bottom-left");

  view.ui.add(new Expand({ view: view, content: basemapGallery}), "top-right");

  view.ui.add(new Expand({ view: view, content: layerList}), "top-right");

  

  let query = featureLayer.createQuery();
  query.where = "MAGNITUDE >= 4";
  query.outField = ["*"];
  query.returnGeometry = true;

  featureLayer.queryFeatures(query)
  .then(response => {
      console.log(response);
      getResults(response.features);
  })
  .catch(err => {
      console.log(err);
  });

  const getResults = (features) => {
      const symbol = {
          type: "simple-marker",
          size: 6,
          color: "red",
          style: "square"
      };
  features.map(elem => {
      elem.symbol = symbol;
  });
  graphicsLayer.addMany(features);
  };
            
  const simpleRenderer = {
    type: "simple",
    symbol: {
        type: "point-3d",
        symbolLayers: [
            {
                type: "object",
                resource: {
                    primitive: "cylinder"
                },
                width: 5000
            }
        ],
        size: 6,
        color: "red",
        style: "square"
    },
    label: "Magnitude",
    visualVariables: [
        {
            type: "color",
            field: "MAGNITUDE",
            stops: [
                {
                    value: 0.5,
                    color: "green"
                },
                {
                    value: 1.12998071359691,
                    color: "yellow"
                },
                {
                  value: 4.48,
                  color: "red"
              }
            ]
        },
        {
            type: "size",
            field: "DEPTH",
            stops: [
                {
                    value: -3.39,
                    size: 5000
                },
                {
                    value: 30.97,
                    size: 150000
                }
            ]
        }
    ]
};

  featureLayer2.renderer = simpleRenderer;
});


"use strict"

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");
let button5 = document.getElementById("button5");

let icon = document.querySelector("icon");
let arrow = document.querySelector("arrow");

require([
    "esri/Map",
    "esri/layers/FeatureLayer",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/LayerList",
    "esri/widgets/AreaMeasurement2D",
    "esri/widgets/DistanceMeasurement2D",
    "esri/widgets/Search"
  ], (Map, FeatureLayer, MapView, Legend, BasemapGallery, Expand, LayerList, AreaMeasurement2D, DistanceMeasurement2D, Search) => {
    const map = new Map({
      basemap: "topo-vector"
    });
    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-3.70256, 40.4165],
      zoom: 6
    });

    const basemapGallery = new BasemapGallery({
      view: view,
    });

    const layerList = new LayerList({
      view: view, 
    });

    const areaMeasurement = new AreaMeasurement2D({
      view: view,
    });

    const distanceMeasurement = new DistanceMeasurement2D({
      view: view,
    });

    const search = new Search({
      view: view,
      index: 2,
      container: document.createElement("div")
    });
   

    view.ui.add(new Legend({ view: view }), "bottom-left");

    view.ui.add(new Expand({ view: view, content: basemapGallery}), "top-right");

    view.ui.add(new Expand({ view: view, content: layerList}), "top-right");

    view.ui.add(new Expand({ view: view, content: areaMeasurement}), "top-right");

    view.ui.add(new Expand({ view: view, content: distanceMeasurement}), "top-right");

    view.ui.add(new Expand({ view: view, content: search}), "top-right");
    
    button1.addEventListener('click', function(){

      view.center = [-3.70256, 40.4165];
      view.zoom = 10;
  });
  
  button2.addEventListener('click', function(){
  
    view.center = [2.15899, 41.38879];
    view.zoom = 10;
  });
  
  button3.addEventListener('click', function(){
  
    view.center =  [-0.37739, 39.46975];
    view.zoom = 10;
  });
  
  button4.addEventListener('click', function(){
  
    view.center =  [-5.9731700,  37.382830];
    view.zoom = 10;
  });
  
  button5.addEventListener('click', function(){
  
    view.center = [ -0.87734, 41.65606];
    view.zoom = 10;
  });
    

    const template = { 
      title: "{name}",
          content: [{
            type: "fields",
            
              fieldInfos: [{
                fieldName: "population",
                label: "Populacja"
              }]

          }]
        }
              
               
                
    
    const featureLayer = new FeatureLayer({
      url: "https://services.arcgis.com/8df8p0NlLFEShl0r/arcgis/rest/services/Major_Cities_Spain/FeatureServer",
      popupTemplate: template
    });
    map.add(featureLayer);
});





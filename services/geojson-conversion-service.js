/**
 * Created by tom on 11/04/16.
 */


var urlUtil = require("url");
var topojson = require("topojson");
var datapoint = require('datapoint-js')

var datapoint_key = process.env.DATAPOINT_KEY;
datapoint.set_key(datapoint_key);

module.exports = {
    convertResponseFromDatapoint : function(res) {
        //TODO Michael's conversion to GeoJSON.
    }
    datapointObservationStations : function(req, res){
      // Returns a map of all stations in TopoJSON format.
      res.setHeader('Content-Type', 'application/json');
      var loc = datapoint.get_obs_sites();
      var features = [];
      for(var i=0; i<loc.length; i++){
        // Format is GeoJSON, see http://geojson.org/
        var entry = {type:"Feature",geometry:{type:"Point",
        coordinates:[Number(loc[i].longitude),Number(loc[i].latitude)]},
        properties:{name:loc[i].name, id:loc[i].id}};
        features.push(entry);
      }
      // Convert GeoJSON to more compact TopoJSON.
      // Copy all properties as is.
      var topology = topojson.topology({places:
        {type: "FeatureCollection", features: features}},
        {"property-transform":function (feature) {
          return feature.properties;
        }
      });
      res.send(JSON.stringify(topology));
    };

};

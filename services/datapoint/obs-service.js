/**
 * Service for fetching a Datapoint weather observation.
 */

 var datapoint = require('datapoint-js');
 var datapoint_key = process.env.DATAPOINT_KEY;
 datapoint.set_key(datapoint_key);

//logging
var debug = require('debug')('molab-mysky-api:services/datapoint/obs-service');

module.exports = {

    /**
     * Return (via Promise) the current weather for specified location
     * The weather observation network is sparse so a recent (past)
     * forecast is returned instead.
     * @param location - location of device making the request
     * @returns {Promise}
     */
    get: function (location) {
        return new Promise(
            function (resolve, reject) {
                debug("fetching from datapoint");

                var site = datapoint.get_nearest_forecast_site(location.longitude, location.latitude);
                var forecast = datapoint.get_forecast_for_site(site.id, "3hourly");
                // Range of days to examine for forecast matching current time
                // is 0 to 1 not full forecast.days.length
                var timesteps = forecast.days[0].timesteps.concat(forecast.days[1].timesteps);
                var tstep=0;
                var now = new Date();
                while(now > timesteps[tstep].date){ tstep++;}
                // Accept timestep 0, even if it's in the future.
                if(tstep) tstep--;

                debug(now, timesteps[tstep].date);

                observation = timesteps[tstep];
                var entry = {type:"Feature",geometry:{type:"Point",
                coordinates:[Number(forecast.longitude),Number(forecast.latitude)]},
                properties:{name:forecast.name, id:forecast.id, weather:observation}};
                resolve(entry);
            });
    }

};

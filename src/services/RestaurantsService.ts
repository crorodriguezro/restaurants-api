import axios from 'axios';

const zomatoKey = "d31c503e24de8c7071ec754e9bc6fbc3";

const headers = {
  "user-key": zomatoKey,
};

const findRestaurantsByCityOrCoordinates = async (city, latitude, longitude) => {
  const cityId: number = await findCityId(city, latitude, longitude);
  const params = {
    entity_id: cityId,
    entity_type: "city",
    lat: latitude,
    lon: longitude,
  };
  return axios.get(`https://developers.zomato.com/api/v2.1/search`, {params, headers})
    .then(res => {
      return res.data.restaurants
        .map(restaurant => {
          const {name, location, cuisines} = restaurant.restaurant;
          return {
            name,
            location,
            cuisines,
          }
        });
    })
};

const findCityId = (cityName, latitude, longitude): Promise<number> => {
  const params = {
    q: cityName,
    lat: latitude,
    lon: longitude,
  };
  return axios.get(`https://developers.zomato.com/api/v2.1/cities`, {params, headers})
    .then(res => {
      return res.data.location_suggestions[0].id;
    })
};

export {findRestaurantsByCityOrCoordinates}

import {Request, Response} from "express";
import {validationResult} from "express-validator"

import {findRestaurantsByCityOrCoordinates} from "../services/RestaurantsService";

const findRestaurants = async (req: Request, res: Response) => {
  try {
    const {city, latitude, longitude} = req.query;
    const requestHasCity = !!city;
    const requestHasCoordinates = !!latitude && !!longitude;
    const result = validationResult(req);
    let requestHaveIncompleteParams = !(requestHasCity || requestHasCoordinates);
    if (!result.isEmpty() || requestHaveIncompleteParams) {
      res.status(400).json({msg: "bad request"});
    } else {
      const restaurants = await findRestaurantsByCityOrCoordinates(city, latitude, longitude);
      res.send(restaurants);
    }
  } catch (err) {
    res.status(500).json({msg: "unknown error"});
  }
};

export const RestaurantsController = {
  findRestaurants,
};

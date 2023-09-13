import * as geolib from 'geolib';

interface Coordinates {
  latitude: number;
  longitude: number;
}

function calculateDistanceInKilometers(
  origin: Coordinates,
  destination: Coordinates
): number {
  const distanceInMeters = geolib.getPreciseDistance(origin, destination, 1);
  const distanceInKilometers = geolib.convertDistance(distanceInMeters, 'km');
  return distanceInKilometers;
}

export default calculateDistanceInKilometers;

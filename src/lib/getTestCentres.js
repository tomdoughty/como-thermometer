import calculateDistance from './calculateDistance';
import mapFacilities from './mapFacilities';
import mapFullAddress from './mapFullAddress';
import mapOpeningTimes from './mapOpeningTimes';

// Returns list of test centres based on filters and location
const getTestCentres = (testCentres, filters, latitude, longitude) => testCentres
  // Check all filters
  .filter((testCentre) => filters.every(({ id }) => testCentre[id]))
  // Map test centres to pretify data
  .map((testCentre) => ({
    ...testCentre,
    distance: calculateDistance(
      testCentre,
      latitude,
      longitude
    ),
    facilities: mapFacilities(testCentre),
    fullAddress: mapFullAddress(testCentre),
    openingTimes: mapOpeningTimes(testCentre),
  }))
  // Order by nearest first
  .sort((a, b) => a.distance - b.distance)
  // Only return top 25 results
  .slice(0, 25);

export default getTestCentres;

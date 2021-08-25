import mapFacilities from './mapFacilities';
import mapFullAddress from './mapFullAddress';
import mapOpeningTimes from './mapOpeningTimes';

const getTestCentre = (testCentres, id) => {
  if (testCentres.length) {
    const testCentre = testCentres
      .find((centre) => centre.id === id);

    if (testCentre) {
      return {
        ...testCentre,
        facilities: mapFacilities(testCentre),
        fullAddress: mapFullAddress(testCentre),
        openingTimes: mapOpeningTimes(testCentre),
      };
    }
  }
  return null;
};

export default getTestCentre;
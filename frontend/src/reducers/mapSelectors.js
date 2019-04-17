const getFilter = mapState => mapState.filterByName;

const getPlaces = state => state.mapState.places;

const getVisiblePlaces = state => {
  const places = getPlaces(state);
  const filter = getFilter(state);

  return places.filter(place =>
    place.name.toLowerCase().includes(filter),
  );
};

export default { getPlaces, getVisiblePlaces, getFilter };

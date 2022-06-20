export default function parseStations(stations, input) {
  let foundStation = null;

  stations.forEach((station) => {
    if (input.toLowerCase().includes(station.name.toLowerCase())) {
      foundStation = station.name;
    }
  });

  return foundStation;
}

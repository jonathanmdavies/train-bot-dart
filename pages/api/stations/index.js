import getStations from "utils/data/getStations";

export default async function handler(req, res) {
  const stations = await getStations();

  const randomStations = randomSample(stations);

  res.status(200).json({ stations: randomStations });
}

function randomSample(array) {
  return array.sort(() => 0.5 - Math.random()).slice(0, 5);
}

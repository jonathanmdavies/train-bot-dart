import convertXMLtoJSON from "/utils/xml_parser";

export default async function getStations() {
  const res = await fetch(
    "http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML"
  );

  const data = await res.text();
  const jsonData = convertXMLtoJSON(data);

  const stations = jsonData.ArrayOfObjStation.objStation.map((station) => ({
    id: station.StationId,
    name: station.StationDesc,
    stationCode: station.StationCode,
  }));

  return stations;
}

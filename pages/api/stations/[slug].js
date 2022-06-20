import convertXMLtoJSON from "/utils/xml_parser";

export default async function handler(req, res) {
  const { slug } = req.query;

  const response = await fetch(
    `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=${slug}&NumMins=20`
  );
  const data = await response.text();
  const jsonData = convertXMLtoJSON(data);

  const arrivals = jsonData.ArrayOfObjStationData.objStationData;
  if (arrivals !== undefined) {
    if (Array.isArray(arrivals)) {
      res.status(200).json({ arrivals: arrivals.slice(0, 2) });
    } else {
      res.status(200).json({ arrivals: [arrivals] });
    }
  } else {
    res.status(200).json({ arrivals: [] });
  }
}

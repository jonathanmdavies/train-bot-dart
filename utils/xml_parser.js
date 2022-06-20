import { XMLParser } from "fast-xml-parser";

export default function convertXMLtoJSON(xmlData) {
  const parser = new XMLParser();
  return parser.parse(xmlData);
}

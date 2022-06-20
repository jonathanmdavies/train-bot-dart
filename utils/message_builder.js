import { v4 as uuidv4 } from "uuid";

export class MessageBuilder {
  constructor(type, author, content = "") {
    this.type = type;
    this.content = content;
    this.author = author;
    this.id = uuidv4();
    this.exampleStations = [];
    this.arrivals = [];
  }

  async buildArrivalsResponse(stationName) {
    const res = await fetch(`/api/stations/${stationName}`);
    const stationData = await res.json();

    this.content = `The upcoming arrivals for ${stationName} are:`;
    this.type = "arrivals";

    this.arrivals = stationData.arrivals;
  }

  async buildStationsResponse() {
    const res = await fetch(`/api/stations/`);
    const data = await res.json();

    const stations = data.stations;
    this.content = "Here are some example stations you could ask about:";
    this.type = "stations";
    this.exampleStations = stations;
  }

  buildFailureMessage() {
    this.content = "Sorry, I don't understand what you're asking me.";
    this.type = "text";
  }
}

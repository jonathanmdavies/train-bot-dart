import classnames from "classnames";

export default function Message({ message }) {
  return (
    <div
      className={classnames(
        "p-2 rounded-lg",
        message.author === "bot"
          ? "bg-slate-100 text-slate-700"
          : "bg-emerald-500 text-white"
      )}
    >
      <p className="">{message.content}</p>

      {message.type === "stations" && (
        <StationSampleList stations={message.exampleStations} />
      )}

      {message.arrivals.length > 0 && (
        <ArrivalsList arrivals={message.arrivals} />
      )}
    </div>
  );
}

function StationSampleList({ stations }) {
  return (
    <ul className="stations-list list-disc ml-4">
      {stations.map((station) => (
        <li key={station.id}>
          {station.name} ({station.stationCode})
        </li>
      ))}
    </ul>
  );
}

function ArrivalsList({ arrivals }) {
  return (
    <ul className="arrivals-list space-y-1 mt-1">
      {arrivals.map((arrival) => (
        <li
          key={arrival.Traincode}
          className="flex text-slate-600 items-center justify-between text-sm bg-slate-50 px-2 py-1.5 rounded"
        >
          <p>Train to {arrival?.Destination}</p>
          <div className="">
            <p>
              Expected: {arrival.Exparrival} ({arrival.Duein}mins)
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

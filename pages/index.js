import { useEffect, useState } from "react";
import { MessageBuilder } from "utils/message_builder";
import parseStations from "utils/input_parser";
import MessageContainer from "@components/MessageContainer";
import MessageInput from "@components/MessageInput";
import getStations from "utils/data/getStations";

export default function Home({ stations }) {
  const [messages, setMessages] = useState([
    new MessageBuilder(
      "text",
      "bot",
      "Hello, I am a bot! Ask me about a station for upcoming arrivals."
    ),
  ]);

  const [input, setInput] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "") return;
    const message = new MessageBuilder("text", "user", `${input}`);

    setMessages([...messages, message]);
    setInput("");
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.author === "user") {
      async function getResponse() {
        const newMessage = await createBotReply(stations, lastMessage.content);
        setMessages([...messages, newMessage]);
      }

      getResponse();
    }
  }, [messages, stations]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 w-[500px] max-w-lg bg-slate-50 rounded-lg">
        <h1 className="text-lg font-medium mb-2">DART Train Times</h1>
        <MessageContainer messages={messages} />
        <MessageInput
          handleSubmit={handleSubmit}
          setInput={setInput}
          input={input}
        />
      </div>
    </div>
  );
}

async function createBotReply(stations, userMessage) {
  const parsedStation = parseStations(stations, userMessage);
  const message = new MessageBuilder("text", "bot");

  if (userMessage.toLowerCase().includes("stations")) {
    await message.buildStationsResponse(userMessage);
  } else if (parsedStation) {
    await message.buildArrivalsResponse(parsedStation);
  } else {
    message.buildFailureMessage();
  }

  return message;
}

export async function getServerSideProps(context) {
  const stations = await getStations();

  return {
    props: { stations },
  };
}

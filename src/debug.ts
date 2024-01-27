import fs from "fs/promises";
import { read, write } from "./midifile";
import { mkdirs } from "./utils";
import { songFromMidi, songToMidi } from "./midi";

async function main() {
  await mkdirs(["./out"]);
  const buffer = await fs.readFile("./data/Caravan2exBIAB.mid");
  const song = songFromMidi(buffer);
  const midiBuffer = songToMidi(song);
  const midi = read(midiBuffer);
  await fs.writeFile("./out/caravan.json", JSON.stringify(midi));
  const outbuffer = write(midi.tracks, midi.header.ticksPerBeat);
  await fs.writeFile("./out/caravan.mid", outbuffer);
}

main().catch((error) => console.log(error));

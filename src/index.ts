import fs from "fs/promises";
import path from "path";
import { read } from "./midifile";
import { clean } from "./midiclean";
import { mkdirs } from "./utils";

async function main() {
  const dir = "./data";
  const files = await fs.readdir(dir);
  await mkdirs(["./out", "./json", "./errors"]);
  for (const file of files) {
    if (file === ".DS_Store") continue;
    const filepath = path.join(dir, file);
    const buffer = await fs.readFile(filepath);
    const midi = read(buffer);
    const cleanMidi = clean(midi);
    if (cleanMidi.tracks.length === 0) {
      const outPath = path.join("./out", file);
      const jsonPath = path.join("./json", file.replace(".mid", ".json"));
      const errorPath = path.join("./errors", file.replace(".mid", ".json"));
      await fs.writeFile(outPath, buffer);
      await fs.writeFile(jsonPath, JSON.stringify(midi));
      await fs.writeFile(errorPath, JSON.stringify(cleanMidi));
    }
  }
}

main().catch((error) => console.log(error));

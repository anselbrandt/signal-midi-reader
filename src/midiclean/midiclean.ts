import type { MidiFile, AnyEvent } from "../midifile";
import { read } from "../midifile";
import { songFromMidi, songToMidi } from "../midi";

export const clean = (midi: MidiFile): MidiFile => {
  if (midi.tracks.length === 1) return midi;

  const header = midi.header;
  const currTracks = midi.tracks;
  const tracks: AnyEvent[][] = [];

  for (const track of currTracks) {
    const isNotEmpty = track.some(
      (event) =>
        (event.type === "channel" && event.subtype === "noteOn") ||
        (event.type === "channel" && event.subtype === "noteOff")
    );
    const isDrums = track.some(
      (event) => event.type === "channel" && event.channel === 9
    );
    const isBass = track.some(
      (event) =>
        event.type === "channel" &&
        event.subtype === "programChange" &&
        [32, 33, 35, 37, 43].includes(event.value)
    );
    if (!isNotEmpty || isDrums || isBass) continue;
    tracks.push(track);
  }
  const reassigned = tracks.map((track) =>
    track.map((event) => {
      if (event.type === "channel") {
        return { ...event, channel: 0 };
      }
      return event;
    })
  );
  return { tracks: reassigned, header };
};

export const cleanMidi = (buffer: Buffer): MidiFile => {
  const song = songFromMidi(buffer);
  const midiCode = songToMidi(song);
  const midi = read(midiCode);
  return clean(midi);
};

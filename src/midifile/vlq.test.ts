import assert from "assert";
import { toVLQ, fromVLQ } from "./vlq";
import { describe, it } from "vitest";

describe("MidiFileWriter", () => {
  it("should convert integer to VLQ", () => {
    assert.deepEqual(toVLQ(0x00000000), [0x00]);
    assert.deepEqual(toVLQ(0x0000007f), [0x7f]);
    assert.deepEqual(toVLQ(0x00000080), [0x81, 0x00]);
    assert.deepEqual(toVLQ(0x00002000), [0xc0, 0x00]);
    assert.deepEqual(toVLQ(0x00003fff), [0xff, 0x7f]);
    assert.deepEqual(toVLQ(0x00004000), [0x81, 0x80, 0x00]);
    assert.deepEqual(toVLQ(0x001fffff), [0xff, 0xff, 0x7f]);
    assert.deepEqual(toVLQ(0x00200000), [0x81, 0x80, 0x80, 0x00]);
    assert.deepEqual(toVLQ(0x08000000), [0xc0, 0x80, 0x80, 0x00]);
    assert.deepEqual(toVLQ(0x0fffffff), [0xff, 0xff, 0xff, 0x7f]);
  });

  it("should convert VLQ to integer", () => {
    assert.deepEqual(0x00000000, fromVLQ([0x00]));
    assert.deepEqual(0x0000007f, fromVLQ([0x7f]));
    assert.deepEqual(0x00000080, fromVLQ([0x81, 0x00]));
    assert.deepEqual(0x00002000, fromVLQ([0xc0, 0x00]));
    assert.deepEqual(0x00003fff, fromVLQ([0xff, 0x7f]));
    assert.deepEqual(0x00004000, fromVLQ([0x81, 0x80, 0x00]));
    assert.deepEqual(0x001fffff, fromVLQ([0xff, 0xff, 0x7f]));
    assert.deepEqual(0x00200000, fromVLQ([0x81, 0x80, 0x80, 0x00]));
    assert.deepEqual(0x08000000, fromVLQ([0xc0, 0x80, 0x80, 0x00]));
    assert.deepEqual(0x0fffffff, fromVLQ([0xff, 0xff, 0xff, 0x7f]));
  });
});

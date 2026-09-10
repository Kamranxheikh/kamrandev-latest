"use client";

import { INSTRUMENTS } from "@/components/home/ProcessRail";

/* Server pages cannot index into an array exported by a client module — the
   import crosses the RSC boundary as an opaque reference. This thin client
   wrapper does the indexing on the client side of the line. */
export function ProcessInstrument({ index }: { index: number }) {
  const Instrument = INSTRUMENTS[index];
  return Instrument ? <Instrument /> : null;
}

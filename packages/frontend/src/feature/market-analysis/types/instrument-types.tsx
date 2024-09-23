export interface BaseInstrument {
  id: number;
  instrumentGroup: string;
  instrument: string;
  department: string;
  risk: string;
  country: string;
  exchange: string;
  tradeCCY: string;
  settlementCCY: string;
}

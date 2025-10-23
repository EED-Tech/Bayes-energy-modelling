// Regional trend analysis data for East African countries

export interface ElectrificationDataPoint {
  year: number
  kenyaUrban: number
  kenyaRural: number
  ugandaUrban: number
  ugandaRural: number
  ethiopiaUrban: number
  ethiopiaRural: number
  tanzaniaUrban: number
  tanzaniaRural: number
  malawiUrban: number
  malawiRural: number
}

export interface PopulationDataPoint {
  year: number
  ethiopia: number
  kenya: number
  tanzania: number
  uganda: number
  malawi: number
}

export interface UrbanShareDataPoint {
  year: number
  ethiopia: number
  kenya: number
  tanzania: number
  uganda: number
  malawi: number
}

// Electrification rate data (%)
export const electrificationData: ElectrificationDataPoint[] = [
  {
    year: 1960,
    kenyaUrban: 3,
    kenyaRural: 1,
    ugandaUrban: 7,
    ugandaRural: 1,
    ethiopiaUrban: 20,
    ethiopiaRural: 1,
    tanzaniaUrban: 2,
    tanzaniaRural: 1,
    malawiUrban: 2,
    malawiRural: 1,
  },
  {
    year: 1970,
    kenyaUrban: 5,
    kenyaRural: 1,
    ugandaUrban: 10,
    ugandaRural: 1,
    ethiopiaUrban: 35,
    ethiopiaRural: 1,
    tanzaniaUrban: 4,
    tanzaniaRural: 1,
    malawiUrban: 3,
    malawiRural: 1,
  },
  {
    year: 1980,
    kenyaUrban: 10,
    kenyaRural: 2,
    ugandaUrban: 15,
    ugandaRural: 2,
    ethiopiaUrban: 50,
    ethiopiaRural: 2,
    tanzaniaUrban: 8,
    tanzaniaRural: 1,
    malawiUrban: 5,
    malawiRural: 2,
  },
  {
    year: 1990,
    kenyaUrban: 20,
    kenyaRural: 3,
    ugandaUrban: 22,
    ugandaRural: 3,
    ethiopiaUrban: 70,
    ethiopiaRural: 3,
    tanzaniaUrban: 15,
    tanzaniaRural: 2,
    malawiUrban: 8,
    malawiRural: 2,
  },
  {
    year: 2000,
    kenyaUrban: 35,
    kenyaRural: 5,
    ugandaUrban: 32,
    ugandaRural: 5,
    ethiopiaUrban: 85,
    ethiopiaRural: 5,
    tanzaniaUrban: 25,
    tanzaniaRural: 3,
    malawiUrban: 12,
    malawiRural: 3,
  },
  {
    year: 2010,
    kenyaUrban: 60,
    kenyaRural: 10,
    ugandaUrban: 50,
    ugandaRural: 10,
    ethiopiaUrban: 92,
    ethiopiaRural: 15,
    tanzaniaUrban: 45,
    tanzaniaRural: 8,
    malawiUrban: 25,
    malawiRural: 5,
  },
  {
    year: 2020,
    kenyaUrban: 85,
    kenyaRural: 25,
    ugandaUrban: 70,
    ugandaRural: 20,
    ethiopiaUrban: 97,
    ethiopiaRural: 30,
    tanzaniaUrban: 70,
    tanzaniaRural: 18,
    malawiUrban: 50,
    malawiRural: 10,
  },
  {
    year: 2030,
    kenyaUrban: 95,
    kenyaRural: 45,
    ugandaUrban: 85,
    ugandaRural: 35,
    ethiopiaUrban: 99,
    ethiopiaRural: 50,
    tanzaniaUrban: 88,
    tanzaniaRural: 35,
    malawiUrban: 75,
    malawiRural: 20,
  },
  {
    year: 2040,
    kenyaUrban: 98,
    kenyaRural: 65,
    ugandaUrban: 92,
    ugandaRural: 55,
    ethiopiaUrban: 99.5,
    ethiopiaRural: 65,
    tanzaniaUrban: 95,
    tanzaniaRural: 55,
    malawiUrban: 88,
    malawiRural: 35,
  },
  {
    year: 2050,
    kenyaUrban: 99,
    kenyaRural: 78,
    ugandaUrban: 96,
    ugandaRural: 70,
    ethiopiaUrban: 99.8,
    ethiopiaRural: 75,
    tanzaniaUrban: 98,
    tanzaniaRural: 70,
    malawiUrban: 94,
    malawiRural: 50,
  },
  {
    year: 2060,
    kenyaUrban: 99.5,
    kenyaRural: 80,
    ugandaUrban: 98,
    ugandaRural: 78,
    ethiopiaUrban: 99.9,
    ethiopiaRural: 80,
    tanzaniaUrban: 99,
    tanzaniaRural: 78,
    malawiUrban: 97,
    malawiRural: 60,
  },
  {
    year: 2080,
    kenyaUrban: 99.8,
    kenyaRural: 80,
    ugandaUrban: 99,
    ugandaRural: 80,
    ethiopiaUrban: 100,
    ethiopiaRural: 80,
    tanzaniaUrban: 99.5,
    tanzaniaRural: 80,
    malawiUrban: 98,
    malawiRural: 68,
  },
  {
    year: 2100,
    kenyaUrban: 99.9,
    kenyaRural: 80,
    ugandaUrban: 99.5,
    ugandaRural: 80,
    ethiopiaUrban: 100,
    ethiopiaRural: 80,
    tanzaniaUrban: 99.8,
    tanzaniaRural: 80,
    malawiUrban: 99,
    malawiRural: 70,
  },
]

// Population data (millions)
export const populationData: PopulationDataPoint[] = [
  { year: 1960, ethiopia: 22, kenya: 8, tanzania: 10, uganda: 7, malawi: 3 },
  { year: 1970, ethiopia: 28, kenya: 11, tanzania: 13, uganda: 10, malawi: 4 },
  { year: 1980, ethiopia: 35, kenya: 16, tanzania: 18, uganda: 12, malawi: 6 },
  { year: 1990, ethiopia: 48, kenya: 23, tanzania: 25, uganda: 17, malawi: 9 },
  { year: 2000, ethiopia: 65, kenya: 31, tanzania: 34, uganda: 24, malawi: 11 },
  { year: 2010, ethiopia: 88, kenya: 41, tanzania: 45, uganda: 33, malawi: 15 },
  { year: 2020, ethiopia: 115, kenya: 53, tanzania: 60, uganda: 45, malawi: 19 },
  { year: 2030, ethiopia: 140, kenya: 65, tanzania: 75, uganda: 57, malawi: 23 },
  { year: 2040, ethiopia: 165, kenya: 75, tanzania: 88, uganda: 68, malawi: 27 },
  { year: 2050, ethiopia: 188, kenya: 84, tanzania: 100, uganda: 78, malawi: 30 },
  { year: 2060, ethiopia: 208, kenya: 92, tanzania: 110, uganda: 87, malawi: 33 },
  { year: 2080, ethiopia: 235, kenya: 105, tanzania: 122, uganda: 100, malawi: 38 },
  { year: 2100, ethiopia: 250, kenya: 112, tanzania: 128, uganda: 108, malawi: 40 },
]

// Urban share data (%)
export const urbanShareData: UrbanShareDataPoint[] = [
  { year: 1960, ethiopia: 6, kenya: 8, tanzania: 5, uganda: 5, malawi: 4 },
  { year: 1970, ethiopia: 8, kenya: 10, tanzania: 7, uganda: 7, malawi: 6 },
  { year: 1980, ethiopia: 11, kenya: 13, tanzania: 10, uganda: 9, malawi: 8 },
  { year: 1990, ethiopia: 13, kenya: 15, tanzania: 13, uganda: 11, malawi: 11 },
  { year: 2000, ethiopia: 15, kenya: 18, tanzania: 17, uganda: 13, malawi: 14 },
  { year: 2010, ethiopia: 18, kenya: 22, tanzania: 22, uganda: 16, malawi: 16 },
  { year: 2020, ethiopia: 22, kenya: 28, tanzania: 30, uganda: 20, malawi: 18 },
  { year: 2030, ethiopia: 28, kenya: 35, tanzania: 38, uganda: 25, malawi: 21 },
  { year: 2040, ethiopia: 35, kenya: 42, tanzania: 46, uganda: 31, malawi: 23 },
  { year: 2050, ethiopia: 42, kenya: 48, tanzania: 52, uganda: 37, malawi: 24 },
  { year: 2060, ethiopia: 48, kenya: 54, tanzania: 56, uganda: 42, malawi: 24 },
  { year: 2080, ethiopia: 56, kenya: 60, tanzania: 60, uganda: 48, malawi: 24 },
  { year: 2100, ethiopia: 62, kenya: 63, tanzania: 62, uganda: 52, malawi: 24 },
]

export const countryColors = {
  ethiopia: "#0078D4",
  kenya: "#4A9EDA",
  uganda: "#6CB4E8",
  tanzania: "#005A8C",
  malawi: "#A8D5F2",
}

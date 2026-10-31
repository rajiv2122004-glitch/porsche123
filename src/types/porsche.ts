export interface PorscheModel {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  vehicleType: string;
  category: 'sports-track' | 'coupe' | 'electric' | 'suv' | 'sedan' | 'rally';
  engine: string;
  powertrainType: 'Combustion' | 'T-Hybrid' | 'E-Performance' | 'All-Electric';
  displacement?: string;
  transmission: string;
  powerHp: number;
  powerKw: number;
  torqueNm: number;
  acceleration0to100: number; // in seconds
  topSpeedKmH: number;
  fuelEconomyOrRange: string;
  priceInr: string; // e.g. "₹3.51 Crore"
  priceInrRaw: number; // e.g. 35100000
  isEstimate: boolean;
  isAvailableInIndia: boolean;
  statusNote?: string;
  image: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
    wheelbase: string;
    unladenWeight: string;
  };
  highlights: string[];
  soundType: 'boxer-na' | 'boxer-turbo' | 'v8-turbo' | 'taycan-electric';
  officialLinkNotice: string;
}

export interface Hotspot3D {
  id: string;
  name: string;
  position: [number, number, number];
  category: string;
  description: string;
  spec: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  modelId: string;
  city: string;
  date: string;
  timeSlot: string;
  preferredDealer: string;
  message: string;
  agreedToTerms: boolean;
}

export interface TestDriveCenter {
  city: string;
  name: string;
  address: string;
  phone: string;
}

export type SVGPoint = {
  x: number;
  y: number;
};

export type MapBounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Studio = {
  id: number;
  photographer: {
    name: {
      hu: string;
      en: string;
    };
  };
  studioAddress: {
    city: {
      hu: string;
      en: string;
    };
    location: {
      placeName: {
        hu: string;
        en: string;
      };
      coordinates: Coordinates;
      county: {
        hu: string;
        en: string;
      };
    };
  };
};

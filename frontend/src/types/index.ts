// Global type definitions
import type { Studio } from './map';

export type BilingualText = {
  hu: string;
  en: string;
};

export type Image = {
  id: number;
  studioId: number;
  title: BilingualText;
  date: string;
  technique: string;
  description: BilingualText;
  thumbnailUrl: string;
  fullImageUrl: string;
};

export type ImageManifest = {
  image: Image;
  studio: Studio;
};

export type StudioManifest = {
  studio: Studio;
  images: Image[];
};

export type Language = 'hu' | 'en';

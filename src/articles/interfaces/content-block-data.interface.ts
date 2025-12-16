export interface TextBlockData {
  text: string;
  format?: 'plain' | 'markdown' | 'html';
}

export interface ImageBlockData {
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface VideoBlockData {
  url: string;
  thumbnail?: string;
  caption?: string;
  provider?: 'youtube' | 'vimeo' | 'self-hosted';
}

export interface AudioBlockData {
  url: string;
  title?: string;
  duration?: number;
}

export interface GalleryBlockData {
  images: Array<{
    url: string;
    alt?: string;
    caption?: string;
  }>;
}

export interface QuoteBlockData {
  text: string;
  author?: string;
  source?: string;
}

export interface EmbedBlockData {
  embedCode: string;
  provider?: string;
  url?: string;
}

export interface CodeBlockData {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export type ContentBlockData =
  | TextBlockData
  | ImageBlockData
  | VideoBlockData
  | AudioBlockData
  | GalleryBlockData
  | QuoteBlockData
  | EmbedBlockData
  | CodeBlockData;

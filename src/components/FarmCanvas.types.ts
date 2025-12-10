export interface ExportOptions {
  scale: number;
  includeMetadata: boolean;
  includeWatermark: boolean;
}

export interface FarmCanvasRef {
  exportAsImage: (options: ExportOptions) => void;
}

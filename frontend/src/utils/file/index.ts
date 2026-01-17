/**
 * Result of image dimension validation
 */
export type ImageDimensionValidationResult = {
  valid: boolean;
  width?: number;
  height?: number;
  error?: string;
};

/**
 * Utility class to work with file operations.
 */
export type FileManagerType = {
  /**
   * Download a file from a Blob with the specified filename.
   */
  downloadBlob(blob: Blob, filename: string): void;

  /**
   * Download a file from data (string, Blob, or BlobPart) with the specified filename.
   * If data is not a Blob, it will be converted to a Blob.
   */
  downloadFile(data: BlobPart, filename: string, mimeType?: string): void;

  /**
   *
   * Extract thumbnail from video
   */
  videoToBlob(video: HTMLVideoElement): Promise<File | null>;

  /**
   * Validate image dimensions meet minimum requirements
   * @param file Image file to validate
   * @param minWidth Minimum width in pixels (default: 600)
   * @param minHeight Minimum height in pixels (default: 600)
   */
  validateImageDimensions(
    file: File,
    minWidth?: number,
    minHeight?: number
  ): Promise<ImageDimensionValidationResult>;

  /**
   * Extract filename from a URL
   * @param url The URL to extract the filename from
   * @returns The filename extracted from the URL path
   */
  getFilenameFromUrl(url: string): string;
};

export class FileManager implements FileManagerType {
  downloadBlob(blob: Blob, filename: string): void {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  downloadFile(data: BlobPart, filename: string, mimeType = "text/plain"): void {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
    this.downloadBlob(blob, filename);
  }

  async videoToBlob(video: HTMLVideoElement): Promise<File | null> {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.95)
    );

    if (!blob) return null;

    return new File([blob], "thumbnail.jpg", { type: "image/jpeg" });
  }

  async validateImageDimensions(
    file: File,
    minWidth = 600,
    minHeight = 600
  ): Promise<ImageDimensionValidationResult> {
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const { width, height } = img;

        if (width < minWidth || height < minHeight) {
          resolve({
            valid: false,
            width,
            height,
            error: `Image dimensions ${width}x${height} are below minimum requirement of ${minWidth}x${minHeight}`,
          });
        } else {
          resolve({
            valid: true,
            width,
            height,
          });
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve({
          valid: false,
          error: "Failed to load image for validation",
        });
      };

      img.src = objectUrl;
    });
  }

  getFilenameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.split("/").pop() || "";
      return filename;
    } catch {
      return url.split("/").pop() || "";
    }
  }
}

export const fileManager: FileManagerType = new FileManager();

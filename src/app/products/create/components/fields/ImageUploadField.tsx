import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageProps {
  error?: string[];
}

export const ImageUploadField = ({ error }: ImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }

    const NextUrl = URL.createObjectURL(file);
    setPreview(NextUrl);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="imageUrl" className="text-sm font-medium">
        URL de imagen
      </label>

      <input
        id="imageUrl"
        name="imageUrl"
        type="file"
        placeholder="Sube una fotografía de tu bici.."
        accept="image/*"
        onChange={handleFileChange}
        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          width={50}
          height={50}
          className="w-full h-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
        />
      )}
    </div>
  );
};

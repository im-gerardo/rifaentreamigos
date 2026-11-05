'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { toast } from 'sonner';

interface PaymentEvidenceUploadProps {
  paymentId: string;
}

export default function PaymentEvidenceUpload({ paymentId }: PaymentEvidenceUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Por favor, selecciona un archivo primero.');
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `evidence/${paymentId}/${fileName}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('payment-evidence')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Register evidence in our API
      const response = await fetch('/api/payments/evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId,
          storagePath: filePath,
          sha256: '', // Placeholder for actual hash calculation
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al vincular la evidencia');
      }

      toast.success('Evidencia vinculada con éxito');
      setFile(null);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Error al subir comprobante');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 border rounded-md bg-card text-card-foreground">
      <input 
        type="file" 
        onChange={handleFileChange}
        accept="image/*,application/pdf"
        className="text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-string hover:file:bg-primary/80"
      />
      <button
        onClick={handleUpload}
        disabled={!file || isUploading}
        className="text-xs bg-primary text-primary-foreground py-2 px-4 rounded-md disabled:opacity-50 transition-opacity hover:opacity-90"
      >
        {isUploading ? 'Subiendo...' : 'Subir Comprobante'}
      </button>
    </div>
  );
}

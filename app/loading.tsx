import React from 'react';
import { BrandLoader } from '@/components/BrandLoader';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <BrandLoader size="lg" showLabel label="ADIBWAFI.COM" />
    </div>
  );
}

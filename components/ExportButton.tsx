'use client';

import { useState } from 'react';

export function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/resume');
      if (!res.ok) throw new Error('PDF generation failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nullopcode-resume.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="text-terminal-amber hover:text-terminal-amber-bright underline underline-offset-4 disabled:opacity-50 cursor-pointer"
    >
      {loading ? '[downloading...]' : '[download resume.pdf]'}
    </button>
  );
}

import React from 'react';
import { X } from 'lucide-react';

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
      <section className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl animate-fadeIn">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onCancel}
            aria-label="Fechar diálogo"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>
        </header>

        {/* Message */}
        <p className="text-gray-700 mb-6">{message}</p>

        {/* Footer (actions) */}
        <footer className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Excluir
          </button>
        </footer>
      </section>
    </div>
  );
}

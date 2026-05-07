import React from "react";

interface Props {
  description: string;
  setDescription: (val: string) => void;
  disabled: boolean;
}

export function DescriptionInput({ description, setDescription, disabled }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Descrição (Opcional)
      </label>
      <textarea
        placeholder="Observações..."
        className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}
import React from "react";

interface Props {
  name: string;
  setName: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  quantity: number | "";
  setQuantity: (val: number | "") => void;
  imageUrl: string;
  setImageUrl: (val: string) => void;
  disabled: boolean;
}

export function BasicInputFields({
  name, setName, category, setCategory, quantity, setQuantity, imageUrl, setImageUrl, disabled
}: Props) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Espécie *
          </label>
          <input
            placeholder="Ex: Onça Pintada"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria *
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-green-500 outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={disabled}
          >
            <option value="">Selecione...</option>
            <option value="Aves">Aves</option>
            <option value="Mamíferos">Mamíferos</option>
            <option value="Répteis">Répteis</option>
            <option value="Anfíbios">Anfíbios</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade *
          </label>
          <input
            type="number"
            min="1"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value === "" ? "" : Number(e.target.value))
            }
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Link da Imagem
          </label>
          <input
            type="url"
            placeholder="https://site.com/foto.jpg"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  );
}
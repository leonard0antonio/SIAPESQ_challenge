// Componente de campos de entrada básicos, responsável por renderizar os campos de nome da espécie, categoria, quantidade e link da imagem. Ele recebe os valores e as funções de atualização como props, permitindo que o componente pai controle o estado dos campos. Os campos são projetados para serem acessíveis e responsivos, com validação básica para garantir que os dados inseridos sejam apropriados. O componente também inclui estilos para melhorar a usabilidade e a aparência visual dos campos de entrada.

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
  name,
  setName,
  category,
  setCategory,
  quantity,
  setQuantity,
  imageUrl,
  setImageUrl,
  disabled,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <label
            htmlFor="species-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome da Espécie *
          </label>

          <input
            id="species-name"
            name="species-name"
            type="text"
            title="Nome da Espécie"
            placeholder="Ex: Onça Pintada"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled}
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Categoria *
          </label>

          <select
            id="category"
            name="category"
            title="Categoria"
            aria-label="Categoria"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quantidade *
          </label>

          <input
            id="quantity"
            name="quantity"
            title="Quantidade"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Ex: 10"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value === ""
                  ? ""
                  : Number(e.target.value)
              )
            }
            disabled={disabled}
          />
        </div>

        <div>
          <label
            htmlFor="image-url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Link da Imagem
          </label>

          <input
            id="image-url"
            name="image-url"
            title="Link da Imagem"
            type="url"
            placeholder="https://site.com/foto.jpg"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={disabled}
            autoComplete="off"
          />
        </div>

      </div>
    </>
  );
}
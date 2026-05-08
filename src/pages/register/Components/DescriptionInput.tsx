// Componente de campo de descrição, responsável por renderizar um campo de texto para que os usuários possam adicionar observações adicionais sobre a espécie que estão registrando. Ele recebe o valor da descrição, a função para atualizar a descrição e um indicador de desabilitação como props. O campo é projetado para ser acessível e responsivo, com estilos que melhoram a usabilidade e a aparência visual do campo de texto. O componente também inclui um rótulo claro para indicar que o campo é opcional, incentivando os usuários a fornecer informações adicionais sem pressioná-los a fazê-lo.

import React from "react";

// Interface de props para o componente DescriptionInput, definindo os tipos esperados para a descrição, a função de atualização e o estado de desabilitação
interface Props {
  description: string;
  setDescription: (val: string) => void;
  disabled: boolean;
}

export function DescriptionInput({
  description,
  setDescription,
  disabled,
}: Props) {
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

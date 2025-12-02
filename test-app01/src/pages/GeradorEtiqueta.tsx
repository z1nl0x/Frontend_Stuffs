import React, { useState, type DragEvent } from 'react';
import { Head } from '@/components/Head';

// 1. Definição de Tipos
// Define a estrutura para um elemento que será solto na etiqueta
interface ElementoEtiqueta {
  id: number;
  type: string;
  content: string;
  x: number;
  y: number;
}

// Define a estrutura para os elementos arrastáveis
interface DraggableItem {
  id: string;
  label: string;
  icon: string;
}

// Dados para os elementos arrastáveis (Array tipado)
const draggableElements: DraggableItem[] = [
  { id: 'text', label: 'Texto', icon: '📝' },
  { id: 'image', label: 'Imagem', icon: '🖼️' },
  { id: 'barcode', label: 'Código de Barras', icon: '🔢' },
];

// Função que inicia o arrasto (Tipando o evento)
const handleDragStart = (event: DragEvent<HTMLDivElement>, type: string): void => {
  event.dataTransfer.setData('componentType', type);
};


// Componente do Menu Lateral (Sidebar)
// Tipamos o Sidebar como um componente funcional sem props
const Sidebar: React.FC = () => (
  <div className="h-full bg-slate-900 text-white p-4 flex flex-col">
    
    <h2 className="text-xl font-bold mb-4 flex items-center">
        <span role="img" aria-label="settings" className="mr-2">⚙️</span> Configurações da Etiqueta
    </h2>

    {/* Inputs e Botão de Geração */}
    <div className="space-y-4 mb-8">
      
      {/* INPUT DESCRIÇÃO */}
      <label className="block">
        <span className="text-gray-200 text-sm">Descrição:</span>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-600 shadow-sm p-2 text-white bg-slate-800 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500" 
          placeholder="Insira a descrição"
        />
      </label>
      
      {/* INPUT CÓDIGO DE BARRAS */}
      <label className="block">
        <span className="text-gray-200 text-sm">Código de Barras:</span>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-600 shadow-sm p-2 text-white bg-slate-800 placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Insira o código"
        />
      </label>
      
      <button
        type="button"
        className="w-full py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
      >
        Gerar Etiqueta
      </button>
    </div>

    {/* Área de Drag and Drop (Fonte) */}
    <h2 className="text-lg font-bold mb-4 flex items-center">
        <span role="img" aria-label="elements" className="mr-2">🧱</span> Elementos (Arrastar)
    </h2>
    <div className="space-y-3">
        {draggableElements.map((element) => (
            <div
                key={element.id}
                draggable="true" 
                // Chamada da função tipada
                onDragStart={(e) => handleDragStart(e, element.id)} 
                className="p-3 bg-slate-800 border border-slate-700 rounded-md cursor-grab hover:bg-slate-700 transition duration-150 flex items-center text-sm"
            >
                <span className="mr-2">{element.icon}</span> {element.label}
            </div>
        ))}
    </div>
  </div>
);


// Componente Principal (Convertido para TSX)
export function GeradorEtiqueta() {
  // 2. Tipando o estado com a interface ElementoEtiqueta[]
  const [elements, setElements] = useState<ElementoEtiqueta[]>([]);

  // 3. Tipando as funções de Drag and Drop
  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault(); 
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const componentType = event.dataTransfer.getData('componentType');
    
    if (componentType) {
      // É uma boa prática usar React.useRef para referenciar o DOM,
      // mas para manter a lógica simples, usamos o event.currentTarget
      const dropTargetRect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - dropTargetRect.left;
      const offsetY = event.clientY - dropTargetRect.top;

      setElements((prevElements) => [
        ...prevElements, 
        { 
          id: Date.now(), 
          type: componentType, 
          content: `Conteúdo de ${componentType}`,
          x: offsetX,
          y: offsetY,
        } as ElementoEtiqueta // Casting para garantir o tipo na adição
      ]);
    }
  };

  return (
    <>
      <Head title="Gerador de Etiqueta" />
      <div className="flex min-h-screen bg-white">
        
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-grow p-6 flex flex-col">
          
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">✨ Área de Design</h1>
          
          {/* Área da Etiqueta (Drop Target) */}
          <div 
            className="w-full h-full bg-white border-2 border-dashed border-gray-400 relative overflow-hidden flex items-center justify-center"
            // Atributos de evento tipados
            onDragOver={handleDragOver} 
            onDrop={handleDrop}         
          >
            {elements.length === 0 && (
              <div 
                className="text-black"
              >
                Arraste os elementos para cá
              </div>
            )}

            {elements.map((el: ElementoEtiqueta) => ( // Tipando o elemento no map
              <div 
                key={el.id} 
                className="absolute p-2 text-black border border-blue-500 bg-blue-100 text-sm whitespace-nowrap cursor-move shadow-md"
                style={{
                  left: el.x,
                  top: el.y,
                  transform: 'translate(-50%, -50%)', 
                }}
              >
                {el.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
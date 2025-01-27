import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p className="text-center">
        Bem-vindo ao seu portal definitivo para gerenciamento de clãs no Clash of Clans! Aqui, você encontrará as ferramentas mais avançadas e intuitivas para levar seu clã ao próximo nível. Desde a organização estratégica das guerras de clãs até a gestão eficiente dos membros e recursos, nosso site oferece tudo que você precisa para dominar o jogo.
      </p>
      <ul className="list-disc list-inside text-left">
        <li>
          <strong>Planejar Guerras:</strong> Crie planos detalhados para suas guerras de clãs, assegurando a vitória em cada batalha.
        </li>
        <li>
          <strong>Gerenciar Membros:</strong> Acompanhe a atividade, contribuição e evolução de cada membro do clã com facilidade.
        </li>
        <li>
          <strong>Histórico de Guerras:</strong> Revise os registros de guerras passadas para analisar estratégias, melhorar táticas e celebrar vitórias.
        </li>
        <li>
          <strong>Informações de Outros Jogadores:</strong> Acesse perfis detalhados de outros jogadores, incluindo suas conquistas, níveis de tropas e desempenho em guerras.
        </li>
        <li>
          <strong>Analisar Desempenho:</strong> Utilize essas ferramentas de análise para identificar os pontos fortes e áreas de melhoria do seu clã.
        </li>
      </ul>
      <p className="text-center">
        Unifique seu clã, potencialize suas estratégias e conquiste mais vitórias com as nossas ferramentas de gerenciamento de clãs no Clash of Clans. Prepare-se para liderar seu clã como nunca antes!
      </p>
    </div>
  );
}

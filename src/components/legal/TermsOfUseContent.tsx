import React from 'react';
import { BookOpen, FileCheck, AlertTriangle, ShieldCheck } from 'lucide-react';

export const TermsOfUseContent: React.FC = () => {
  return (
    <article className="space-y-6 text-sm text-[#b7c4d3] leading-relaxed">
      <header className="border-b border-[#1688ff]/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#35a7ff] uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4 text-[#1688ff]" aria-hidden="true" />
          <span>Regras de Utilização do Catálogo Digital</span>
        </div>
        <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
          Termos de Uso
        </h2>
        <p className="text-xs text-[#8faec7] mt-1">
          Última atualização: <strong className="text-white">30 de outubro de 2026</strong>
        </p>
      </header>

      {/* Dados do Estabelecimento */}
      <section className="p-4 rounded-xl bg-[#05162d] border border-[#1688ff]/20 space-y-2">
        <h3 className="font-display text-sm font-bold text-white uppercase flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-[#35a7ff]" aria-hidden="true" />
          <span>1. Dados do Estabelecimento</span>
        </h3>
        <p className="text-xs">
          Ao utilizar este biosite, você concorda com os presentes Termos de Uso estabelecidos por:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-lg bg-[#020812] border border-[#1688ff]/15">
            <span className="block text-[11px] text-[#8faec7] uppercase font-bold">Empresa:</span>
            <span className="font-semibold text-white bg-amber-400/20 px-1 py-0.5 rounded text-amber-200">
              [Nome da Empresa ou Razão Social]
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#020812] border border-[#1688ff]/15">
            <span className="block text-[11px] text-[#8faec7] uppercase font-bold">CNPJ ou CPF:</span>
            <span className="font-semibold text-white bg-amber-400/20 px-1 py-0.5 rounded text-amber-200">
              [00.000.000/0000-00 ou CPF]
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#020812] border border-[#1688ff]/15">
            <span className="block text-[11px] text-[#8faec7] uppercase font-bold">E-mail de Contato:</span>
            <span className="font-semibold text-white bg-amber-400/20 px-1 py-0.5 rounded text-amber-200">
              [contato@arllonbarbearia.com.br]
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#020812] border border-[#1688ff]/15">
            <span className="block text-[11px] text-[#8faec7] uppercase font-bold">Localização:</span>
            <span className="font-semibold text-white bg-amber-400/20 px-1 py-0.5 rounded text-amber-200">
              [Endereço completo da barbearia com CEP]
            </span>
          </div>
        </div>
      </section>

      {/* Natureza Exclusivamente Informativa */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          2. Natureza Exclusivamente Informativa e Simulador
        </h3>
        <p>
          Este biosite é um <strong>catálogo digital interativo e simulador de estimativa de valores</strong>.
        </p>
        <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>ESTE SITE NÃO É UMA LOJA VIRTUAL:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Não realizamos cobranças, pagamentos online ou transações financeiras pela página.</li>
            <li>Não realizamos agendamento automático ou bloqueio de horários na agenda em tempo real.</li>
            <li>Os valores, durações médias e descrições dos serviços são estimativas para auxílio do cliente.</li>
            <li>O valor final e a viabilidade dos procedimentos estão sujeitos à avaliação presencial do profissional na barbearia.</li>
          </ul>
        </div>
      </section>

      {/* Uso Adequado e Responsabilidade */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          3. Uso Adequado da Aplicação
        </h3>
        <p>
          O usuário compromete-se a utilizar o biosite de boa-fé, abstendo-se de tentar injetar códigos maliciosos, sobrecarregar os servidores por meio de robôs ou ferramentas automatizadas (scraping / DoS), ou violar as diretrizes de segurança da página.
        </p>
      </section>

      {/* Propriedade Intelectual */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          4. Propriedade Intelectual e Imagens
        </h3>
        <p>
          O logotipo oficial, os textos descritivos, as fotografias institucionais dos serviços e os elementos de design presentes nesta aplicação são protegidos pelas leis brasileiras de direitos autorais e propriedade industrial. É proibida a reprodução ou uso comercial não autorizado sem consentimento prévio por escrito.
        </p>
      </section>

      {/* Contato e Foro */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          5. Legislação Aplicável e Foro
        </h3>
        <p>
          Estes Termos são regidos pelas leis da República Federativa do Brasil, em especial o Código de Defesa do Consumidor (Lei nº 8.078/1990) e o Marco Civil da Internet (Lei nº 12.965/2014).
        </p>
      </section>
    </article>
  );
};

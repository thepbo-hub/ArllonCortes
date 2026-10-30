import React from 'react';
import { ShieldCheck, Mail, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyContent: React.FC = () => {
  return (
    <article className="space-y-6 text-sm text-[#b7c4d3] leading-relaxed">
      <header className="border-b border-[#1688ff]/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#35a7ff] uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4 text-[#1688ff]" aria-hidden="true" />
          <span>Conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</span>
        </div>
        <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
          Política de Privacidade
        </h2>
        <p className="text-xs text-[#8faec7] mt-1">
          Última atualização: <strong className="text-white">30 de outubro de 2026</strong>
        </p>
      </header>

      {/* Identificação do Controlador */}
      <section className="p-4 rounded-xl bg-[#05162d] border border-[#1688ff]/20 space-y-2">
        <h3 className="font-display text-sm font-bold text-white uppercase flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#35a7ff]" aria-hidden="true" />
          <span>1. Identificação do Controlador de Dados</span>
        </h3>
        <p className="text-xs">
          O responsável pelas decisões referentes ao tratamento de dados pessoais no âmbito deste biosite é:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
          <div className="p-2.5 rounded-lg bg-[#020812] border border-[#1688ff]/15">
            <span className="block text-[11px] text-[#8faec7] uppercase font-bold">Empresa / Razão Social:</span>
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
            <span className="block text-[11px] text-[#8faec7] uppercase font-bold">E-mail de Contato / Encarregado (DPO):</span>
            <span className="font-semibold text-white bg-amber-400/20 px-1 py-0.5 rounded text-amber-200">
              [contato@arllonbarbearia.com.br]
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#020812] border border-[#1688ff]/15">
            <span className="block text-[11px] text-[#8faec7] uppercase font-bold">Endereço do Estabelecimento:</span>
            <span className="font-semibold text-white bg-amber-400/20 px-1 py-0.5 rounded text-amber-200">
              [Endereço completo da barbearia com CEP]
            </span>
          </div>
        </div>
      </section>

      {/* Princípio de Coleta Mínima */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          2. Princípio da Coleta Mínima de Dados
        </h3>
        <p>
          Este site foi desenvolvido com a premissa de <strong>Privacy by Design (Privacidade por Padrão)</strong>. 
          Não solicitamos nem armazenamos seu nome, CPF, e-mail, telefone, dados de cartão de crédito ou quaisquer dados pessoais 
          sensíveis em nossos servidores ao navegar pelo catálogo ou montar seu orçamento interativo.
        </p>
        <p>
          Toda a seleção de procedimentos, opções de variantes e cálculo do subtotal ocorre <strong>exclusivamente na memória temporária do seu navegador</strong>. 
          Ao fechar a página ou reiniciar o navegador, as escolhas são descartadas.
        </p>
      </section>

      {/* Envio via WhatsApp */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          3. Comunicação Voluntária pelo WhatsApp
        </h3>
        <p>
          A única forma de contato gerada a partir deste biosite ocorre quando você clica deliberadamente no botão 
          <strong> &quot;ENVIAR MEU ORÇAMENTO PELO WHATSAPP&quot;</strong>. 
          Nesse momento:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
          <li>
            Uma mensagem de texto pré-formatada com os procedimentos escolhidos e o subtotal estimado é transmitida diretamente para o aplicativo oficial do WhatsApp instalado no seu dispositivo ou navegador.
          </li>
          <li>
            Nenhum dado é salvo no site antes do envio. A conversa e os dados que você decidir compartilhar (como seu número de telefone, nome ou horários desejados) passam a ser regidos pela relação direta de atendimento entre você e a barbearia, além dos termos de privacidade do próprio WhatsApp (Meta Platforms, Inc.).
          </li>
        </ul>
      </section>

      {/* Terceiros Utilizados */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          4. Serviços de Terceiros e Infraestrutura
        </h3>
        <p>
          Para que o site funcione de maneira rápida, segura e estável, utilizamos os seguintes prestadores de infraestrutura estática:
        </p>
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-lg bg-[#05162d] border border-[#1688ff]/15">
            <strong className="text-white block text-sm mb-1">Vercel Inc. (Hospedagem &amp; CDN Global)</strong>
            <span>
              Hospeda os arquivos estáticos do site (HTML, CSS e JavaScript). A Vercel processa dados técnicos de requisição (endereço IP anonimizado, User-Agent do navegador, data e hora) estritamente para segurança, prevenção de ataques DDoS e entrega de conteúdo.
            </span>
          </div>
          <div className="p-3 rounded-lg bg-[#05162d] border border-[#1688ff]/15">
            <strong className="text-white block text-sm mb-1">WhatsApp / Meta Platforms, Inc.</strong>
            <span>
              Canal de comunicação externo acessado apenas mediante ação voluntária do usuário via link seguro.
            </span>
          </div>
          <div className="p-3 rounded-lg bg-[#05162d] border border-[#1688ff]/15">
            <strong className="text-white block text-sm mb-1">Servidores de Mídia (i.postimg.cc / yourimageshare.com)</strong>
            <span>
              Hospedagem de imagens demonstrativas dos cortes e vídeo institucional. Nenhum dado do usuário é compartilhado além da requisição HTTP padrão para carregar o arquivo visual.
            </span>
          </div>
        </div>
      </section>

      {/* Direitos do Titular LGPD */}
      <section className="p-4 rounded-xl bg-gradient-to-br from-[#082e5a]/80 to-[#041426] border border-[#1688ff]/30 space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#35a7ff]" aria-hidden="true" />
          <span>5. Direitos do Titular de Dados (Art. 18 da LGPD)</span>
        </h3>
        <p className="text-xs sm:text-sm">
          Como titular de dados pessoais, você possui os seguintes direitos garantidos pela legislação brasileira:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#35a7ff] shrink-0 mt-0.5" />
            <span>Confirmação da existência de tratamento e acesso aos dados;</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#35a7ff] shrink-0 mt-0.5" />
            <span>Correção de dados incompletos, inexatos ou desatualizados;</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#35a7ff] shrink-0 mt-0.5" />
            <span>Anonimização, bloqueio ou eliminação de dados desnecessários;</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#35a7ff] shrink-0 mt-0.5" />
            <span>Revogação de consentimento a qualquer momento;</span>
          </div>
        </div>
        <div className="pt-2 text-xs border-t border-[#1688ff]/20">
          <strong className="text-white">Canal para Atendimento aos Direitos do Titular:</strong>
          <p className="mt-1">
            Para exercer qualquer um destes direitos ou tirar dúvidas sobre a privacidade dos seus dados, envie uma mensagem para o e-mail:
            <span className="block mt-1 font-mono text-[#35a7ff] font-semibold bg-[#020812] p-2 rounded border border-[#1688ff]/30">
              [E-mail de Contato para Privacidade: dpo@arllonbarbearia.com.br ou contato@arllonbarbearia.com.br]
            </span>
          </p>
        </div>
      </section>

      {/* Natureza Informativa */}
      <section className="flex items-start gap-3 p-3.5 rounded-xl bg-[#05162d] border border-amber-500/30 text-amber-200 text-xs">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong>Caráter Informativo:</strong> As durações, valores e disponibilidade de procedimentos apresentados no biosite são estimativas informativas. O diagnóstico final capilar e facial e a confirmação de valores ocorrem presencialmente com o profissional no momento do atendimento.
        </p>
      </section>
    </article>
  );
};

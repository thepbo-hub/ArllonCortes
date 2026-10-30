import React from 'react';
import { Cookie, CheckCircle2, XCircle, Settings, ShieldCheck } from 'lucide-react';

interface CookiePolicyContentProps {
  onOpenPreferences?: () => void;
}

export const CookiePolicyContent: React.FC<CookiePolicyContentProps> = ({ onOpenPreferences }) => {
  return (
    <article className="space-y-6 text-sm text-[#b7c4d3] leading-relaxed">
      <header className="border-b border-[#1688ff]/20 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#35a7ff] uppercase tracking-wider mb-1">
          <Cookie className="w-4 h-4 text-[#1688ff]" aria-hidden="true" />
          <span>Transparência e Controle do Usuário</span>
        </div>
        <h2 className="font-display text-2xl font-black text-white uppercase tracking-tight">
          Política de Cookies
        </h2>
        <p className="text-xs text-[#8faec7] mt-1">
          Última atualização: <strong className="text-white">30 de outubro de 2026</strong>
        </p>
      </header>

      {/* Identificação */}
      <section className="p-4 rounded-xl bg-[#05162d] border border-[#1688ff]/20 space-y-2">
        <h3 className="font-display text-sm font-bold text-white uppercase flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#35a7ff]" aria-hidden="true" />
          <span>1. Controlador Responsável</span>
        </h3>
        <p className="text-xs">
          Esta Política de Cookies se aplica a este biosite, operado por:
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
            <span className="block text-[11px] text-[#8faec7] uppercase font-bold">Contato de Privacidade:</span>
            <span className="font-semibold text-white bg-amber-400/20 px-1 py-0.5 rounded text-amber-200">
              [contato@arllonbarbearia.com.br]
            </span>
          </div>
        </div>
      </section>

      {/* O que são cookies */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          2. O que são Cookies e Armazenamento Local?
        </h3>
        <p>
          Cookies e armazenamento local (como <code>localStorage</code>) são pequenos registros digitais gravados no seu dispositivo pelo navegador web para memorizar preferências essenciais, como sua opção de consentimento ou estabilidade de navegação.
        </p>
      </section>

      {/* Auditoria detalhada de Cookies do site */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          3. Auditoria de Cookies e Scripts Ativos neste Site
        </h3>
        <p>
          Em estrito cumprimento à LGPD, realizamos uma revisão integral de todos os scripts e bibliotecas do site:
        </p>

        <div className="space-y-3">
          {/* Categoria 1: Necessários */}
          <div className="p-3.5 rounded-xl bg-[#05162d] border border-[#1688ff]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Cookies e Armazenamentos Estritamente Necessários (Ativos)
              </span>
              <span className="text-[11px] font-bold text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                Essencial
              </span>
            </div>
            <p className="text-xs mb-2">
              São indispensáveis para o funcionamento técnico básico do site e registro de suas escolhas. Não coletam informações para fins de marketing.
            </p>
            <div className="text-xs font-mono bg-[#020812] p-2 rounded border border-[#1688ff]/15 space-y-1">
              <div><strong className="text-[#35a7ff]">arllon_cookie_consent_v1</strong> (localStorage)</div>
              <div className="text-[#8faec7]">Finalidade: Memorizar se você aceitou ou recusou cookies não essenciais.</div>
              <div className="text-[#8faec7]">Duração: Persistente até que você limpe os dados do navegador ou altere suas opções.</div>
            </div>
          </div>

          {/* Categoria 2: Analytics & Publicidade */}
          <div className="p-3.5 rounded-xl bg-[#05162d] border border-[#1688ff]/15 opacity-90">
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-blue-400" />
                Cookies de Analytics, Pixels e Publicidade
              </span>
              <span className="text-[11px] font-bold text-[#8faec7] uppercase bg-[#020812] border border-[#1688ff]/20 px-2 py-0.5 rounded">
                Bloqueados por Padrão
              </span>
            </div>
            <p className="text-xs">
              <strong>Estado atual:</strong> Este site <strong>não possui nenhum pixel do Facebook/Meta, Google Analytics, rastreador publicitário ou script espião em execução</strong>. Caso qualquer ferramenta analítica seja implementada no futuro, ela permanecerá totalmente desativada até que você forneça seu aceite explícito no banner de cookies.
            </p>
          </div>
        </div>
      </section>

      {/* Como gerenciar */}
      <section className="space-y-3">
        <h3 className="font-display text-base font-bold text-white uppercase tracking-tight">
          4. Como Gerenciar ou Revogar seu Consentimento
        </h3>
        <p>
          Você pode redefinir ou revogar suas escolhas a qualquer momento clicando no botão abaixo ou através do link permanente <strong>&quot;Preferências de Cookies&quot;</strong> disponível no rodapé de todas as páginas:
        </p>

        {onOpenPreferences && (
          <div className="pt-1">
            <button
              type="button"
              onClick={onOpenPreferences}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#082e5a] to-[#0b4278] hover:from-[#0b4278] hover:to-[#1688ff] text-white text-xs font-bold uppercase tracking-wider border border-[#1688ff]/40 shadow-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35a7ff]"
            >
              <Settings className="w-4 h-4 text-[#35a7ff]" aria-hidden="true" />
              <span>Abrir Gerenciador de Preferências de Cookies</span>
            </button>
          </div>
        )}
      </section>
    </article>
  );
};

import { useForm } from 'react-hook-form';
import type { EstoqueRequestDTO } from '@/api/estoque/estoque.types.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { estoqueFormSchema } from '@/api/estoque/estoque.schemas.tsx';
import { useAppToast } from '@/api/context/ToastContext.tsx';
import { useEffect, useState } from 'react';
import { listarLocalizacoes } from '@/api/localizacao/localizacao.service.tsx';
import type { AppError } from '@/api/client.tsx';
import { criarEstoque } from '@/api/estoque/estoque.service.tsx';
import { onNestedSubmit } from '@/utils/nestedFormSubmit.tsx';
import type { LocalizacaoResponseDTO } from '@/api/localizacao/localizacao.types.tsx';

/** Interface para parâmetros do hook. */
interface useEstoqueDialogProps {
  produtoCriadoId: string;
  updateLocalizacoesTrigger: () => void;
}

/**
 * Hook customizado para a lógica do componente de criação de estoque.
 *
 * -> Gerencia o estado do componente.
 *
 * -> Busca de localizações.
 *
 * -> Validação do formulário de criação.
 *
 * -> Gerencia o evento de envio para o backend.
 * */
export const useEstoqueDialog = ({
  produtoCriadoId,
  updateLocalizacoesTrigger,
}: useEstoqueDialogProps) => {
  /** Implementa o hook useAppToast para gerenciar as notificações via Toast. */
  const notify = useAppToast();

  // Estados das localizacoes.
  const [localizacoes, setLocalizacoes] = useState<LocalizacaoResponseDTO[]>(
    []
  );
  const [carregandoLocalizacoes, setCarregandoLocalizacoes] = useState(true);

  /** Configuração do formulário. */
  const form = useForm<EstoqueRequestDTO>({
    resolver: zodResolver(estoqueFormSchema),
    mode: 'onChange',
  });

  /** Extrai os métodos para no hook. */
  const { setValue, handleSubmit } = form;

  useEffect(() => {
    async function carregarLocalizacoes() {
      try {
        setCarregandoLocalizacoes(true);
        setValue('produtoId', produtoCriadoId);
        const localizacoesData = await listarLocalizacoes();
        setLocalizacoes(localizacoesData);
      } catch (e) {
        const error = e as AppError;
        notify({
          intent: error.intent || 'error',
          title: 'Carregar localizações',
          body: error.message || 'Falha ao processar a requisição.',
        });
        console.error('Erro ao carregar localizações:', error);
      } finally {
        setCarregandoLocalizacoes(false);
      }
    }
    void carregarLocalizacoes().catch(console.error);
  }, [updateLocalizacoesTrigger, setValue, notify]);

  /** onSubmit para enviar ao backend.
   *
   * Corrige os dados
   * */
  async function onEstoqueFormSubmit(data: EstoqueRequestDTO) {
    const payloadParaBackend = {
      ...data,
      localizacaoId: data.localizacaoId,
      quantidade: data.quantidade,
    };

    try {
      await criarEstoque(payloadParaBackend);

      notify({
        intent: 'success',
        title: 'Adicionar estoque',
        body: 'Estoque adicionado com sucesso.',
      });
    } catch (error) {
      const err = error as AppError;

      notify({
        intent: err.intent || 'error',
        title: 'Adicionar estoque',
        body: err.message || 'Falha ao processar a requisição.',
      });

      console.error(error);
    }
  }

  return {
    localizacoes,
    carregandoLocalizacoes,

    form,
    onSubmit: onNestedSubmit({
      handleSubmit,
      submitFunction: onEstoqueFormSubmit,
    }),
  };
};

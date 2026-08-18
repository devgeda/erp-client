import {
  Button,
  Card,
  Field,
  Input,
  Link,
  makeStyles,
} from '@fluentui/react-components';
import { useForm } from 'react-hook-form';
import {
  criarUsuario,
  type signupFormData,
  signupFormSchema,
} from '@/api/autenticacao/auth.service.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh', // Ocupa 100% da altura da tela
    width: '100%', // Ocupa a largura total
    alignItems: 'center', // Alinha na vertical (correto no lugar de 'align')
    justifyContent: 'center', // Alinha na horizontal
    boxSizing: 'border-box',
    padding: '6px',
  },
  flexCol: {
    display: 'flex-col',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '24px',
  },
  link: {
    display: 'flex',
    gap: '6px',
  },
});

export const SignupPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  });

  async function onSubmit(data: signupFormData) {
    try {
      const payload = {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      };

      await criarUsuario(payload);

      navigate('/log-in');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.root}>
      <Card className="w-full max-w-sm">
        <header>
          <h1>Cadastrar conta business.name</h1>
          <h3>Preencha os dados para criar sua conta business.name.</h3>
        </header>
        <form id={'form-sign-up'} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.flexCol}>
            <Field
              label={'Nome'}
              validationState={errors.nome ? 'error' : 'none'}
              validationMessage={errors.nome?.message}
              required
            >
              <Input
                {...register('nome')}
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                autoComplete="off"
              />
            </Field>
            <Field
              label={'Email'}
              validationState={errors.email ? 'error' : 'none'}
              validationMessage={errors.email?.message}
              required
            >
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                autoComplete="off"
              />
            </Field>
            <Field
              label={'Senha'}
              validationState={errors.senha ? 'error' : 'none'}
              validationMessage={errors.senha?.message}
              required
            >
              <Input
                {...register('senha')}
                id="senha"
                type="password"
                placeholder="Digite uma senha"
                autoComplete="off"
              />
            </Field>
            <Field
              label={'Confirmar Senha'}
              validationState={errors.confirmarSenha ? 'error' : 'none'}
              validationMessage={errors.confirmarSenha?.message}
              required
            >
              <Input
                {...register('confirmarSenha')}
                id="confirmarSenha"
                type="password"
                placeholder="Repita a senha"
                autoComplete="off"
              />
            </Field>
          </div>
          <Field>
            <Button type="submit" appearance={'primary'}>
              Cadastar-se
            </Button>
          </Field>
          <div className={styles.link}>
            Já tem uma conta?
            <Link href="/log-in">Entrar</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

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
  login,
  type loginFormData,
  loginFormSchema,
  type LoginRequestDTO,
} from '@/api/autenticacao/auth.service.tsx';
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

export const LoginPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestDTO>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: loginFormData) {
    try {
      await login(data);

      navigate('/produtos');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.root}>
      <Card>
        <header>
          <h1>Entrar na conta business.name</h1>
          <h3>Insira um email e senha para acessar sua conta business.name.</h3>
        </header>

        <form id={'form-log-in'} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.flexCol}>
            <div>
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
            </div>
            <div>
              <Field
                label={'Senha'}
                validationState={errors.senha ? 'error' : 'none'}
                validationMessage={errors.senha?.message}
                required
              >
                <Input {...register('senha')} type="password" />
              </Field>
              <Link href="#" className={styles.link}>
                Esqueceu a senha?
              </Link>
            </div>
          </div>
          <Field>
            <Button type={'submit'} appearance={'primary'}>
              Entrar
            </Button>
          </Field>
          <div className={styles.link}>
            Não tem uma conta?
            <Link href={'/sign-up'}>Cadastrar-se</Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

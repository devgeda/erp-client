import {
  Button,
  Card,
  Field,
  Input,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { useForm } from 'react-hook-form';
import {
  login,
  type loginFormData,
  loginFormSchema,
  type LoginRequestDTO,
} from '@/api/authentication/auth.service.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('24px'),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.gap('16px'),
    boxShadow: tokens.shadow2,
  },
});

export const LoginPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginRequestDTO>({
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
    <form id={'form-login'} onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-sm">
        <header>
          <h1>Entrar na conta business.name</h1>
          <h3>Insira um email e senha para acessar sua conta business.name.</h3>
        </header>
        <div>
          <div>
            <Field label={'Email'}>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                autoComplete="off"
                required
              />
            </Field>
          </div>
          <div>
            <Field label={'Senha'}>
              <div className="flex items-center">
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                {...register('senha')}
                id="senha"
                type="password"
                autoComplete="off"
                required
              />
            </Field>
          </div>
          <Field>
            <Button type={'submit'}>Entrar</Button>
          </Field>
        </div>
      </Card>
    </form>
  );
};

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import {
  login,
  type loginFormData,
  loginFormSchema,
  type LoginRequestDTO,
} from '@/features/autenticacao/auth.service.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input.tsx';

/*
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
*/

export const LoginPage = () => {
  // const styles = useStyles(); > implementado tailwindcss (v4).
  const navigate = useNavigate();

  const { handleSubmit } = useForm<LoginRequestDTO>({
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
    <div
      className={
        'flex h-screen w-full items-center justify-center box-border p-1.5'
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>Entrar na conta business.name</CardTitle>
          <CardDescription>
            Insira um email e senha para acessar sua conta business.name.
          </CardDescription>
          <CardAction>
            <Button variant={'link'}>Cadastrar-se</Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form id={'form-log-in'} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={'flex flex-col gap-6'}>
              <div className={'grid gap-2'}>
                <Label htmlFor={'email'}>Email</Label>
                <Input
                  id={'email'}
                  type={'email'}
                  placeholder={'email@exemplo.com'}
                  required
                />
              </div>
              <div className={'grid gap-2'}>
                <div className={'flex items-center'}>
                  <Label htmlFor={'senha'}>Senha</Label>
                  <a
                    href={'#'}
                    className={
                      'ml-auto inline-block text-sm underline-offset-4 hover:underline'
                    }
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input id={'password'} type={'password'} required />
              </div>{' '}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type={'submit'} variant={'default'}>
            Entrar
          </Button>
          <a
            className={
              'ml-auto inline-block text-sm underline-offset-4 hover:underline'
            }
          >
            Não tem uma conta?
            <a href={'/sign-up'}>Cadastrar-se</a>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

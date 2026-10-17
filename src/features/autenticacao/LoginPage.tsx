import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { useForm } from 'react-hook-form';
import {
  login,
  type loginFormData,
  loginFormSchema,
  type LoginRequestDTO,
} from '@/features/autenticacao/auth.service.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/shared/components/ui/input.tsx';

export const LoginPage = () => {
  // const styles = useStyles(); > implementado tailwindcss (v4).
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm<LoginRequestDTO>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  });

  async function onSubmit(data: loginFormData) {
    try {
      await login(data);

      navigate('/produtos/pesquisar');
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
                  {...register('email')}
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
                <Input
                  id={'senha'}
                  {...register('senha')}
                  type={'password'}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type={'submit'} form={'form-log-in'} variant={'default'}>
            Entrar
          </Button>
          <a
            className={
              'ml-auto inline-block text-sm underline-offset-4 hover:underline'
            }
          >
            Não tem uma conta?
          </a>
          <a href={'/sign-up'}>Cadastrar-se</a>
        </CardFooter>
      </Card>
    </div>
  );
};

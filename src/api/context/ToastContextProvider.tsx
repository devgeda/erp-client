import {
  Toast,
  ToastBody,
  Toaster,
  ToastTitle,
  useId,
  useToastController,
} from '@fluentui/react-components';
import { type ReactNode } from 'react';
import { ToastContext, type ToastOptions } from './ToastContext.tsx';

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const toasterId = useId('global-toaster');
  const { dispatchToast } = useToastController(toasterId);

  const notify = ({ intent, title, body, subtitle }: ToastOptions) => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        {body && <ToastBody subtitle={subtitle || ''}>{body}</ToastBody>}
      </Toast>,
      { position: 'bottom-start', intent }
    );
  };

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <Toaster toasterId={toasterId}></Toaster>
    </ToastContext.Provider>
  );
};

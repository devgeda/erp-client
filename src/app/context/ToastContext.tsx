import { createContext, useContext } from 'react';
import type { ToastIntent } from '@fluentui/react-components';

export type ToastOptions = {
  intent: ToastIntent;
  title: string;
  body: string;
  subtitle?: string;
};

export const ToastContext = createContext<(options: ToastOptions) => void>(
  () => {}
);

export const useAppToast = () => useContext(ToastContext);

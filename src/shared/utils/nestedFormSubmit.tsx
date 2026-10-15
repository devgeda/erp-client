import type { FieldValues, UseFormHandleSubmit } from 'react-hook-form';
import * as React from 'react';

type Props<T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T>;
  submitFunction: (values: T) => Promise<void> | void;
};

export const onNestedSubmit = <T extends FieldValues>({
  handleSubmit,
  submitFunction,
}: Props<T>) => {
  return async (event: React.SubmitEvent<HTMLFormElement>) => {
    if (event) {
      if (typeof event.preventDefault === 'function') {
        event.preventDefault();
      }

      if (typeof event.stopPropagation === 'function') {
        event.stopPropagation();
      }
    }

    return handleSubmit(submitFunction)(event);
  };
};

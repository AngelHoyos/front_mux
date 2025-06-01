import { useState } from "react";

type FormValues<T> = {
  [K in keyof T]: T[K];
};

export const UploadFormVideo = <T extends Record<string, any>>(
  initialValues: T
) => {
  const [values, setValues] = useState<FormValues<T>>(initialValues);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormValues<T>>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setValues((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmiting(false);
  };

  const handleSubmit = async (
    onsubmit: (values: FormValues<T>) => Promise<void> | void
  ) => {
    setIsSubmiting(true);
    try {
      await onsubmit(values);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmiting(false);
    }
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    isSubmiting,
    handleChange,
    resetForm,
    handleSubmit,
  };
};

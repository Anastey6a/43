import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required("Ім'я є обов'язковим"),
  email: yup.string().email("Невірний формат електронної пошти").required("Електронна пошта є обов'язковою"),
  phone: yup.string()
    .matches(/^[0-9]{12}$/, "Телефон повинен містити лише цифри та мати довжину 12")
    .required("Телефон є обов'язковим")
});

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Ім'я</label>
        <input type="text" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Електронна пошта</label>
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Телефон</label>
        <input type="text" {...register('phone')} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <button type="submit">Відправити</button>
    </form>
  );
};

export default MyForm;

import React, { useRef, useCallback } from 'react';

import { FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';

import * as Yup from 'yup';

import { useHistory, useLocation } from 'react-router-dom';

import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Input } from '../../components/Input';

import { Button } from '../../components/Button';

import { useToast } from '../../hooks/toast';

import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

interface IResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const location = useLocation();

  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatório'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Senha e confirmação de senha devem ser iguais.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        const { password, password_confirmation } = data;

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(error));
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro resetar senha',
          description: 'Ocorreu um erro ao resetar usa senha, tente novamente.',
        });
      }
    },
    [addToast, history, location.search],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação de senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;

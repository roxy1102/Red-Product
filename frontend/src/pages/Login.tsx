import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuthHook';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import background1 from '../assets/background1.png';
import background2 from '../assets/background2.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard'); // Redirection après succès
    } catch (err: unknown) {
      interface AxiosErrorLike {
        response?: {
          status: number;
          data: {
            errors: Record<string, string[]>;
          };
        };
      }
      const axiosErr = err as AxiosErrorLike;
      if (axiosErr.response?.status === 422) {
        const errors = axiosErr.response.data.errors;
        const firstError = Object.values(errors)[0]?.[0] || "Erreur de validation inconnue";
        alert(firstError);
      } else {
        alert("Erreur de connexion inconnue");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background1})` }}
      ></div>

      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-35"
        style={{ backgroundImage: `url(${background2})` }}
      ></div>

      <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md p-4">
        <img src={logo} alt="logo" className="w-30 h-8 mb-3" />
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
          <h3 className="text-center mb-6 text-gray-600">
            Connectez-vous à votre compte
          </h3>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <input type="checkbox" className="mr-2 leading-tight" />
            <span className="text-sm text-gray-700">Gardez-moi connecté</span>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-2 text-center text-sm text-gray-600">
          <a href="/forgotpassword" className="text-yellow-300">
            Mot de passe oublié ?
          </a>
        </div>

        <div className="mt-4 text-white">
          Vous n'avez pas de compte ?{' '}
          <a href="/register" className="text-yellow-300">
            S'inscrire
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

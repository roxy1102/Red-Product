import React, { useState } from 'react';
import { registerUser } from '../services/authServices';
import { useAuth } from '../hooks/useAuthHook';
import logo from '../assets/logo.png';
import background1 from '../assets/background1.png';
import background2 from '../assets/background2.png';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const data = await registerUser({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }) as { token: string };
      console.log('Inscription réussie !', data);
      login(data.token);
    } catch (err: any) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        console.error("Erreur d'inscription:", err);
        alert("Erreur d'inscription inconnue");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background principal */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${background1})` }}
      ></div>

      {/* Background secondaire avec fusion */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-35"
        style={{ backgroundImage: `url(${background2})` }}
      ></div>

      {}
      <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md p-4">
        <img src={logo} alt="logo" className="w-30 h-8 mb-3" />
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white  shadow-lg w-full"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
          <h3 className="text-center mb-6 text-gray-600">Inscrivez-vous en tant que Admin</h3>
          <div className="mb-2">
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1 border rounded"
              required
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.join(' ')}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.join(' ')}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.join(' ')}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            {errors.password_confirmation && (
              <p className="text-red-600 text-sm mt-1">{errors.password_confirmation.join(' ')}</p>
            )}
          </div>
          <div className="mb-4">
            <input type="checkbox" className="mr-2 leading-tight" required />
            <span className="text-sm text-gray-700">Accepter les termes et la politique</span>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            S'inscrire
          </button>
        </form>
        <div className="mt-4 text-white">
          Vous avez déjà un compte? <a href='/login' className="text-yellow-300">Se connecter</a>
        </div>
      </div>
    </div>
  );
};

export default Register;

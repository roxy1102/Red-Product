import React, { useState } from "react";
import { forgotPassword } from "../services/authServices";
import axios from "axios";
import type { AxiosError } from "axios";
import logo from "../assets/logo.png";
import background1 from "../assets/background1.png";
import background2 from "../assets/background2.png";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      if (response && typeof response.message === "string") {
        setMessage(response.message);
      } else {
        setMessage("Lien envoyé (si cet email existe).");
      }
      setError("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        setError(axiosErr.response?.data?.message || "Une erreur est survenue.");
      } else {
        setError("Erreur inattendue.");
      }
      setMessage("");
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
          className="p-4 bg-white shadow-lg w-full"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Mot de passe oublié
          </h2>
          <h3 className="text-center mb-6 text-gray-600 text-sm sm:text-base">
            Entrez votre adresse e-mail ci-dessous et
            nous vous envoyons des instructions sur
             la façon de modifier votre mot de passe.
          </h3>

          {}
          {message && (
            <div className="p-2 mb-4 text-sm text-green-700 bg-green-100 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded">
              {error}
            </div>
          )}

          {/* Champ Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Votre-email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Envoyer le lien
          </button>
        </form>

        {/* Lien retour connexion */}
        <div className="mt-4 text-white">
        Revenir à la{" "}
          <a href="/login" className="text-yellow-300">
            connexion
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

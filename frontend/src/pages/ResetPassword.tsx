import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authServices";
import logo from "../assets/logo.png";
import background1 from "../assets/background1.png";
import background2 from "../assets/background2.png";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Token manquant.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      setError("Token manquant.");
      return;
    }
    try {
      const response = await resetPassword({ token, email, password, password_confirmation: passwordConfirmation }) as any;
      if (response && typeof response.message === "string") {
        setMessage(response.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Mot de passe réinitialisé avec succès.");
        setTimeout(() => navigate("/login"), 2000);
      }
      setError("");
    } catch (err: unknown) {
      console.error("Erreur:", err);
      setError("Erreur inattendue.");
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
      <div className="relative z-10 flex flex-col items-center">
        <img src={logo} alt="logo" className="w-30 h-8 mb-3" />

        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Réinitialiser le mot de passe
          </h2>

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
            <label className="block text-gray-700">Votre email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="mb-4">
            <label className="block text-gray-700">Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Champ Confirmation */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-blue-600 transition"
            disabled={!token}
          >
            Réinitialiser
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

export default ResetPassword;

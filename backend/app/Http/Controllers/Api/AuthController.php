<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class AuthController extends Controller
{
   public function register(Request $request)
   {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);
    $token = $user->createToken('auth_token')->plainTextToken;
    return response()->json(['message' => 'Inscription réussie', 'token' => $token]);
   }
   public function login(Request $request)
   {
    $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);
    $user = User::where('email', $request->email)->first();
    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['Les informations d\'identification sont incorrectes.'],
        ]);
    }
    $token = $user->createToken('auth_token')->plainTextToken;
    return response()->json(['message' => 'Connexion réussie', 'token' => $token]);
   }
   public function logout(Request $request)
   {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Déconnexion réussie']);
   }

   public function forgotPassword(Request $request)
   {
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    return $status === Password::RESET_LINK_SENT
        ? response()->json(['message' => 'Lien de réinitialisation envoyé'])
        : response()->json(['message' => 'Erreur lors de l\'envoi du lien'], 400);
   }

   public function showResetForm(Request $request, $token)
   {
       // Redirect to frontend reset password page with token
       return redirect('http://localhost:3000/reset-password?token=' . $token);
   }

   public function resetPassword(Request $request)
   {
       $request->validate([
           'token' => 'required',
           'email' => 'required|email',
           'password' => 'required|min:8|confirmed',
       ]);

       $status = Password::reset(
           $request->only('email', 'password', 'password_confirmation', 'token'),
           function ($user, $password) {
               $user->forceFill([
                   'password' => Hash::make($password)
               ])->save();
           }
       );

       return $status === Password::PASSWORD_RESET
           ? response()->json(['message' => 'Mot de passe réinitialisé avec succès'])
           : response()->json(['message' => 'Échec de la réinitialisation du mot de passe'], 400);
   }
}

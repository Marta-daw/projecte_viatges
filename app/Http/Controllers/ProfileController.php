<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

use Illuminate\Support\Facades\Storage;

use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $data = $request->validated();

        // Eliminar avatar si es demana
        if (!empty($data['remove_avatar'])) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $data['avatar'] = null;
            $data['avatar_url'] = null;
        }

        // Pujar nou avatar
        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar); // elimina l'anterior
            }
            $path = $request->file('avatar')->store('avatars', 'public');
            $data['avatar'] = $path;
            $data['avatar_url'] = '/storage/' . $path;
        }

        $user->fill([
            'name'       => $data['name'] ?? $user->name,
            'email'      => $data['email'] ?? $user->email,
            'bio'        => $data['bio'] ?? $user->bio,
            'avatar_url' => array_key_exists('avatar_url', $data) ? $data['avatar_url'] : $user->avatar_url,
            'avatar'     => array_key_exists('avatar', $data) ? $data['avatar'] : $user->avatar,
        ]);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        
        $user->save();

        return back()->with('success', 'Perfil actualitzat correctament.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

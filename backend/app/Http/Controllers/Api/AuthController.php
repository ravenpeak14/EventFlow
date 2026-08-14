<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Default role: attendee (organizer/admin/staff di-assign manual atau flow terpisah)
        $user->assignRole('attendee');

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user->only('id', 'name', 'email'),
            'role' => $user->getRoleNames()->first(),
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user->only('id', 'name', 'email'),
            'role' => $user->getRoleNames()->first(),
            'token' => $token,
        ]);
    }

    public function logout()
    {
        request()->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }

    public function me()
    {
        $user = request()->user();

        return response()->json([
            'user' => $user->only('id', 'name', 'email'),
            'role' => $user->getRoleNames()->first(),
        ]);
    }
}
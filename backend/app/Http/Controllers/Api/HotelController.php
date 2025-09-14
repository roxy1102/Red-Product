<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class HotelController extends Controller
{
    use AuthorizesRequests;
    
    /**
     * Affiche la liste de tous les hôtels.
     */
    public function index()
    {
        $hotels = Hotel::with('user')->get();
        return response()->json($hotels);
    }

    /**
     * Affiche un hôtel spécifique.
     */
    public function show(Hotel $hotel)
    {
        return response()->json($hotel);
    }

    /**
     * Ajoute un nouvel hôtel.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $hotelData = $request->except('image');

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('hotels', 'public');
            $hotelData['image_url'] = url('storage/' . $imagePath);
        } else {
            $hotelData['image_url'] = null;
        }

        $hotelData['user_id'] = $request->user()->id;

        $hotel = Hotel::create($hotelData);

        return response()->json($hotel, 201);
    }

    /**
     * Met à jour un hôtel existant.
     */
    public function update(Request $request, Hotel $hotel)
    {
        $this->authorize('update', $hotel);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'address' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $hotelData = $request->except('image');

        if ($request->hasFile('image')) {
            if ($hotel->image_url) {
                Storage::disk('public')->delete(str_replace(url('storage/'), '', $hotel->image_url));
            }
            $imagePath = $request->file('image')->store('hotels', 'public');
            $hotelData['image_url'] = url('storage/' . $imagePath);
        }

        $hotel->update($hotelData);

        return response()->json($hotel);
    }

    /**
     * Affiche les hôtels de l'utilisateur connecté.
     */
    public function userHotels(Request $request)
    {
        $hotels = $request->user()->hotels;
        return response()->json($hotels);
    }

    /**
     * Supprime un hôtel.
     */
    public function destroy(Hotel $hotel)
    {
        $this->authorize('delete', $hotel);

        if ($hotel->image_url) {
            Storage::disk('public')->delete(str_replace(url('storage/'), '', $hotel->image_url));
        }

        $hotel->delete();

        return response()->json(null, 204);
    }
}
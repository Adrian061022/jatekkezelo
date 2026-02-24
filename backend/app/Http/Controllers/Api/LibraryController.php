<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameResource;
use App\Models\Game;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    /**
     * Get user's game library
     */
    public function index(Request $request)
    {
        $games = $request->user()->games()->with('category')->get();

        return GameResource::collection($games);
    }

    /**
     * Purchase a game (add to library)
     */
    public function purchase(Request $request, Game $game)
    {
        $user = $request->user();

        // Check if already owns the game
        if ($user->ownsGame($game->id)) {
            return response()->json([
                'message' => 'You already own this game'
            ], 400);
        }

        // Add game to user's library
        $user->games()->attach($game->id, [
            'purchased_at' => now()
        ]);

        return response()->json([
            'message' => 'Game purchased successfully',
            'data' => new GameResource($game->load('category'))
        ], 201);
    }

    /**
     * Check if user owns a game
     */
    public function checkOwnership(Request $request, Game $game)
    {
        $owns = $request->user()->ownsGame($game->id);

        return response()->json([
            'owns' => $owns
        ]);
    }
}

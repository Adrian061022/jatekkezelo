<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'balance' => 1000.00,
        ]);

        // Create regular test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
            'role' => 'user',
            'balance' => 500.00,
        ]);

        // Create categories
        $categories = \App\Models\Category::factory(5)->create();

        // Create 10 games with existing categories
        foreach ($categories as $category) {
            \App\Models\Game::factory(2)->create([
                'category_id' => $category->id,
            ]);
        }
    }
}

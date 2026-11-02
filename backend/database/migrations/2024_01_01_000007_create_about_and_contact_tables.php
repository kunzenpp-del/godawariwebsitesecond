<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_us', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique(); // hero, mission, vision, team, etc.
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->string('image')->nullable();
            $table->json('metadata')->nullable(); // Additional data like stats, features
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('contact_info', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // phone, email, address, social, working_hours
            $table->string('label')->nullable();
            $table->text('value');
            $table->string('icon')->nullable();
            $table->string('link')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('product');
            $table->decimal('width', 10, 2)->nullable();
            $table->decimal('height', 10, 2)->nullable();
            $table->decimal('length', 10, 2)->nullable();
            $table->string('unit')->default('inches');
            $table->integer('quantity');
            $table->integer('quantity_2')->nullable();
            $table->integer('quantity_3')->nullable();
            $table->string('design_file')->nullable();
            $table->text('comments')->nullable();
            $table->enum('status', ['pending', 'processing', 'completed', 'cancelled'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->decimal('quoted_price', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quote_requests');
        Schema::dropIfExists('contact_info');
        Schema::dropIfExists('about_us');
    }
};

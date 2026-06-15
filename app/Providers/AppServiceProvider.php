<?php

namespace App\Providers;

use App\Interface\CartInterface;
use App\Interface\OrderInterface;
use App\Interface\Repositories\CartRepositoryInterface;
use App\Interface\StripeWebhookInterface;
use App\Repositories\CartRepository;
use App\Services\CartService;
use App\Services\OrderService;
use App\Services\StripeWebhookService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

use Barryvdh\Debugbar\ServiceProvider as DebugbarServiceProvider;
use Laravel\Telescope\TelescopeServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if (config('app.env') === 'local') {
        $this->app->register(DebugbarServiceProvider::class);
        $this->app->register(TelescopeServiceProvider::class);
    }

        $this->app->singleton(CartInterface::class, function ($app) {
            return new CartService($app->make(CartRepositoryInterface::class));
        });

        $this->app->bind(CartRepositoryInterface::class, CartRepository::class);

        $this->app->bind(OrderInterface::class, OrderService::class);

        $this->app->bind(StripeWebhookInterface::class, StripeWebhookService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}

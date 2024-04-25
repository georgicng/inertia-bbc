<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Services\ContentService;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $service = new ContentService();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'layout' => [
                'brand' => 'ButterBakes Cakes',
                'logos' => [
                    'header' => [
                        'image' => '/images/logo.png',
                        'height' => '100'
                    ],
                    'footer' => [
                        'image' => '/images/logo.png',
                        'height' => '100'
                    ],
                    'sidenav' => [
                        'image' => '/images/logo_icon.png',
                        'height' => '100'
                    ]
                ],
                'menu' => [
                    'main' => $service->getMenu('main'),
                    'social' => $service->getMenu('social'),
                    'contact' => $service->getMenu('contact'),
                ],
            ],
            'cart' => \Lunar\Facades\CartSession::current() ?? ["lines" => [], "subtotal" => 0, "total" => 0, "discountTotal" => 0]
        ];
    }
}

<?php

use App\Http\Controllers\ProfileController;
use App\Services\ContentService;
use App\Services\ProductService;
use App\Services\OrderService;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

Route::get('/', function () {
    $service = new ContentService();
    return Inertia::render('Home', [
        'page' => $service->getHome(),
    ]);
});
Route::get('/about', function () {
    $service = new ContentService();
    return Inertia::render('About', [
        'page' => $service->getAbout(),
    ]);
});
Route::get('/faq', function () {
    $service = new ContentService();
    return Inertia::render('FAQ', [
        'page' => $service->getFaq(),
    ]);
});
Route::get('/terms', function () {
    $service = new ContentService();
    return Inertia::render('Term', [
        'page' => $service->getTerms(),
    ]);
});
Route::get('/contact', function () {
    $service = new ContentService();
    return Inertia::render('Contact', [
        'page' => $service->getContact(),
    ]);
});
Route::get('/support', function () {
    $service = new ContentService();
    return Inertia::render('Support', [
        'page' => $service->getSupport(),
    ]);
});
Route::get('/categories', function () {
    $service = new ProductService();
    return Inertia::render('Category', [
        'categories' => CategoryResource::collection($service->getCategories()),
    ]);
});
Route::get('/products', function () {
    $service = new ProductService();
    return Inertia::render('Products', [
        'products' => ProductResource::collection($service->getProducts(request()->query('category', null))),
    ]);
});
Route::get('/products/:id', function ($id) {
    $service = new ProductService();
    return Inertia::render('Product', [
        'product' => $service->getProduct($id),
    ]);
});
Route::get('/cart', function () {
    $service = new OrderService();
    return Inertia::render('Cart', [
        'cart' => $service->getCart(),
    ]);
});
Route::get('/checkout', function () {
    $service = new OrderService();
    return Inertia::render('Checkout', [
        'cart' => $service->getCart(),
    ]);
});
Route::inertia('/success', 'Success');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

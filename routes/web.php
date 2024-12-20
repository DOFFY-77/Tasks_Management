<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    DashboardController,
    TaskController,
    UserController,
    ProfileController,
    ProjectController
    };

Route::redirect('/', '/dashboard');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('project', ProjectController::class);
    Route::get('task/my-tasks', [TaskController::class, 'myTasks'])->name('task.myTasks');
    Route::resource('task', TaskController::class);
    Route::resource('user', UserController::class);

});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

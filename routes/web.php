<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/signin', function () {
    return view('signin');
})->name('signin');

Route::get('/signup', function () {
    return view('signup');
})->name('signup');

Route::get('/dashboard', function () {
    return view('components.dashboard');
})->name('dashboard');

Route::get('/test', function () {
    return view('components.test');
})->name('test');
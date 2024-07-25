<?php

use App\Controllers\IndexController;
use App\Filters\IsAjaxFilter;
use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', [IndexController::class, 'index']);

$routes->group('/api/v1', function($routes) {
    $routes->resource('comments', [
        'controller' => 'ApiController',
        'only' => ['index', 'create', 'delete'],
        'filter' => IsAjaxFilter::class
    ]);
});
<?php

namespace App\Controllers;

use App\Models\CommentModel;
use Config\Services;

class IndexController extends BaseController
{
    public function __construct()
    {
        $this->pager = Services::pager();
    }

    public function index(): string
    {
        $comments =  new CommentModel();
        $orderBy = $this->request->getGet('order_by') ?? 'id';
        $order = $this->request->getGet('order') ?? 'desc';

        $comments = $comments->orderBy($orderBy, $order)->paginate(3);

        return view('pages/home/index', [
            'title' => 'Страница комментариев',
            'comments' => $comments,
            'pager' => $this->pager,
            'orderBy' => $orderBy,
            'order' => $order
        ]);
    }
}
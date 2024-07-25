<?php

namespace App\Controllers;

use App\Models\CommentModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;

class ApiController extends BaseController
{
    use ResponseTrait;

    public function __construct()
    {
        $this->validation = Services::validation();
        $this->pager = Services::pager()->setPath('/');
    }

    public function index(): ResponseInterface
    {
        $comment = new CommentModel();

        $orderBy = $this->request->getGet('order_by') ?? 'id';
        $order = $this->request->getGet('order') ?? 'desc';
        $page = $this->request->getGet('page') ?? 1;

        $comments = $comment->orderBy($orderBy, $order)->paginate(3, 'default', $page);

        return $this->respond([
            'comments' => $comments,
            'nav' => $this->pager->links('default', 'custom'),
        ]);
    }

    public function create(): ResponseInterface
    {
        $this->validation->setRule('name', 'email', 'required|valid_email');
        $this->validation->setRule('text', 'комментарий', 'required');
        $this->validation->setRule('date', 'дата', 'required');

        if (!$this->validate($this->validation->getRules())) {
            return $this->failValidationErrors($this->validation->getErrors());
        }

        $comment = new CommentModel();

        if ($comment->save($this->validation->getValidated())) {
            return $this->respondCreated(['message' => 'комментарий добавлен']);
        } else {
            return $this->fail('Комментарий не добавлен, повторите попытку позже', 400);
        }
    }

    public function delete($id = null): ResponseInterface
    {
        $comment = new CommentModel();

        try {
            $comment->delete($id);
            return $this->respondDeleted(['message' => 'комментарий удален']);
        } catch (\Exception $e) {
            return $this->fail('Ошибка удаления, повторите попытку позже', 400);
        }
    }
}
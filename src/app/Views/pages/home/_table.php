<div id="data-table" class="table-responsive">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>
                    <a
                        class="d-flex text-decoration-none"
                        href="/?order_by=id&order=<?= $order === 'asc' ? 'desc' : 'asc' ?>&page=<?= $pager->getCurrentPage() ?>"
                    >
                        id
                        <?php if ($orderBy !== 'id') : ?>
                            <span class="material-symbols-outlined">expand_all</span>
                        <?php else: ?>
                            <span class="material-symbols-outlined">
                                <?= $order === 'asc' ? 'stat_1' : 'stat_minus_1' ?>
                            </span>
                        <?php endif ?>
                    </a>
                </th>
                <th>Автор</th>
                <th>Комментарий</th>
                <th>
                    <a
                        class="d-flex text-decoration-none"
                        href="/?order_by=date&order=<?= $order === 'asc' ? 'desc' : 'asc' ?>&page=<?= $pager->getCurrentPage() ?>"
                    >
                        Дата добавления

                        <?php if ($orderBy !== 'date') : ?>
                            <span class="material-symbols-outlined">expand_all</span>
                        <?php else: ?>
                            <span class="material-symbols-outlined">
                                <?= $order === 'asc' ? 'stat_1' : 'stat_minus_1' ?>
                            </span>
                        <?php endif ?>
                    </a>
                </th>
                <th>Действия</th>
            </tr>
        </thead>
        <tbody>
        <?php foreach ($comments as $comment) : ?>
            <tr>
                <td><?= $comment->id ?></td>
                <td><?= $comment->name ?></td>
                <td><?= $comment->text ?></td>
                <td><?= $comment->date ?></td>
                <td>
                    <button data-delete="<?= $comment->id ?>" class="btn btn-danger btn-sm">Удалить</button>
                </td>
            </tr>
        <?php endforeach ?>
        </tbody>
    </table>
</div>

<div id="nav-table">
    <?= $pager->links('default', 'custom') ?>
</div>
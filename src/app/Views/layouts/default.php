<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= esc($title) ?></title>
    <link rel="stylesheet" href="/styles/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <link rel="stylesheet" href="/styles/app.css">

</head>
<body>
<?= $this->include('blocks/header') ?>
<div class="container">
    <?= $this->include('blocks/alerts') ?>
    <?php $this->renderSection('content'); ?>
</div>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="/scripts/bootstrap.bundle.min.js"></script>
<script src="/scripts/app.js"></script>
</body>
</html>
<?= $this->extend('layouts/default') ?>

<?= $this->section('content') ?>

<h2 class="mb-4"><?= esc($title) ?></h2>

<?= $this->include('pages/home/_table') ?>

<hr />

<?= $this->include('pages/home/_form') ?>

<?= $this->endSection() ?>

<div class="row">
    <div class="col-md-4">
        <form id="send_comment" method="post">
            <div class="form-group">
                <label for="name" class="control-label">Email</label>
                <input type="email" name="name" id="name" class="form-control">
                <small class="invalid-feedback"></small>
            </div>

            <div class="form-group">
                <label for="text" class="control-label">Комментарий</label>
                <textarea name="text" id="text" rows="3" class="form-control"></textarea>
            </div>

            <div class="form-group">
                <label for="date" class="control-label">Дата комментария</label>
                <input type="date" name="date" id="date" class="form-control" value="<?= date("Y-m-d") ?>">
            </div>

            <button id="send-button" type="submit" class="btn btn-primary">Отправить</button>
        </form>
    </div>
</div>
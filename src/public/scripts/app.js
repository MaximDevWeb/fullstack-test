'use strict';

const useAlert = () => {
  const list = $(".alerts__list");

  const create = (type, message) => {
    const alert = $('<div class="alert alert-dismissible"></div>');
    alert.attr("role", "alert");
    alert.addClass(`alert-${type}`);
    alert.prepend(
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
    );
    alert.prepend(message);

    list.append(alert);
  };

  return { create };
};

const useApi = () => {
  const baseUrl = "http://localhost:88/api/v1";

  const post = (url, data) => {
    return $.ajax({
      url: baseUrl + url,
      method: "POST",
      data: data,
      error: errorHandler,
    });
  };

  const get = (url) => {
    return $.ajax({
      url: baseUrl + url,
      method: "GET",
      error: errorHandler,
    });
  };

  const remove = (url) => {
    return $.ajax({
      url: baseUrl + url,
      method: "DELETE",
      error: errorHandler,
    });
  };

  const errorHandler = (error) => {
    const { create } = useAlert();

    if (error.status && error.status === 400) {
      const errors = Object.values(error.responseJSON.messages);

      create("danger", errors.join("</br>"));
    }
  };

  return { post, get, remove };
};

const useLoad = () => {
  const { get } = useApi();

  const load = () => {
    const url = new URL(location.href);

    get("/comments" + url.search).done((res) => {
      render(res.comments, res.nav);
    });
  };

  const render = (comments, list) => {
    const body = $("#data-table").find("tbody");
    const nav = $("#nav-table");

    body.html("");

    comments.forEach((comment) => {
      const row = $("<tr></tr>");
      row.append(`<td>${comment.id}</td>`);
      row.append(`<td>${comment.name}</td>`);
      row.append(`<td>${comment.text}</td>`);
      row.append(`<td>${comment.date}</td>`);
      row.append(
        `<td><button data-delete="${comment.id}" class="btn btn-danger btn-sm">Удалить</button></td>`,
      );

      body.append(row);
      nav.html(list);
    });
  };

  return {
    load,
  };
};

const useValidate = () => {
  const emailValidate = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const showError = (input) => {
    input.addClass("is-invalid");
    input.next("small").text("Неверный формат email");
  };

  const hideError = (input) => {
    input.removeClass("is-invalid");
    input.next("small").text("");
  };

  return { emailValidate, showError, hideError };
};

const useForm = () => {
  let form;
  let button;
  let emailInput;

  const formInit = (formElement) => {
    form = formElement;
    button = formElement.find("#send-button");

    emailInput = $('[name="name"]');
    emailInput.on("input", function () {
      const { hideError } = useValidate();
      hideError(emailInput);
    });
  };

  const formSubmit = () => {
    const { emailValidate, showError } = useValidate();

    if (emailValidate(emailInput.val())) {
      sendComment();
    } else {
      showError(emailInput);
    }
  };

  const sendComment = () => {
    const { post } = useApi();
    const { create } = useAlert();
    const { load } = useLoad();

    button.attr("disabled", true);

    post("/comments", form.serialize())
      .done(() => {
        create("success", "Комментарий добавлен");
        load();
        form.trigger("reset");
      })
      .always(() => {
        button.attr("disabled", false);
      });
  };

  return { formInit, formSubmit };
};

const useDestroy = () => {
  const destroyInit = () => {
    $("#data-table").on("click", "[data-delete]", (event) => {
      confirm("Подтвердите удаление элемента");

      const id = $(event.target).data("delete");
      destroy(id);
    });
  };

  const destroy = (id) => {
    const { remove } = useApi();
    const { load } = useLoad();
    const { create } = useAlert();

    remove("/comments/" + id).done(() => {
      create("success", "Элемент удален");
      load();
    });
  };

  return { destroyInit };
};

$(document).ready(function () {
  $("#send_comment").submit(function (event) {
    event.preventDefault();

    const { formInit, formSubmit } = useForm();

    formInit($(this));
    formSubmit();
  });

  const { destroyInit } = useDestroy();
  destroyInit();
});

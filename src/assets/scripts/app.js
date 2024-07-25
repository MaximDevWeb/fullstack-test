import useForm from "./form";
import useDestroy from "./destroy";

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

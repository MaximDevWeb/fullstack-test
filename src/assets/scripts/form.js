import useApi from "./api";
import useAlert from "./alert";
import useLoad from "./load";
import useValidate from "./validate";

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
      sendComment(form);
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

export default useForm;

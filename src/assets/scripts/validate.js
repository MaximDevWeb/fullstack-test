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

export default useValidate;

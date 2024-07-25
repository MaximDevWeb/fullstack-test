import useAlert from "./alert";

const useApi = () => {
  const baseUrl = "http://localhost:88/api/v1";
  const headers = { "X-Requested-With": "XMLHttpRequest" };

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

export default useApi;

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

export default useAlert;

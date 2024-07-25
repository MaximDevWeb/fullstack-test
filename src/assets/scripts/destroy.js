import useApi from "./api";
import useLoad from "./load";
import useAlert from "./alert";

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

export default useDestroy;

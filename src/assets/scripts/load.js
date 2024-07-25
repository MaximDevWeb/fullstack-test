import useApi from "./api";

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

export default useLoad;

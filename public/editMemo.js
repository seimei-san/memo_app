const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const memoIDDOM = document.querySelector(".memo-edit-id");
const memoTitleDOM = document.querySelector(".memo-edit-title");
const memoMemoDOM = document.querySelector(".memo-edit-memo");
const editFormDOM = document.querySelector(".single-memo-form");
const formAlertDOM = document.querySelector(".form-alert");
const memoCompletedDOM = document.querySelector(".memo-edit-completed");


const showmemo = async () => {
  try {
    const { data: data } = await axios.get(`/api/v1/memos/${id}`);
    const { _id, completed, title, memo } = data;
    memoIDDOM.textContent = _id;
    memoTitleDOM.value = title;
    memoMemoDOM.value = memo;
    if (completed) {
      memoCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};

showmemo();


editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const memoTitle = memoTitleDOM.value;
    const memoMemo = memoMemoDOM.value;
    memoCompleted = memoCompletedDOM.checked;
    const { data: memo } = await axios.patch(`/api/v1/memos/${id}`, {
      title: memoTitle,
      memo: memoMemo,
      completed: memoCompleted,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "Updated";
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.log(error);
  };
  setTimeout( () => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
})
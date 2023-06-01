console.log(axios);

const memosDOM = document.querySelector('.memos');
const formDOM = document.querySelector('.memo-form');
const titleInputDOM = document.querySelector('#title-input');
const memoInputDOM = document.querySelector('#memo-input');
const formAlertDOM = document.querySelector(".form-alert");
 
// const app = Vue.createApp({
//   data: () => ({
//     v_title: "",
//     v_memo: "",
//     v_alert: false,
//     v_no_memos: false,
//     v_memos: [],
//     v_memo_completed: false,
//     v_id: "",
//     v_memos_if: false
//   }),
//   methods: {
//     async v_showMemos () {
//       try {
//         const { data: v_memos } = await axios.get("/api/v1/memos")
//         if (v_memos.length < 1) {
//           this.v_no_memos = true
//           return
//         }
//         this.v_memos_if = true 
//       }

//     },
//   }

// })
// app.mount("#appMain")




const showMemos = async () => {
  try {
    const { data: memos }= await axios.get("/api/v1/memos");
    if (memos.length < 1) {
      memosDOM.innerHTML = `<h5 class="empty-list">メモは、ありません。</h5>`;
      return
    }
    const allMemos = memos.map((data) => {
      const { completed, _id, title, memo } = data;
      return `<div class="single-memo ${ completed && "memo-completed"}">
      <h5>
        <span><i class="far fa-check-circle"></i></span>${ title }
      </h5>
      <div class="memo-links">
        <a href="edit.html?id=${_id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        <button type="button" class="delete-btn" data-id="${_id}">
        <i class="fas fa-trash"></i>
        </button>
        </div>
    </div>`;
    })
    .join("");
    memosDOM.innerHTML = allMemos;
  } catch (error) {
    console.log(error);
  }
};

showMemos();

formDOM.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = titleInputDOM.value;
  const memo = memoInputDOM.value;

  try {
    await axios.post("/api/v1/memos", { title: title, memo: memo })
    showMemos();
    titleInputDOM.value = "";
    memoInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "メモが追加されました！";
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.log(error);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "入力し直してください！"
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

memosDOM.addEventListener('click', async (event) => {
  const element = event.target;
  if (element.parentElement.classList.contains('delete-btn')) {
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/memos/${id}`);
      showMemos();
    } catch (error) {
      console.log(error);
    }
  }
});





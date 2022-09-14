const btnOpenModal = document.getElementById("openModal");
const modal = document.querySelector(".note__modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.getElementById("btnCloseModal");
export default function Modal() {
  btnOpenModal.addEventListener("click", openModal);
  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

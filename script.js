const progress = document.querySelector("[data-progress]");
const notesToggle = document.querySelector("[data-notes-toggle]");
const scrollySections = document.querySelectorAll(".hero, .section");

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  },
);

scrollySections.forEach((section) => observer.observe(section));

notesToggle.addEventListener("click", () => {
  document.body.classList.toggle("show-notes");
  notesToggle.textContent = document.body.classList.contains("show-notes") ? "Hide notes" : "Notes";
});

document.querySelectorAll("[data-poll]").forEach((poll) => {
  const answer = poll.parentElement.querySelector("[data-answer]");
  const choices = [...poll.querySelectorAll(".choice")];

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      choices.forEach((item) => {
        item.classList.remove("selected");
        item.classList.add("revealed");
      });
      choice.classList.add("selected");
      answer.classList.add("visible");
    });
  });
});

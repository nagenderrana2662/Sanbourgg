const categoryFilters = document.querySelectorAll("#categoryFilters .chip");
const tagFilters = document.querySelectorAll("#tagFilters .chip");
const cards = document.querySelectorAll(".menu-card");
const searchInput = document.getElementById("menuSearch");
const emptyState = document.getElementById("emptyState");

let activeCategory = "all";
let activeTag = "all";

function applyMenuFilters() {
  const term = searchInput.value.trim().toLowerCase();
  let shown = 0;

  cards.forEach((card) => {
    const category = card.dataset.category;
    const tags = (card.dataset.tags || "").split(" ").filter(Boolean);
    const text = card.textContent.toLowerCase();

    const categoryMatch = activeCategory === "all" || category === activeCategory;
    const tagMatch = activeTag === "all" || tags.includes(activeTag);
    const searchMatch = term.length === 0 || text.includes(term);

    const visible = categoryMatch && tagMatch && searchMatch;
    card.hidden = !visible;
    if (visible) shown += 1;
  });

  emptyState.hidden = shown !== 0;
}

categoryFilters.forEach((chip) => {
  chip.addEventListener("click", () => {
    categoryFilters.forEach((btn) => btn.classList.remove("active"));
    chip.classList.add("active");
    activeCategory = chip.dataset.filter;
    applyMenuFilters();
  });
});

tagFilters.forEach((chip) => {
  chip.addEventListener("click", () => {
    tagFilters.forEach((btn) => btn.classList.remove("active"));
    chip.classList.add("active");
    activeTag = chip.dataset.tag;
    applyMenuFilters();
  });
});

searchInput.addEventListener("input", applyMenuFilters);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll("section, .menu-card").forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});

document.getElementById("year").textContent = new Date().getFullYear();
applyMenuFilters();

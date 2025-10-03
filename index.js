const habitInput = document.querySelector("#habitBox");
const addHabitBtn = document.querySelector("#addBtn");
const habitsList = document.querySelector("#habits-list");

let habits = [];

// load habits on page load
window.addEventListener('DOMContentLoaded', () => {
  const storedHabits = localStorage.getItem('habits');
  habits = storedHabits ? JSON.parse(storedHabits) : [];
  renderHabits();
});

addHabitBtn.addEventListener("click", addHabit);

habitInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    addHabit();
  }
});

function addHabit() {
  const name = habitInput.value.trim();

  if(!name) {
    alert("Please enter a habit before adding!");
    return;
  }

  const newHabit = {
    id: Date.now(),
    name: name,
    isDone: false
  };

  habits.push(newHabit);

  localStorage.setItem('habits', JSON.stringify(habits));

  habitInput.value = '';

  renderHabits();
}

function renderHabits() {
  if(habits.length === 0) {
    habitsList.innerHTML = `
      <div class="empty-state">
        <h3>No habits added yet.</h3>
        <p>Add your first habit above to start tracking!</p>
      </div>`
  } else {
      habitsList.innerHTML = habits.map(habit => {
      const statusClass = habit.isDone ? 'completed' : '';

    return `
      <div class="habits-info ${statusClass}" data-id="${habit.id}">
        <h3>${habit.name}</h3>
        <div class="functionBtn">
          <div class="done">Done</div>
          <div class="delete">Delete</div>
        </div>
      </div>
      `;
    }).join('');
  }
}


habitsList.addEventListener('click', (e) => {
    // find the parent habit div
    const habitDiv = e.target.closest(".habits-info");
    if(!habitDiv) return;
    const id = Number(habitDiv.dataset.id);

    // delete clicked
    if(e.target.classList.contains('delete')) {
        habits = habits.filter(h => h.id !== id);
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    }

    // done clicked
    if(e.target.classList.contains('done')) {
        const habit = habits.find(h => h.id === id);
        if(habit) {
          habit.isDone = !habit.isDone;
        }
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    }
})

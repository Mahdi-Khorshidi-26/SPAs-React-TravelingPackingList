import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passport", quantity: 2, packed: false },
  { id: 2, description: "Pair of Sucks", quantity: 2, packed: false },
  { id: 3, description: "Phone", quantity: 11, packed: false },
  { id: 4, description: "Suitcase", quantity: 22, packed: false },
];

export default function App() {
  const [item, setItem] = useState([]);

  function handleItemsAdd(item) {
    setItem((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckedItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearing() {
    let confirmed = window.confirm(
      "Are You Sure , You Want To Clear The List ?"
    );
    if (confirmed) setItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleItemsAdd={handleItemsAdd} />
      <PackingList
        item={item}
        handleDeleteItem={handleDeleteItem}
        handleCheckedItem={handleCheckedItem}
        handleClearing={handleClearing}
      />
      <Stats item={item} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ FAR AWAY 🧳</h1>;
}

function Form({ handleItemsAdd }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleItem(e) {
    e.preventDefault();
    if (!description) return;
    let newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    handleItemsAdd(newItem);
  }

  return (
    <form className="add-form" onSubmit={(e) => handleItem(e)}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({
  item,
  handleDeleteItem,
  handleCheckedItem,
  handleClearing,
}) {
  const [sortBy, setSortedBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = item;
  if (sortBy === "description")
    sortedItems = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = item
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            handleDeleteItem={handleDeleteItem}
            handleCheckedItem={handleCheckedItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortedBy(e.target.value)}>
          <option value={`input`}>sort by input</option>
          <option value={`description`}>sort by description</option>
          <option value={`packed`}>sort by packed</option>
        </select>
        <button onClick={() => handleClearing()}>clear list</button>
      </div>
    </div>
  );
}

function Item({ item, handleDeleteItem, handleCheckedItem }) {
  const btnStyle = { color: "Crimson", fontSize: "40px" };
  return (
    <li>
      <input
        type="checkbox"
        value={item.id}
        onChange={() => {
          handleCheckedItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}&nbsp;
        {item.description}
      </span>
      <button style={btnStyle} onClick={() => handleDeleteItem(item.id)}>
        &times;
      </button>
    </li>
  );
}

function Stats({ item }) {
  let allItemCount = item.length;
  let allPackedItemCount = item.filter((item) => item.packed).length;
  let percentage = Math.round((allPackedItemCount / allItemCount) * 100) || 0;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "🏝️ You've got everything! ready to go 🧳 😍"
          : `
        💼 You have ${item.length} items on your list, and you already packed ${allPackedItemCount} (${percentage}%)
        `}
      </em>
    </footer>
  );
}

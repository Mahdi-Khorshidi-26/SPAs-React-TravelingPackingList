import { useState } from "react";
import  Logo from "./Logo";
import  Form  from "./Form";
import  PackingList  from "./PackingList";
import  Stats  from "./Stats";


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

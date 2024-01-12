import { useState } from "react";
import  Item  from "./Item";

export  default function PackingList({
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

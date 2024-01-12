export default function Item({ item, handleDeleteItem, handleCheckedItem }) {
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

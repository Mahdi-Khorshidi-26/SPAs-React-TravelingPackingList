export default function Stats({ item }) {
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

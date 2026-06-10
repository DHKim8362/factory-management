import { useState } from "react";

import ItemPage from "./pages/ItemPage";
import InventoryPage from "./pages/InventoryPage";

function App() {

  const [page, setPage] = useState("item");

  return (
    <div style={{ padding: "20px" }}>

      <h1>생산관리 시스템</h1>

      <button onClick={() => setPage("item")}>
        품목관리
      </button>

      <button onClick={() => setPage("inventory")}>
        재고관리
      </button>

      <hr />

      {page === "item" && <ItemPage />}

      {page === "inventory" && <InventoryPage />}

    </div>
  );
}

export default App;
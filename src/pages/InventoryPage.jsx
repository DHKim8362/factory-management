import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
    
    function InventoryPage() {
    
      const [inventory, setInventory] = useState([]);
      
      const [items, setItems] = useState([]);

      const [itemId, setItemId] = useState("");
      const [location, setLocation] = useState("");
      const [stockQty, setStockQty] = useState("");
      const [memo, setMemo] = useState("");
    
      const [editId, setEditId] = useState(null);

      const [searchText, setSearchText] = useState("");

      useEffect(() => {
        loadInventory();
        loadItems();
      }, []);
    
      async function loadInventory() {
    
        const { data, error } = await supabase
            .from("inventory")
            .select(`
            *,
            items (
                item_name,
                item_code,
                drawing_no
            )
            `)
    
        if (error) {
          console.error(error);
          return;
        }
        
        setInventory(data);
      }
    
      async function loadItems() {

        const { data, error } = await supabase
          .from("items")
          .select("*")
          .order("item_name");
      
        if (error) {
          console.error(error);
          return;
        }
      
        setItems(data);
      }
      
      const filteredInventory = inventory.filter((row) => {

        const keyword = searchText.toLowerCase();
      
        return (
          row.items?.item_code?.toLowerCase().includes(keyword) ||
          row.items?.item_name?.toLowerCase().includes(keyword) ||
          row.items?.drawing_no?.toLowerCase().includes(keyword) ||
          row.location?.toLowerCase().includes(keyword)
        );
      
      });

      async function addInventory() {

        const { error } = await supabase
          .from("inventory")
          .insert([
            {
              item_id: itemId,
              location: location,
              stock_qty: stockQty,
              memo: memo
            }
          ]);
      
        if (error) {
          console.error(error);
          alert("등록 실패");
          return;
        }
      
        loadInventory();
      
        setItemId("");
        setLocation("");
        setStockQty("");
        setMemo("");
      
        alert("등록 완료");
      }

      function editInventory(row) {

        setEditId(row.id);
      
        setItemId(row.item_id);
        setLocation(row.location);
        setStockQty(row.stock_qty);
        setMemo(row.memo || "");
      }

      async function updateInventory() {

        const { error } = await supabase
          .from("inventory")
          .update({
            item_id: Number(itemId),
            location: location,
            stock_qty: Number(stockQty),
            memo: memo
          })
          .eq("id", editId);
      
        if (error) {
          console.error(error);
          alert("수정 실패");
          return;
        }
      
        loadInventory();
      
        setEditId(null);
      
        setItemId("");
        setLocation("");
        setStockQty("");
        setMemo("");
      
        alert("수정 완료");
      }

      async function deleteInventory(id) {

        const confirmed = window.confirm(
          "정말 삭제하시겠습니까?"
        );
      
        if (!confirmed) return;
      
        const { error } = await supabase
          .from("inventory")
          .delete()
          .eq("id", id);
      
        if (error) {
          console.error(error);
          alert("삭제 실패");
          return;
        }
      
        loadInventory();
      }

      return (
        <div>
    
          <h2>재고관리</h2>
    
          <hr />

            <h3>재고 등록</h3>

            

            <div>

            <select
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
            >

                <option value="">
                품목 선택
                </option>

                {items.map((item) => (
                <option
                    key={item.id}
                    value={item.id}
                >
                    {item.item_code} / {item.item_name}
                </option>
                ))}

            </select>

            <input
                placeholder="위치"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input
                placeholder="수량"
                value={stockQty}
                onChange={(e) => setStockQty(e.target.value)}
            />

            <input
                placeholder="비고"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
            />

        {editId ? (
            <button onClick={updateInventory}>
                수정 저장
            </button>
            ) : (
            <button onClick={addInventory}>
                재고 등록
            </button>
        )}

            </div>

            <hr />
                <h3>재고 검색</h3>
                <input
                type="text"
                placeholder="품목코드, 품목명, 도면번호, 위치"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                />
            <hr />


          <table border="1">
    
        <thead>
            <tr>
                <th>ID</th>
                <th>품목코드</th>
                <th>품목명</th>
                <th>도면번호</th>
                <th>위치</th>
                <th>수량</th>
                <th>비고</th>
                <th>관리</th>
            </tr>
        </thead>
    
            <tbody>
            {filteredInventory.map((row) => (
                <tr key={row.id}>
                <td>{row.id}</td>

                <td>{row.items?.item_code}</td>
                <td>{row.items?.item_name}</td>
                <td>{row.items?.drawing_no}</td>

                <td>{row.location}</td>
                <td>{row.stock_qty}</td>
                <td>{row.memo || "-"}</td>

                <td>
                    <button
                        onClick={() => editInventory(row)}
                    >
                        수정
                    </button>

                    <button
                        onClick={() => deleteInventory(row.id)}
                    >
                        삭제
                    </button>
                </td>

                </tr>
            ))}
            </tbody>
    
          </table>
    
        </div>
      );
    }
    
  export default InventoryPage;
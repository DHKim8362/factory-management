import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
    
    function InventoryPage() {
    
      const [inventory, setInventory] = useState([]);
    
      useEffect(() => {
        loadInventory();
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
    
      return (
        <div>
    
          <h2>재고관리</h2>
    
          <table border="1">
    
        <thead>
            <tr>
                <th>ID</th>
                <th>품목코드</th>
                <th>품목명</th>
                <th>도면번호</th>
                <th>위치</th>
                <th>수량</th>
            </tr>
        </thead>
    
            <tbody>
            {inventory.map((row) => (
                <tr key={row.id}>
                <td>{row.id}</td>

                <td>{row.items?.item_code}</td>
                <td>{row.items?.item_name}</td>
                <td>{row.items?.drawing_no}</td>

                <td>{row.location}</td>
                <td>{row.stock_qty}</td>
                </tr>
            ))}
            </tbody>
    
          </table>
    
        </div>
      );
    }
    
  export default InventoryPage;
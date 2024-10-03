import { useState } from "react";
  import Table from "react-bootstrap/Table";

  import Textbox from "./components/textbox/textbox";
  import Dropdown from "./components/dropdown/dropdown";
  import CustomButton from "./components/button/button";

  import "./App.css";

  function formatCurrency(num) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(num);
  }

  function App() {
    const [cartItems, setCartItems] = useState([]);
    const [txtName, setTxtName] = useState("");
    const [textPrice, setTextPrice] = useState("");
    const [textQuantity, setTextQuantity] = useState("");
    const [selectedTown, setSelectedTown] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    function handleTextChange(e) {
      const { id, value } = e.target;
      if (id === "txtName") setTxtName(value);
      if (id === "txtPrice") setTextPrice(value);
      if (id === "txtQuantity") setTextQuantity(value);
    }

    function handleTownChange(e) {
      const value = e.target.value;
      console.log("Selected Town:", value);
      setSelectedTown(value);
    }

    function handlePaymentMethodChange(e) {
      const value = e.target.value;
      console.log("Selected Payment Method:", value); 
      setSelectedPaymentMethod(value);
    }

    function addToCart() {
      if (txtName && textPrice && textQuantity) {
        const item = {
          name: txtName,
          price: parseFloat(textPrice),
          quantity: parseInt(textQuantity, 10),
        };
        if (editIndex !== null) {
          const updatedItems = [...cartItems];
          updatedItems[editIndex] = item;
          setCartItems(updatedItems);
          setEditIndex(null);
        } else {
          setCartItems([...cartItems, item]);
        }

        setTxtName("");
        setTextPrice("");
        setTextQuantity("");
      } else {
        alert("Please fill in all item details.");
      }
    }

    function deleteItem(itemIndex) {
      const confirmDelete = window.confirm("i delete ni nga item?");
      if (confirmDelete) {
        const newItems = cartItems.filter((_, index) => index !== itemIndex);
        setCartItems(newItems);
      }
    }

    function editItem(itemIndex) {
      const item = cartItems[itemIndex];
      setTxtName(item.name);
      setTextPrice(item.price.toString());
      setTextQuantity(item.quantity.toString());
      setEditIndex(itemIndex); 
    } 

    function clearCart() {
      const confirmClear = window.confirm(" clear cart?");
      if (confirmClear) {
        setCartItems([]);
        setSelectedTown("");
        setSelectedPaymentMethod("");
      }
    }

    const shippingFees = {
      Tubigon: 100,
      Calape: 80,
      Catigbian: 150,
      
    };

    function addToCart() {
      if (txtName && textPrice && textQuantity) {
        const item = {
          name: txtName,
          price: parseFloat(textPrice),
          quantity: parseInt(textQuantity, 10),
        };
        
   
        if (editIndex !== null) {
          const updatedItems = [...cartItems];
          updatedItems[editIndex] = item;
          setCartItems(updatedItems);
          setEditIndex(null); 
        } else {
          setCartItems([...cartItems, item]); 
        }
    
        setTxtName("");
        setTextPrice("");
        setTextQuantity("");
      } else {
        alert("Please fill in all item details.");
      }
    }


  function editItem(itemIndex) {
    const item = cartItems[itemIndex];
    setTxtName(item.name); 
    setTextPrice(item.price.toString()); 
    setTextQuantity(item.quantity.toString()); 
    setEditIndex(itemIndex); 
  }
  

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingFee = shippingFees[selectedTown] || 0;
    const grandTotal = subtotal + shippingFee;

    return (
      <div>
        <div className="main-container">
          <div className="sub-container">
            <Textbox
              id="txtName"
              type="text"
              label="Item Name"
              value={txtName}
              containerClass="p-3"
              onTextChange={handleTextChange}
            />
            <Textbox
              id="txtPrice"
              type="number"
              label="Item Price"
              value={textPrice}
              containerClass="p-3"
              onTextChange={handleTextChange}
            />
            <Textbox
              id="txtQuantity"
              type="number"
              label="Quantity"
              value={textQuantity}
              containerClass="p-3"
              onTextChange={handleTextChange}
            />
            <div className="d-flex justify-content-center py-2">
              <CustomButton
                label={editIndex !== null ? "Update Item" : "Add to Cart"}
                onClick={addToCart}
                variant="primary"
              />
            </div>
          </div>

          {cartItems.length > 0 && (
            <div className="item-container my-5">
              <h3 className="text-center py-3">𝑪𝑨𝑹𝑻 𝑰𝑻𝑬𝑴𝑺</h3>
              <div className="d- flex my-3">
              <CustomButton
                  label="𝓒𝓵𝓮𝓪𝓻 "
                  onClick={clearCart}
                  variant="info"
                />
                </div>
              
              <Table striped bordered>
                
                <thead>
                  <tr className="text-capitalize">
                    <th>Item #</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
                      <td className="text-center" width={240}>
                        <CustomButton
                          label="Edit"k
                          variant="success"
                          innerClass="m-1"
                          onClick={() => editItem(index)}
                        />
                        <CustomButton
                          label="Delete"
                          variant="danger"
                          innerClass="m-1"
                          onClick={() => deleteItem(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Dropdown
                id="drpTown"
                label="Town"
                options={["Tubigon", "Calape" , "Catigbian"]}
                value={selectedTown}
                containerClass="w-25 p-2"
                onSelectChange={handleTownChange}
              />
              <Dropdown
                id="drpPayment"
                label="Payment Method"
                options={["GCash", "Paymaya", "Paypal"]}
                value={selectedPaymentMethod}
                containerClass="w-25 p-2"
                onSelectChange={handlePaymentMethodChange}
              />

              <div className="py-3">
                <p>Subtotal: {formatCurrency(subtotal)}</p>
                <p>Shipping Fee: {formatCurrency(shippingFee)}</p>
                <p>Grand Total: {formatCurrency(grandTotal)}</p>
              </div>

              <div className="d-flex justify-content-end my-3">
                
              
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  export default App;
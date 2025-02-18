import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('http://localhost:3000/api/orders');
      setOrders(response.data.data.orders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-list">
      {orders.map((order) => (
        <div key={order._id} className="order-item">
          <h3>Commande #{order._id}</h3>
          <p>Date : {new Date(order.orderDate).toLocaleDateString()}</p>
          <p>Total : {order.totalAmount} €</p>
          <p>Statut : {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;

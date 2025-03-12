import React, { useEffect, useState, useCallback } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Failed to fetch food list.');
      }
    } catch (error) {
      toast.error('Error fetching food list.');
    }
  }, [url]);

  const removeFood = useCallback(
    async (foodId) => {
      try {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        if (response.data.success) {
          toast.success(response.data.message);
          setList((prev) => prev.filter((item) => item._id !== foodId));
        } else {
          toast.error('Failed to remove food item.');
        }
      } catch (error) {
        toast.error('Error removing food item.');
      }
    },
    [url]
  );

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={`${item.name}`} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <button
              onClick={() => removeFood(item._id)}
              className="delete-button"
              aria-label={`Remove ${item.name}`}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

List.propTypes = {
  url: PropTypes.string.isRequired,
};

export default List;

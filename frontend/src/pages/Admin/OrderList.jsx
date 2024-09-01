import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );

  return (
    <div className="container mx-auto p-4">
      <AdminMenu />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left p-2">ITEMS</th>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">USER</th>
              <th className="text-left p-2">DATE</th>
              <th className="text-left p-2">TOTAL</th>
              <th className="text-left p-2">PAID</th>
              <th className="text-left p-2">DELIVERED</th>
              <th className="text-left p-2"></th>
            </tr>
          </thead>

          <tbody className=" divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="p-2">
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-20 h-auto mx-auto"
                  />
                </td>
                <td className="p-2">{order._id}</td>
                <td className="p-2">
                  {order.user ? order.user.username : "N/A"}
                </td>
                <td className="p-2">
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>
                <td className="p-2">$ {order.totalPrice}</td>
                <td className="p-2">
                  {order.isPaid ? (
                    <p className="py-1 px-2 bg-green-400 rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="py-1 px-2 bg-red-400 text-white rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td className="p-2">
                  {order.isDelivered ? (
                    <p className="py-1 px-2 bg-green-400 text-white rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="py-1 px-2 bg-red-400 text-white rounded-full">
                      Pending
                    </p>
                  )}
                </td>
                <td className="p-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="text-amber-500 hover:underline">
                      More
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;

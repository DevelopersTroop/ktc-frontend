const EmptyCart = () => {
  return (
    <div className="flex flex-col gap-12 justify-center items-center my-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Cart is Empty</h1>
        <p className="text-gray-600 text-center mt-3">
          Look like you haven't mae your choice yet...
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;

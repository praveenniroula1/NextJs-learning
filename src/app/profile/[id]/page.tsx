import User from "@/models/userModel"

const UserProfile =async ({ params }: any) => {
  const id=params._id
  const findUserDetails=await  User.findOne({id})


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
        <hr className="mb-4" />
        <h1 className="text-xl font-semibold mb-4 text-center">Profile page</h1>
        <span className="p-2 rounded bg-orange-500 text-white text-center block">
          {findUserDetails.id} 
        </span>
        <span className="bg-blue-500 p-3 rounded-lg shadow-lg w-80 text-white"> {findUserDetails.username} </span>
      </div>
    </div>
  );
};

export default UserProfile;

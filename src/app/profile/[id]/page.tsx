

const UserProfile = ({params}: any) => {
  return (
    
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <h1>Profile page </h1>
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
      </div>
   
  );
};

export default UserProfile;

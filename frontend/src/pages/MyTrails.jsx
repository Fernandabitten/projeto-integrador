import AvatarMenu from '../components/AvatarMenu';

const MyTrails = ({ handleLogout }) => {
  return (
    <div className="flex-1 ml-15 md:ml-0 md:pt-0 pt-0 p-2">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">Minhas Trilhas</h1>
        <AvatarMenu handleLogout={handleLogout} />
      </div>
      <hr className="border-t border-text/50 mb-6" />
    </div>
  );
};

export default MyTrails;

import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute left-2 top-8">
      {favoriteCount > 0 && (
        <span className="flex items-center justify-center w-5 h-5 text-sm text-white bg-amber-500 rounded-full">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;

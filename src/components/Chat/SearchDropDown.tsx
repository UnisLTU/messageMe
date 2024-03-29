import DataContext from "../../context/DataContext";
import { useContext, useEffect, useState } from "react";
import { axiosSearchUser } from "../../API";
import { UserDataTypes } from "../../types/UserTypes";
import { DataContextProps } from "../../types/common";

interface SearchDropDownProps {
  setSelectedUser: (user: UserDataTypes) => void;
  selectedUsersArray?: UserDataTypes[];
}

const SearchDropDown = ({
  setSelectedUser,
  selectedUsersArray,
}: SearchDropDownProps) => {
  const { userData } = useContext(DataContext) as DataContextProps;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchByName = async () => {
      try {
        const { data } = await axiosSearchUser(searchQuery);
        if (selectedUsersArray) {
          const usersArray = data.filter(
            (item1: UserDataTypes) =>
              !selectedUsersArray.some(
                (item2: UserDataTypes) => item2._id === item1._id
              )
          );
          setSearchResults(usersArray);
        } else setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userData) searchByName();
  }, [searchQuery]);

  const handleSelect = (
    _id: string,
    name: string,
    email: string,
    pic: string
  ) => {
    setSelectedUser({ _id, name, email, pic });
    setSearchQuery("");
  };

  return (
    <form className="h-18  relative flex justify-center rounded-xl border-2 border-slate-500 ">
      <input
        placeholder="Search for person"
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-slate-50 p-4 rounded-xl w-full dark:bg-gray-950"
        value={searchQuery}
      />
      {!searchQuery ? (
        <></>
      ) : (
        <div className="bg-slate-300 w-[300px] dark:bg-gray-950  max-h-24 overflow-scroll absolute top-14 mt-2 p-2 space-y-2 rounded-xl no-scrollbar text-sm">
          {searchResults.map(({ _id, name, email, pic }) => {
            return (
              <div
                onClick={() => handleSelect(_id, name, email, pic)}
                className="flex flex-row justify-between"
                key={_id}
              >
                <img className="h-6 rounded-full" src={pic} alt="" />
                <h1>{name}</h1>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default SearchDropDown;

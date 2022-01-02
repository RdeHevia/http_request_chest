import React from "react";

const NewBinButton = ({ createNewBin }) => {
  return (
    <div className="w-1/4">
      <button
        type="submit"
        onClick={createNewBin}
        className="border-2 w-full p-5 border-gray-900 hover:border-blue-400 bg-blue-600 rounded-md"
      >
        Create new Chest
      </button>
    </div>
  );
};

export default NewBinButton;

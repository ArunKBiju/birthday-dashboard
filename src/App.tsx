import React from "react";
import BirthdayList from "./components/BirthdayList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5dc] p-4">
      <BirthdayList />
    </div>
  );
};

export default App;

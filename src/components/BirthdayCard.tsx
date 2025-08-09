import React from "react";
import type { BirthdayPerson } from "../types/birthday";

interface Props {
  person: BirthdayPerson;
}

const BirthdayCard: React.FC<Props> = ({ person }) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <img
          src={person.image}
          alt={person.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium text-gray-900">{person.name}</h4>
          <p className="text-sm text-gray-500">{person.role}</p>
        </div>
      </div>
      <button className="flex items-center gap-1 border rounded-md px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 transition">
        🎂 Send
      </button>
    </div>
  );
};

export default BirthdayCard;

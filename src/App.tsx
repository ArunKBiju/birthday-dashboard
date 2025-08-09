import React, { useEffect, useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";

type BirthdayPerson = {
  id: number;
  name: string;
  role: string;
  date: string;
  image: string;
};

const BirthdayCard: React.FC<{ person: BirthdayPerson }> = ({ person }) => {
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
        <FaBirthdayCake style={{ color: "#000" }} />
        Send
        </button>
    </div>
  );
};

const App: React.FC = () => {
  const [birthdays, setBirthdays] = useState<BirthdayPerson[]>([]);

  useEffect(() => {
    async function fetchBirthdays() {
      try {
        const response = await fetch("https://your-api-endpoint.com/birthdays");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: BirthdayPerson[] = await response.json();
        setBirthdays(data);
      } catch (error) {
        console.error("Failed to fetch birthdays:", error);

        const fallbackData: BirthdayPerson[] = [
          { id: 1, name: "Andrew Jermia", role: "IOS Developer", date: "today", image: "https://i.pravatar.cc/100?img=1" },
          { id: 2, name: "Mary Zeen", role: "UI/UX Designer", date: "tomorrow", image: "https://i.pravatar.cc/100?img=2" },
          { id: 3, name: "Antoney Lewis", role: "Android Developer", date: "tomorrow", image: "https://i.pravatar.cc/100?img=3" },
          { id: 4, name: "Doglas Martin", role: ".Net Developer", date: "2025-08-25", image: "https://i.pravatar.cc/100?img=4" },
        ];
        setBirthdays(fallbackData);
      }
    }

    fetchBirthdays();
  }, []);

  const today = birthdays.filter(b => b.date === "today");
  const tomorrow = birthdays.filter(b => b.date === "tomorrow");
  const future = birthdays.filter(b => b.date !== "today" && b.date !== "tomorrow");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white rounded-xl shadow p-4 w-[500px] mx-auto">
        <div className="flex justify-between items-center border-b pb-3 mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaBirthdayCake style={{ color: "#0ff" }} /> Birthdays
          </h2>
          <a href="#" className="text-sm text-gray-500 hover:underline">View All</a>
        </div>

        <div className="space-y-4">
          {today.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2">Today</p>
              <div className="space-y-2">
                {today.map(p => <BirthdayCard key={p.id} person={p} />)}
              </div>
            </div>
          )}

          {tomorrow.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2">Tomorrow</p>
              <div className="space-y-2">
                {tomorrow.map(p => <BirthdayCard key={p.id} person={p} />)}
              </div>
            </div>
          )}

          {future.length > 0 && (
            <div>
              {future.map(p => (
                <div key={p.id} className="mb-2">
                  <p className="text-sm font-semibold mb-2">
                    {new Date(p.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </p>
                  <BirthdayCard person={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

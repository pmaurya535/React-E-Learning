import React from "react";
import { Card, CardContent } from "./ui/card";

const teamMembers = [
  {
    name: "Pradeep Kumar Maurya",
    role: "Frontend Developer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzWb5Zt6BAR_mKGXNqf6SpHBBJjiQFiAMAZQ&s",
  },
  {
    name: "Dhirendra Sah",
    role: "Backend Developer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WDVXiZSuSUUeURxbBZl4SvMnwmDNdO65LA&s",
  },
  {
    name: "Santosh Mahato",
    role: "UI/UX Designer",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHxzM_e4qVtnPZttfPhbjcPssC78WndotRPg&s",
  },
];

const Team = () => {
  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
        Meet Our <span className="text-blue-600 dark:text-blue-400">Awesome Team</span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        We are passionate about building great experiences!
      </p>
      
      <div className="flex justify-center gap-8 flex-wrap">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="w-72 p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full border-4 border-blue-500 shadow-md"
              />
              <CardContent className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{member.role}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Team;

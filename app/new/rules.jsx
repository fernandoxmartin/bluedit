import React from "react";

export default function Rules() {
  const rules = [
    { id: 1, rule: "Remember the human" },
    { id: 2, rule: "Behave like you would in real life" },
    { id: 3, rule: "Look for the original source of content" },
    { id: 4, rule: "Search for duplicates before posting" },
    { id: 5, rule: "Read the community's rules" },
  ];
  return (
    <div className='hidden w-full lg:flex flex-col items-center rounded-md bg-light dark:bg-dark mt-2 lg:mb-6 p-6"'>
      <div className="w-full p-6">
        <div className="w-full flex items-center space-x-2 mb-4">
          <h2 className="w-full">Posting to Bluedit</h2>
        </div>
        <div className="w-full border-b-[0.5px] border-gray-300 mb-2"></div>
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="w-full flex items-center justify-between my-4"
          >
            <div className="flex items-center">
              <span className="text-sm pr-2">{rule.id}. </span>
              <p className="text-sm">{rule.rule}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

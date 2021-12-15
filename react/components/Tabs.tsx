import React from "react"

export default function Tabs({ tabs }: { tabs: [name: any, content: any][] }) {
  const [currentTab, setCurrentTab] = React.useState(0)

  return (
    <div className="tabs">
      <ul className="tab-header">
        {tabs.map(([name], i) => (
          <li
            key={i}
            onClick={() => {
              if (i !== currentTab) setCurrentTab(i)
            }}
            className={"tab-name" + (currentTab === i ? "-active" : "")}
          >
            {name}
          </li>
        ))}
      </ul>
      <div className="tab-content">{tabs[currentTab][0]}</div>
    </div>
  )
}

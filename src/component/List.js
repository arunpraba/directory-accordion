import { useState } from "react";
import { FILE_TYPES } from "../constants";

export function Directory({ list }) {
  return (
    <ul>
      {list.map((item) => (
        <List key={item.id} item={item} />
      ))}
    </ul>
  );
}

function ActiveDirectory({ item }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (item.children?.length > 0) {
      setIsActive((prev) => !prev);
    }
  };

  return (
    <>
      <li onClick={handleClick}>
        <button className="accordion-button">
          {isActive ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </button>
        {item.name}
      </li>
      {item.children?.length > 0 && isActive && (
        <Directory list={item.children} />
      )}
    </>
  );
}

export function List({ item }) {
  if (item.type === FILE_TYPES.DIRECTORY) {
    return <ActiveDirectory item={item} />;
  }

  return <li>{item.name}</li>;
}

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";


const TableHeading =({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  children,
})  => {
  return (
    <th onClick={(e) => sortChanged(name)}>
      <div className="flex items-center justify-between px-3 py-3 cursor-pointer">
        {children}
        {sortable && sort_field === name && (
          
          <div>
            { sort_direction === "asc" ? (
              <ChevronUpIcon className="w-4 text-gray-200" />
            ) : (
              <ChevronDownIcon className="w-4 text-gray-200 " />
            )}
          </div>
        )}
      </div>
    </th>
  );
}

export default TableHeading;
import { MdClear, MdSearch } from "react-icons/md";

type SearchProps = {
  label?: string;
  placeholder?: string;
  inputValue: string;
  handleInputChange: (event: any) => void;
  handleOnBlur: () => void;
  onCloseIcon: () => void;
  icon: "search" | "close";
};

export default function SearchBar(props: SearchProps) {
  return (
    <div className="mb-8">
      {props.label && (
        <h2 className="text-xl text-neutral-500 font-semibold mb-2">
          {props.label}
        </h2>
      )}
      <div className="flex justify-end items-center relative flex-col mb-2">
        <input
          className="w-full appearance-none rounded-full pl-6 py-3 text-gray-500 focus:outline-none bg-white"
          type="text"
          value={props.inputValue}
          placeholder={props.placeholder ?? ""}
          onChange={props.handleInputChange}
          onBlur={props.handleOnBlur}
        />
        <div className="absolute mr-6 end-0 m-3 cursor-pointer">
          {props.icon === "search" ? (
            <MdSearch size={24} />
          ) : (
            <MdClear size={24} />
          )}
        </div>
      </div>
    </div>
  );
}

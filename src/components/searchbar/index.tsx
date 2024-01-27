type SearchProps = {
  label?: string;
  placeholder?: string;
  onChange: (event: any) => void;
};

export default function SearchBar(props: SearchProps) {
  return (
    <div className="mb-8">
      {props.label && (
        <h2 className="text-xl text-neutral-500 font-semibold mb-2">
          {props.label}
        </h2>
      )}
      <div className="flex flex-col mb-2">
        <input
          className="w-full appearance-none rounded-full pl-4 py-3 text-gray-500 focus:outline-none"
          type="text"
          placeholder={props.placeholder ?? ""}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}

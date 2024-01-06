type SearchProps = {
  label?: string;
  placeholder?: string;
  onChange: (event: any) => void;
};

export default function SearchBar(props: SearchProps) {
  return (
    <div className="mb-8">
      {props.label && (
        <h2 className="text-xl text-gray-500 font-semibold mb-2">{props.label}</h2>
      )}
      <div clasName="flex flex-col mb-2">
        <input
          className="w-full appearance-none rounded-xl pl-3 py-3 text-gray-500 focus:outline-none"
          type="text"
          placeholder={props.placeholder ?? ""}
          onChange={props.onChange}/>
        {/*<button
          className="absolute right-0 px-5 py-3 text-gray-500 font-semibold font-poppins rounded-e-xl bg-white hover:bg-white"
          onClick={props.onChange}>
          Cari
        </button>*/}
      </div>
    </div>
  );
}
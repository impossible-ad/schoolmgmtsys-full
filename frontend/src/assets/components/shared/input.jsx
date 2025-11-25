const Input = ({ type, placeholder, id, onChange, value }) => {

    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                id={id}
                className="border-2 border-blue-500 rounded-lg p-2 w-full focus:outline-none focus:border-none focus:ring-2  focus:ring-red-500"
                value={value}
                onChange={onChange}
                autoComplete="on"
            />

        </div>
    )
};

export default Input;
export const Input = ({type='text',label,value,name,placeholder,onChange}) => {

    return(

        <div class="mt-6">
            <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            type={type}
            value={value}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            />
        </div>

    )

}

export const SelectInput = ({label,name,value,placeholder,options = [],onChange}) => {

    return(

        <div className="mt-4">

            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>

            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name={name}
            value={value}
            onChange={onChange}
            >
             
             <option selected>{placeholder}</option>
             {
                options.map((option) => <option value={option.id}>{option.name}</option>)
             }
            

            </select>

        </div>

    )

}
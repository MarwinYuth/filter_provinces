import { useState } from "react"
import { Modal } from "./Modal"
import { data } from "autoprefixer"


export const ReuseableTable = ({label,data,childData,onDelete}) => {

    const [popUp,setPopUp] = useState(false)
    const [viewDetail,setViewDetail] = useState()

    const onEdit = (data) => {
        setPopUp(true)
        setViewDetail(data)
    }

    return(

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-14">


            <h1 className="text-[30px] font-bold">{label}</h1>

            <table class=" mt-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Name_Km
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>

                </thead>
                <tbody>

                    {
                        data.map((data) => {
                            
                            return(

                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {data.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {data.name_km}
                                    </td>
                                    <td class="px-6 py-4">
                                        <a onClick={() => onEdit(data)} className="text-blue-500 font-bold">Edit</a> / <a onClick={() => onDelete(data.id)} className="text-red-600 font-bold">Delete</a>
                                    </td>
                                </tr>

                            )

                        })
                    }
                    
                </tbody>
            </table>
            
            <Modal label={label} data={viewDetail} childData={childData} onChangePopUp={setPopUp} isVisible={popUp}/>

        </div>

    )

}